<template>
    <h1 style="text-align: center;font-size:35px">李白相关人物关系图</h1>
    <div id="body"></div>
    <div id="tooltip"></div>
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

            var width = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) * 0.96;
            var height = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) * 0.9;
            var svg = d3.select("#body")			//选择<body>
                .append("svg")			//在<body>中添加<svg>
                .attr("width", width)	//设定<svg>的宽度属性
                .attr("height", height);//设定<svg>的高度属性

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
                return `<b style="color:${d.color};font-size:20px">${d.name}</b>
<br/><div style="font-size:15px">${d.intro}</div>


`
            }
            d3.json("force.json").then(function (data) {
                var nodes = data.nodes;
                var edges = data.links;
                // var color = d3.schemeTableau10;
                const tooltip = d3.select("#tooltip").call(createTooltip);

                var forceSimulation = d3.forceSimulation()
                    .force("link", d3.forceLink())
                    .force("charge", d3.forceManyBody().strength(-1000))
                    .force("center", d3.forceCenter(width / 2, height / 2));

                forceSimulation.nodes(nodes)
                    .on("tick");
                forceSimulation.force("link")
                    .links(edges)
                    .distance(220);

                //箭头绘制	
                var defs = svg.append("defs");
                var radius = 10;
                var arrowMarker = defs.append("marker")
                    .attr("id", "arrow")
                    .attr("markerUnits", "strokeWidth")
                    .attr("markerWidth", "8")
                    .attr("markerHeight", "8")
                    .attr("viewBox", "0 0 8 8")
                    .attr("refX", 12 + radius / 8 - 2)   //实际是radius/strokeWidth
                    .attr("refY", 2)
                    .attr("orient", "auto");

                var arrow_path = "M0,1 L4,2 L0,3 L0,0";

                arrowMarker.append("path")
                    .attr("d", arrow_path);

                var path = svg.selectAll("path")
                    .data(edges)
                    .enter()
                    .append("path")
                    .attr("id", function (d, i) {
                        return "edgepath" + i;
                    })
                    .attr("class", "edges")
                    .attr("fill", "none")
                    .attr("stroke", "#666")
                    .attr("stroke-width", "1.5px")
                    .attr("marker-end", "url(#arrow)");

                // var pathtext = svg.selectAll('g')
                //     .data(edges)
                //     .enter()
                //     .append("text")
                //     .append('textPath')
                //     .attr("text-anchor", "middle")//居中
                //     .attr("startOffset", "50%")
                //     .attr('xlink:href', function (d, i) { return "#edgepath" + i; })
                //     .style("font-size", "13px")
                //     .text(function (d) { return d.relation; });


                var circles = svg.selectAll("forceCircle")
                    .data(nodes)
                    .enter()
                    .append("circle")
                    .attr("class", "forceCircle")
                    .attr("r", d => d.weight * 8 + radius)
                    .style("stroke", "black")
                    .style("stroke-width", "1.5")
                    .attr("fill", function (d, i) {
                        //创建圆形图片
                        var defs = svg.append("defs").attr("id", "imgdefs");
                        var catpattern = defs.append("pattern")
                            .attr("id", "catpattern" + i)
                            .attr("height", 1)
                            .attr("width", 1);
                        catpattern.append("image")
                            .attr("x", 0)
                            .attr("y", 0)
                            .attr("width", d.weight * 16 + radius + 10)
                            .attr("height", d.weight * 16 + radius + 10)
                            .attr("xlink:href", "face/" + d.image);
                        return "url(#catpattern" + i + ")";
                    })
                    .call(drag());

                var texts = svg.selectAll(".forceText")
                    .data(nodes)
                    .enter()
                    .append("text")
                    .attr("class", "forceText")
                    .attr("x", function (d) { return d.x; })
                    .attr("y", function (d) { return d.y; })
                    .attr("fill","#fff")
                    .style("font-family", "FZYaoti")
                    .style("font-size", d => d.weight * 2 + 13)
                    .style("font-weight", "bold")
                    .style("filter", "drop-shadow(2px 2px 0px #8e7d6b")
                    .attr("dx", "-1.5em")
                    .attr("dy", "3em")
                    .text(function (d) { return d.name; });

                forceSimulation.on("tick", function () {
                    path.attr("d", function (d) {
                        // var dx = d.target.x - d.source.x;//增量
                        // var dy = d.target.y - d.source.y;
                        return "M" + d.source.x + "," + d.source.y + "L" + d.target.x + "," + d.target.y;
                    });
                    circles.attr("cx", function (d) { return d.x; });
                    circles.attr("cy", function (d) { return d.y; });
                    texts.attr("x", function (d) { return d.x; });
                    texts.attr("y", function (d) { return d.y; });
                });

                circles.on('mouseover', function (event, d) {
                    const x = event.pageX;
                    const y = event.pageY;
                    tooltip.style("display", "block")
                        .style("opacity", 1)
                        .style("left", x + "px")
                        .style("top", y + "px")
                        .html(getTooltipContent(d));

                })
                    .on('mouseleave', function () {
                        tooltip.style("display", "none").style("opacity", 0);

                    });

                function drag() {

                    function dragstarted(event, d) {
                        if (!event.active) forceSimulation.alphaTarget(0.3).restart();
                        d.fx = d.x;
                        d.fy = d.y;
                    }

                    function dragged(event, d) {
                        d.fx = event.x;
                        d.fy = event.y;
                    }

                    function dragended(event, d) {
                        if (!event.active) forceSimulation.alphaTarget(0);
                        d.fx = null;
                        d.fy = null;
                    }

                    return d3.drag()
                        .on("start", dragstarted)
                        .on("drag", dragged)
                        .on("end", dragended);
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
</style>
  