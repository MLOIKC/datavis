<template>
    <div id="remark" style="display:inline-block;"></div>
    <div id="tooltip" style="display:inline-block;"></div>
    <div id="legend" style="display:inline-block;margin-top: 20px;margin-left: 600px;font-family:FZYaoti;"></div>
</template>

<script>
import { defineComponent } from 'vue';
import * as d3 from "d3";
import axios from "axios";


export default defineComponent({
    data() {
        return {
            jsonData: null
        }
    },
    mounted() {
        axios.get('http://127.0.0.1:5009/remarkjson')
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
            const DOM = {
                create: function (name) {
                    return document.createElementNS("http://www.w3.org/2000/svg", name);
                },
                select: function (selector) {
                    return document.querySelector(selector);
                },
                selectAll: function (selector) {
                    return document.querySelectorAll(selector);
                },
                uid: function (name) {
                    return {
                        id: name + "-" + Math.random().toString(36).substr(2, 16)
                    };
                }
            };




            const scale = d3.scaleLinear()
                .domain([0, 40000])
                .range([10, 50])
                .clamp(true);

            const data = jsonData.map(item => {
                return {
                    name: item.id.split(".").pop(),
                    title: String(item.id).replace(/\./g, "/"),
                    group: item.id.split(".")[1],
                    value: scale(+item.value),
                    text: item.text
                };
            });

            // 输出处理后的数据
            console.log(data);

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
                    .style("font", "11px FZYaoti")
            }
            function getTooltipContent(d) {
                return `<div style="font-size:15px">${d.text}</div>
<br/>
<b style="color:${d.color};font-size:15px">${d.title}</b>
<br/>
`
            }

            const colorInterpolator = d3.interpolateRgb("#A1906E", "#EDDFC4");
            const colorRange = d3.quantize(colorInterpolator, Array.from(new Set(data.map(d => d.group))).length);

            const color = d3.scaleOrdinal(data.map(d => d.group), colorRange);
            data.forEach(d => d.color = d3.color(color(d.group)));

            const tooltip = d3.select("#tooltip").call(createTooltip);

            // Prepare and invoke the pack layout.
            const pack = data => d3.pack()
                .size([width - 2, height - 2])
                .padding(3)(d3.hierarchy({ children: data })
                    .sum(d => d.value));
            const root = pack(data);

            // Create the SVG container.
            const svg = d3.select("#remark")			//选择<body>
                .append("svg")			//在<body>中添加<svg>
                .attr("viewBox", [0, 0, width, height])
                .attr("font-family", "FZYaoti")
                .attr("text-anchor", "middle")
                .attr("display", "inline-block")
            // .style("transform", "translateX(200px)");


            // Append a g element for each node.
            const leaf = svg.selectAll("g")
                .data(root.leaves())
                .join("g")
                .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);

            // Add a circle and a text to each node; give the circle an id so we can also reference
            // it to clip the text.

            leaf.append("circle")
                .attr("id", d => (d.leafUid = DOM.uid("leaf")).id)
                .attr("r", d => d.r)
                .attr("fill-opacity", 0.9)
                .attr("fill", d => color(d.data.group))
                .attr("stroke", "#8e7d6b")
                .attr("stroke-width", 1);


            leaf.append("clipPath")
                .attr("id", d => (d.clipUid = DOM.uid("clip")).id)
                .append("use")
                .attr("xlink:href", d => d.leafUid.href);

            leaf.append("text")
                .attr("clip-path", d => d.clipUid)
                .selectAll("tspan")
                .data(d => d)
                .join("tspan")
                .attr("x", 0)
                .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
                .attr("font-size",d=>d.r/2)
                .text(d => d.data.name.split(/(?=[A-Z][a-z])|\s+/g));


            leaf.on('mouseover', function (event, d) {
                const x = event.pageX;
                const y = event.pageY;
                tooltip.style("display", "block")
                    .style("opacity", 1)
                    .style("left", x + "px")
                    .style("top", y + "px")
                    .html(getTooltipContent(d.data));
                d3.select(this).select("circle").attr("fill", d3.color(d.data.color).darker())
            })
                .on('mouseleave', function (event, d) {
                    tooltip.style("display", "none").style("opacity", 0);
                    d3.select(this).select("circle").attr("fill", d3.color(d.data.color))
                });

            document.body.appendChild(svg.node());

            const grouplistObject = data.reduce((acc, cur) => {
                if (!acc[cur.group]) {
                    acc[cur.group] = {
                        color: cur.color,
                        group: cur.group
                    };
                }
                return acc;
            }, {});

            const grouplist = Object.values(grouplistObject);

            const legend = d3.select('#legend');
            const items = legend.selectAll('div')
                .data(grouplist)
                .enter()
                .append('div')
                .classed('item', true)
                .style("display", "inline-block");

            items.append('div')
                .style('width', '16px')
                .style('height', '16px')
                .style('background-color', d => d.color)
                .style('display', 'inline-block')
                .style('margin-right', '5px')
                .style('border', '1px solid #8e7d6b');
            // .style('box-shadow', '1px 1px gray');

            items.append('span')
                .text(d => d.group)
                .style('margin-right', '10px');

        }
    },
    beforeUnmount() {
        d3.selectAll("svg").remove();
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
  