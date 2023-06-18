<template>
    <div id="tooltip"></div>
    <div id="legend"></div>
    <div id="body"></div>
</template>

<script>
import { defineComponent } from 'vue';
import * as d3 from "d3";
//import * as d3 from "./d3.v7";
import axios from "axios";

export default defineComponent({
    data() {
        return {
            jsonData: null
        }
    },
    mounted() {
        axios.get('http://127.0.0.1:5009/lifejson')
            .then(response => {
                this.jsonData = response.data
                console.log(this.jsonData)
                this.drawGraphChart(JSON.parse(JSON.stringify(this.jsonData)));
            })
            .catch(error => {
                console.error(error)
            })
    },
    methods: {
        drawGraphChart(jsonData) {
            var width = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) * 0.96;
            var height = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) * 0.96;


            async function loadData() {
                // const csv = await d3.csv("new_libai_life.csv");
                const csv = jsonData
                console.log(csv);
                const data = csv.map(d => {
                    return {
                        ...d,
                        start: +d.start,
                        end: +d.end
                    }
                }).sort((a, b) => a.start - b.start); // 在函数内处理 CSV 数据
                // const regions = d3.nest().key(d => d.region).entries(data).map(d => d.key);
                const regions = Array.from(d3.group(data, d => d.region).keys());
                console.log(regions)

                // dataByTimeline = d3.nest().key(d => d.timeline).entries(data);
                // dataByRegion = d3.nest().key(d => d.region).entries(data);
                var dataByTimeline = Array.from(d3.group(data, d => d.timeline));
                var dataByRegion = Array.from(d3.group(data, d => d.region));
                var margin = ({ top: 30, right: 30, bottom: 30, left: 30 });
                var y = d3.scaleBand()
                    .domain(d3.range(data.length))
                    .range([0, height - margin.bottom - margin.top])
                    .padding(0.2);
                var x = d3.scaleLinear()
                    .domain([d3.min(data, d => d.start), d3.max(data, d => d.end)])
                    .range([0, width - margin.left - margin.right]);

                var axisBottom = d3.axisBottom(x)
                    .tickPadding(2)
                    .tickFormat(formatDate);
                var axisTop = d3.axisTop(x)
                    .tickPadding(2)
                    .tickFormat(formatDate);
                var formatDate = d => `${d}年`;
                const timelines = dataByTimeline.map(d => d.key);
                console.log(timelines)
                // const color = d3.scaleOrdinal(d3.schemeSet2).domain(timelines);
                // const color = d3.scaleOrdinal(timelines,d3.schemeSet2);
                const color = d3.scaleOrdinal(dataByTimeline.map(d => d.key), d3.schemeSet3);
                data.forEach(d => d.color = d3.color(color(d.key)))

                console.log(color)

                function createTooltip(el) {
                    el
                        .style("position", "absolute")
                        .style("pointer-events", "none")
                        .style("top", 0)
                        .style("opacity", 0)
                        .style("background", "white")
                        .style("border-radius", "5px")
                        .style("box-shadow", "0 0 10px rgba(0,0,0,.25)")
                        .style("padding", "10px")
                        .style("line-height", "1.3")
                        .style("font", "11px sans-serif")
                }
                function getRect(d) {
                    const el = d3.select(this);
                    const sx = x(d.start);
                    const w = x(d.end) - x(d.start);
                    const isLabelRight = (sx > width / 2 ? sx + w < width : sx - w > 0);

                    el.style("cursor", "pointer")

                    el
                        .append("rect")
                        .attr("x", sx)
                        .attr("height", y.bandwidth())
                        .attr("width", w)
                        .attr("fill", d.color);

                    el
                        .append("text")
                        .text(d.civilization)
                        .attr("x", isLabelRight ? sx - 5 : sx + w + 5)
                        .attr("y", 2.5)
                        .attr("fill", "black")
                        .style("text-anchor", isLabelRight ? "end" : "start")
                        .style("dominant-baseline", "hanging");
                }
                function getTooltipContent(d) {
                    return `<b style="color:${d.color.darker()};font-size:20px">${d.timeline}</b>
<br/>
<div style="font-size:20px">${d.region}</div>
<br/>
<div style="font-size:20px">${formatDate(d.start)} - ${formatDate(d.end)}</div>
`
                }

                var sorting = "time"
                let filteredData;
                if (sorting !== "time") {
                    filteredData = [].concat.apply([], dataByRegion.map(d => d.values));
                } else {
                    filteredData = data.sort((a, b) => a.start - b.start);
                }

                filteredData.forEach(d => d.color = d3.color(color(d.timeline)))



                // 创建 SVG 元素
                const svg = d3.select("#body").append("svg")
                    .attr("viewBox", `0 0 ${width} ${height}`);

                // 添加坐标轴
                svg.append("g")
                    .attr("transform", `translate(${margin.left},${height - margin.bottom})`)
                    .call(axisBottom);
                svg.append("g")
                    .attr("transform", `translate(${margin.left},${margin.top})`)
                    .call(axisTop);

                // // 渲染数据矩形和文字
                // const rects = svg.selectAll("g.rects")
                //     .data(filteredData)
                //     .enter().append("g")
                //     .attr("transform", (d, i) => `translate(${margin.left},${y(i) + margin.top})`)
                //     .each(getRect)

                const g = svg.append("g").attr("transform",`translate(${margin.left} ${margin.top})`);

                const groups = g
                    .selectAll("g")
                    .data(filteredData)
                    .enter()
                    .append("g")
                    .attr("class", "civ")


                const tooltip = d3.select("#tooltip").call(createTooltip);

                const line = svg.append("line").attr("y1", margin.top - 10).attr("y2", height - margin.bottom).attr("stroke", "rgba(0,0,0,0.2)").style("pointer-events", "none");

                groups.attr("transform", (d, i) => `translate(0 ${y(i)})`)

                groups
                    .each(getRect)
                    .on("mouseover", function (d, i) {
                        d3.select(this).select("rect").attr("fill", d3.color(i.color).darker())
                        const x = d.pageX;
                        const y = d.pageY;
                        tooltip.style("display", "block")
                            .style("opacity", 1)
                            .style("left", x + "px")
                            .style("top", y + "px")
                            .html(getTooltipContent(i));

                    })
                    .on("mouseleave", function (d, i) {
                        d3.select(this).select("rect").attr("fill", i.color)
                        tooltip.style("opacity", 0)
                    })
                svg.on("mousemove", function (d) {

                    let [x, y] = d3.pointer(d);
                    line.attr("transform", `translate(${x} 0)`);
                    y += 30;
                    if (x > width / 2) x -= 100;
                    tooltip
                        .style("left", x + "px")
                        .style("top", y + "px")
                })
            }


            loadData();

        }
    }
})




</script>
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
    text-decoration: none;
}
</style>
  