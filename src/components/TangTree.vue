<template>
    <div class="title1">李白代表作中各类诗词统计情况</div>
    <div id="tooltip"></div>
    <div id="legend"></div>
    <div id="tang"></div>
    <div style="font-family: 'FZYaoti', cursive;font-size: 12px;margin-left: 1240px;margin-bottom: 20px;">数据来源：<a
            href="https://github.com/chinese-poetry/chinese-poetry">中华古典文集数据库chinese-poetry</a></div>
</template>

<script>
import { defineComponent } from 'vue';
import * as d3 from "d3";

export default defineComponent({
    mounted() {
        this.drawGraphChart();
    },
    methods: {
        drawGraphChart() {
            d3.json("tang300_all.json").then(function (data) {
                console.log(data)
                var partition = data => {
                    const root = d3.hierarchy(data)
                        .sum(d => d.value)
                        .sort((a, b) => b.value - a.value);
                    return d3.partition()
                        .size([2 * Math.PI, root.height + 1])(root);
                };
                // var color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1));
                // var color = d3.scaleOrdinal(["#AE7664", "#B0997F", "#C2B088", "#95A07C", "#A4B7B5"]);
                const originalColors = ["#AE7664", "#B0997F", "#C2B088", "#95A07C", "#A4B7B5"];
                const colorRange = originalColors.map(color => {
                    const c = d3.color(color);
                    c.r += 20; // 增加红色分量
                    c.g += 20; // 增加绿色分量
                    c.b += 20; // 增加蓝色分量
                    return c.toString();
                });
                var color = d3.scaleOrdinal(colorRange)

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
                        .style("z-index", "10")
                }

                function getTooltipContent(d) {
                    var content=`<b style="color:#000;font-size:18px;font-family:FZYaoti;">《${d.data.title}》</b>
<br/>`
                    for(var i=0;i<d.data.paragraphs.length;i++){
                        content+=`<div style="font-size:15px;font-family:FZYaoti;">${d.data.paragraphs[i]}</div>
<br/>`
                    }
                    return content;
                }


                // var format = d3.format(",d");
                var width = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
                var height = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
                var radius = width / 15;
                var arc = d3.arc()
                    .startAngle(d => d.x0)
                    .endAngle(d => d.x1)
                    .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
                    .padRadius(radius * 1.5)
                    .innerRadius(d => d.y0 * radius)
                    .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1));

                const root = partition(data);
                console.log(root)

                root.each(d => d.current = d);

                const svg = d3.select("#tang").append("svg")
                    .attr("viewBox", [0, 0, width, height])
                    .style("font", "10px sans-serif")
                    .attr("transform", `translate(0,-35)`); // 向上平移20px;

                const g = svg.append("g")
                    .attr("transform", `translate(${width / 2},${width / 4})`);

                const tooltip = d3.select("#tooltip").call(createTooltip);

                const path = g.append("g")
                    .selectAll("path")
                    .data(root.descendants().slice(1))
                    .join("path")
                    .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.title); })
                    //.attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
                    .attr("fill-opacity", d => arcVisible(d.current) ? 1 : 0)
                    .attr("pointer-events", d => arcVisible(d.current) ? "auto" : "none")
                    .attr("d", d => arc(d.current));

                path.filter(d => d.children)
                    .style("cursor", "pointer")
                    .on("click", clicked);

                // path.append("title")
                //     .text(d => `${d.ancestors().map(d => d.data.title).reverse().join("/")}\n${format(d.value)}`);
                //定义一个分段比例尺 scale，用于将数据值分成几个等距的区间


                const label = g.append("g")
                    .attr("pointer-events", "none")
                    .attr("text-anchor", "middle")
                    .style("user-select", "none")
                    .selectAll("text")
                    .data(root.descendants().slice(1))
                    .join("text")
                    .attr("dy", "0.35em")
                    .attr("fill-opacity", d => +labelVisible(d.current))
                    .attr("font-size", d => {
                        if (d.children) {
                            return `${35 - d.depth * 7}px`;
                        }
                        else {
                            return `${11}px`;
                        }
                    }) // 根据层级设置字号
                    .attr("transform", d => labelTransform(d.current))
                    .style("font-family", "FZYaoti")
                    .attr("fill", "black")
                    //.style("filter", "drop-shadow(2px 2px 0px rgb(147, 114, 64)")
                    .text(d => {
                        if (d.children) {
                            return d.data.title;
                        }
                        else {
                            return "《" + d.data.title + "》";
                        }
                    });

                path.on('mouseover', function (event, d) {
                    console.log(d.data)
                    if (!d.data.children) {
                        const x = event.pageX;
                        const y = event.pageY;
                        tooltip.style("display", "block")
                            .style("opacity", 1)
                            .style("left", x + "px")
                            .style("top", y + "px")
                            .html(getTooltipContent(d));
                    }

                })
                    .on('mouseleave', function () {
                        tooltip.style("display", "none").style("opacity", 0);

                    });

                const parent = g.append("circle")
                    .datum(root)
                    .attr("r", radius)
                    .attr("fill", "none")
                    .attr("pointer-events", "all")
                    .on("click", clicked);

                function clicked(event, p) {
                    parent.datum(p.parent || root);

                    root.each(d => d.target = {
                        x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
                        x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
                        y0: Math.max(0, d.y0 - p.depth),
                        y1: Math.max(0, d.y1 - p.depth)
                    });

                    const t = g.transition().duration(750);

                    // Transition the data on all arcs, even the ones that aren’t visible,
                    // so that if this transition is interrupted, entering arcs will start
                    // the next transition from the desired position.
                    path.transition(t)
                        .tween("data", d => {
                            const i = d3.interpolate(d.current, d.target);
                            return t => d.current = i(t);
                        })
                        .filter(function (d) {
                            return +this.getAttribute("fill-opacity") || arcVisible(d.target);
                        })
                        //.attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
                        .attr("fill-opacity", d => arcVisible(d.target) ? 1 : 0)
                        .attr("pointer-events", d => arcVisible(d.target) ? "auto" : "none")

                        .attrTween("d", d => () => arc(d.current));

                    label.filter(function (d) {
                        return +this.getAttribute("fill-opacity") || labelVisible(d.target);
                    }).transition(t)
                        .attr("fill-opacity", d => +labelVisible(d.target))
                        .attrTween("transform", d => () => labelTransform(d.current))
                }

                function arcVisible(d) {
                    return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
                }

                function labelVisible(d) {
                    return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
                }

                function labelTransform(d) {
                    const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
                    const y = (d.y0 + d.y1) / 2 * radius;
                    return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
                }

            })
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

.title1 {
    font-family: "FZYaoti", cursive;
    font-size: 45px;
    margin-top: 20px;
    margin-left: 450px;
    text-shadow: 0 1px 0 #aaa, 1px 1px 0 rgb(147, 114, 64);
}
</style>
  