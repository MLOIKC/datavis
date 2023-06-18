<template>
  <div style="display: inline-block;">
    <img src="../assets/libai.jpg"
      style="height:auto;width:400px;border: 2px solid #8e7d6b;margin-left: 80px;margin-top: 30px;">
  </div>
  <div class="content">
    <b style="font-size: 35px;">李白</b>（701年2月28日—762年12月），字太白，号青莲居士，
    祖籍陇西成纪（今甘肃省秦安县），出生于绵州昌隆县青莲乡。
    唐朝伟大的浪漫主义诗人，凉武昭王李暠九世孙。
    <br>
    为人爽朗大方，乐于交友，爱好饮酒作诗，名列“酒中八仙”。曾经得到唐玄宗李隆基赏识，担任翰林学士，赐金放还，游历全国，
    先后迎娶宰相许圉师、宗楚客的孙女。唐肃宗即位后，卷入永王之乱，流放夜郎，辗转到达当涂县令李阳冰家。上元二年，去世，时年六十二。
    <br>
    著有《李太白集》，代表作有《望庐山瀑布》、《行路难》、《蜀道难》、《将进酒》、《早发白帝城》等。
    李白所作词赋，就其开创意义及艺术成就而言，享有极为崇高的地位，后世誉为“诗仙”，与诗圣杜甫并称“李杜”。
  </div>
  <div style="display: inline-block;">
    <table class="my-table">
      <tbody>
        <tr>
          <td>本名</td>
          <td>李白</td>
        </tr>
        <tr>
          <td>字</td>
          <td>太白</td>
        </tr>
        <tr>
          <td>号</td>
          <td>青莲居士、谪仙人</td>
        </tr>
        <tr>
          <td>所处时代</td>
          <td>唐朝</td>
        </tr>
        <tr>
          <td>民族族群</td>
          <td>汉族</td>
        </tr>
        <tr>
          <td>出生地</td>
          <td>蜀郡绵州昌隆县(一说出生于西域碎叶)</td>
        </tr>
        <tr>
          <td>出生日期</td>
          <td>701年2月28日(长安元年)</td>
        </tr>
        <tr>
          <td>逝世日期</td>
          <td>762年12月(宝应元年)</td>
        </tr>
        <tr>
          <td>主要作品</td>
          <td>李太白集</td>
        </tr>
        <tr>
          <td>主要成就</td>
          <td>古代浪漫主义文学高峰、歌行体和七绝的巅峰</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>


</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.my-table {
  width: 500px;
  height: 500px;
  margin-left: 410px;
  margin-bottom: 40px;
  border-collapse: collapse;
  font-family: FZYaoti;
  color: #4A3927;
  box-shadow: 0 1px 0 #aaa, 3px 3px 3px #aca48d;
}

.my-table td,
.my-table th {
  border: 1.5px solid #8e7d6b;
  padding: 8px;
  text-align: left;
}

.my-table td:first-of-type,
.my-table th:first-of-type {
  font-weight: bold;
  width: 25%;
}

/* 设置第一列的背景颜色 */
.my-table td:first-child {
  background-color: #BAB39B;
  opacity: 90%;
}

/* 设置第二列的背景颜色 */
.my-table td:nth-child(2) {
  background-color: #EBE4DB;
  opacity: 90%;
}

.content {
  display: inline-block;
  width: 350px;
  font-family: FZYaoti;
  color: #4A3927;
  font-size: 20px;
  padding: 30px;
  margin-top: 70px;
  position: absolute;
}
</style>
