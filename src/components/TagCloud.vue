<template>
    <div id="tooltip"></div>
    <div id="legend"></div>
    <div id="drawpic" class="drawpic"></div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import * as d3 from "d3";
  import axios from "axios";
  import cloud from 'd3-cloud';
  
  
  export default defineComponent({
    data() {
      return {
        jsonData: null
      }
    },
    mounted() {
      axios.get('http://127.0.0.1:5009/cloud_tagsjson')
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
  
        const words_list = jsonData.map(item => {
          return {
            text: item.word,
            size: item.count
          }
        });
        console.log(words_list);
        words_list.sort(function (a, b) {
          return d3.ascending(a.size, b.size);
        });
  
  
  
        let torch_text = [];
        words_list.forEach((item) => {
          torch_text.push(item.text);
        });
        let torch_size = [];
        words_list.forEach((item) => {
          torch_size.push(item.size);
        });
  
        var fill = d3.scaleOrdinal().range(d3.schemeSet3);
        // var layout = cloud().size([width, height * 0.9]) //size([x,y]) 词云显示的大小
        //   .words(words_list).padding(2).rotate(function () { return ~~(Math.random() * 2) * 0; })
        //   .font("Impact").fontSize(function (d) { return d.size; }).on("end", drawcloud);
        var scaleSize = d3.scaleSqrt()
          .domain([0, d3.max(words_list, function (d) { return d.size; })])
          .range([5, 80]) // 可以根据需要修改字体大小的范围
  
        var layout = cloud().size([width, height * 0.9])
          .words(words_list)
          .padding(2)
          .rotate(function () { return ~~(Math.random() * 2) * 0; })
          .font("Impact")
          .fontSize(function (d) { return scaleSize(d.size); }) // 使用 scaleSize 计算字体大小
          .on("end", drawcloud);
        layout.start();
        function drawcloud(words) {
          d3.select("#drawpic").append("svg").attr("id", "pic").attr("width", layout.size()[0])
            .attr("height", layout.size()[1]).append("g").attr("transform", "translate(" +
              (layout.size()[0] / 2) + "," + (layout.size()[1] / 2) + ")").selectAll("text").data(words)
            .enter().append("text").style("font-size", function (d) { return d.size + "px"; })
            .style("font-family", "FZYaoti").style("fill", function (d, i) { return fill(i); })
            .attr("text-anchor", "middle").attr("transform", function (d) {
              return "translate(" + [d.x - 2, d.y] + ")rotate(" + d.rotate + ")";
            }).text(function (d) { return d.text; }).attr("opacity", 0.9).style("font-weight", "bold").style("filter", "drop-shadow(2px 2px 0px #8e7d6b");
        }
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
  