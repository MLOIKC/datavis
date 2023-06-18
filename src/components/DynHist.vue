<template>
    <div id="hist"></div>
</template>

<script>
import { defineComponent } from 'vue';
import * as d3 from "d3";
// import axios from "axios";

export default defineComponent({
    mounted() {
        // axios.get("remark.csv").then((res) => {
        //     console.log(res.data);
        //     this.drawGraphChart(res.data);
        // });
        this.drawGraphChart();
    },
    methods: {
        drawGraphChart() {

            var width = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) * 0.96;
            var height = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) * 0.96;

            const data = [
                { "time": 2013, "entities": [{ "name": "李白", "value": 4303 }, { "name": "孟浩然", "value": 826 }, { "name": "王维", "value": 1764 }, { "name": "王昌龄", "value": 596 }, { "name": "杜甫", "value": 2785 }, { "name": "白居易", "value": 2804 }, { "name": "刘禹锡", "value": 1193 }, { "name": "李贺", "value": 1239 }, { "name": "杜牧", "value": 1149 }, { "name": "李商隐", "value": 1572 }] },
                { "time": 2014, "entities": [{ "name": "李白", "value": 7944 }, { "name": "孟浩然", "value": 1015 }, { "name": "王维", "value": 1859 }, { "name": "王昌龄", "value": 710 }, { "name": "杜甫", "value": 3119 }, { "name": "白居易", "value": 2050 }, { "name": "刘禹锡", "value": 1482 }, { "name": "李贺", "value": 898 }, { "name": "杜牧", "value": 1240 }, { "name": "李商隐", "value": 1608 }] },
                { "time": 2015, "entities": [{ "name": "李白", "value": 16361 }, { "name": "孟浩然", "value": 1101 }, { "name": "王维", "value": 2091 }, { "name": "王昌龄", "value": 855 }, { "name": "杜甫", "value": 3616 }, { "name": "白居易", "value": 2331 }, { "name": "刘禹锡", "value": 1583 }, { "name": "李贺", "value": 1194 }, { "name": "杜牧", "value": 1360 }, { "name": "李商隐", "value": 1681 }] },
                { "time": 2016, "entities": [{ "name": "李白", "value": 14702 }, { "name": "孟浩然", "value": 1462 }, { "name": "王维", "value": 2353 }, { "name": "王昌龄", "value": 1020 }, { "name": "杜甫", "value": 4276 }, { "name": "白居易", "value": 2541 }, { "name": "刘禹锡", "value": 1742 }, { "name": "李贺", "value": 1412 }, { "name": "杜牧", "value": 1476 }, { "name": "李商隐", "value": 1899 }] },
                { "time": 2017, "entities": [{ "name": "李白", "value": 17654 }, { "name": "孟浩然", "value": 1358 }, { "name": "王维", "value": 2803 }, { "name": "王昌龄", "value": 1225 }, { "name": "杜甫", "value": 5645 }, { "name": "白居易", "value": 3400 }, { "name": "刘禹锡", "value": 1854 }, { "name": "李贺", "value": 1469 }, { "name": "杜牧", "value": 1595 }, { "name": "李商隐", "value": 2151 }] },
                { "time": 2018, "entities": [{ "name": "李白", "value": 13063 }, { "name": "孟浩然", "value": 1323 }, { "name": "王维", "value": 2862 }, { "name": "王昌龄", "value": 1251 }, { "name": "杜甫", "value": 5727 }, { "name": "白居易", "value": 4947 }, { "name": "刘禹锡", "value": 2087 }, { "name": "李贺", "value": 1355 }, { "name": "杜牧", "value": 1618 }, { "name": "李商隐", "value": 2243 }] },
                { "time": 2019, "entities": [{ "name": "李白", "value": 10904 }, { "name": "孟浩然", "value": 1581 }, { "name": "王维", "value": 2959 }, { "name": "王昌龄", "value": 1452 }, { "name": "杜甫", "value": 6884 }, { "name": "白居易", "value": 3734 }, { "name": "刘禹锡", "value": 2493 }, { "name": "李贺", "value": 1378 }, { "name": "杜牧", "value": 1847 }, { "name": "李商隐", "value": 2566 }] },
                { "time": 2020, "entities": [{ "name": "李白", "value": 12577 }, { "name": "孟浩然", "value": 2508 }, { "name": "王维", "value": 4303 }, { "name": "王昌龄", "value": 2012 }, { "name": "杜甫", "value": 9815 }, { "name": "白居易", "value": 5016 }, { "name": "刘禹锡", "value": 3543 }, { "name": "李贺", "value": 1747 }, { "name": "杜牧", "value": 2387 }, { "name": "李商隐", "value": 3099 }] },
                { "time": 2021, "entities": [{ "name": "李白", "value": 10802 }, { "name": "孟浩然", "value": 2181 }, { "name": "王维", "value": 3872 }, { "name": "王昌龄", "value": 1684 }, { "name": "杜甫", "value": 8092 }, { "name": "白居易", "value": 4660 }, { "name": "刘禹锡", "value": 3172 }, { "name": "李贺", "value": 1651 }, { "name": "杜牧", "value": 2818 }, { "name": "李商隐", "value": 2610 }] },
                { "time": 2022, "entities": [{ "name": "李白", "value": 11870 }, { "name": "孟浩然", "value": 2682 }, { "name": "王维", "value": 4643 }, { "name": "王昌龄", "value": 1883 }, { "name": "杜甫", "value": 8953 }, { "name": "白居易", "value": 5472 }, { "name": "刘禹锡", "value": 3759 }, { "name": "李贺", "value": 2122 }, { "name": "杜牧", "value": 2666 }, { "name": "李商隐", "value": 3164 }] },
                { "time": 2023, "entities": [{ "name": "李白", "value": 11092 }, { "name": "孟浩然", "value": 2213 }, { "name": "王维", "value": 4029 }, { "name": "王昌龄", "value": 1767 }, { "name": "杜甫", "value": 9202 }, { "name": "白居易", "value": 5130 }, { "name": "刘禹锡", "value": 3614 }, { "name": "李贺", "value": 2122 }, { "name": "杜牧", "value": 2239 }, { "name": "李商隐", "value": 3011 }] }

            ];


            // 设定与矩形和字体相关的样式
            const rect = { height: 40 };

            var svg = d3.select("#hist")			//选择<body>
                .append("svg")			//在<body>中添加<svg>
                .attr("width", width)	//设定<svg>的宽度属性
                .attr("height", height);

            var scale = d3.scaleLinear()
                .domain([0, 120])
                .range([10, width * 0.7]);

            // 每次取出一个元素 依数值大小将 entities 进行排序
            var index = 0;
            var dataEntry = data[index];
            var dataValue = dataEntry["entities"].sort((x, y) => y.value - x.value);

            // 最大长度，即最后一个矩形的底边 y 值
            const maxHeight = (rect.height) * (dataValue.length)
            // 右下角年份
            var comment = svg.append("text")
                .attr("x", width * 0.8)
                .attr("y", maxHeight)
                .attr("fill", "grey")
                .attr("font-size", "40")
                .text(dataEntry.year);

            var color = d3.schemeSet3;
            //绑定该年数据
            var rects = svg.selectAll("rect")
                .data(dataValue)
                .enter()
                .append("rect")
                .attr("x", 50+150)
                .attr("height", rect.height)
                .attr("fill", (d, i) => color[i % 10]);



            // 名称标签 以及矩形
            var labels = svg.selectAll("text_")
                .data(dataValue)
                .enter()
                .append("text")
                .attr("x", +150)


            svg.append("g")
                .attr("transform", `translate(0, ${maxHeight + rect.height})`);


            //矩形尾部跟随数字
            var number = svg.selectAll("text1")
                .data(dataValue)
                .enter()
                .append("text")
                .attr("x", 0)

            function updateElements() {
                rects.data(dataValue, d => d.name)
                    .transition()
                    .duration(900)
                    .attr("y", (_, i) => rect.height * i)
                    .attr("width", d => scale(d.value) / 120)

                labels.data(dataValue, d => d.name)
                    .transition()
                    .duration(900)
                    .attr("y", (_, i) => (rect.height) * i + rect.height / 2 + 4)
                    .text(d => d.name);

                number.data(dataValue, d => d.name)
                    .transition()
                    .duration(900)
                    .attr("x", d => scale(d.value) / 150 + 25+150)
                    .attr("y", (_, i) => (rect.height) * i + rect.height / 2 + 4)
                    .text(d => d.value);
            }

            updateElements()

            function update(i) {
                dataEntry = data[i];
                dataValue = dataEntry["entities"].sort((x, y) => y.value - x.value);
                comment.text(dataEntry.time);
                updateElements();
            }

            setInterval(() => update((++index) % data.length), 1000);


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
  