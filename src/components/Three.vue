<template>
  <div>
    <h2>报修统计</h2>
    <div id="chartthree" class="three"></div>
  </div>
</template>

<script setup>
import { inject, onMounted, reactive } from "vue";
import link from "../api/link";
import url from "../api/url";

let $echarts = inject("echarts");
onMounted(() => {
  let myChart = $echarts.init(document.getElementById("chartthree"));

  link(url.chartDataThree,"",{},{}).then((ok) => {
    console.log(ok);

    myChart.setOption({
        legend:{top:"bottom"},
         tooltip:{},
      series: [
        {
          type: "pie",
          data: ok.data,
          radius:[10,100],
          center:["50%","45%"],
          roseType:"area"
        },
      ],
    });
  });
});
</script>

<style lang="scss" scoped>
h2 {
  height: 1rem;
  color: #fff;
  line-height: 1rem;
  text-align: center;
  font-size: 1rem;
}
.three {
  height: 18.5rem;
}
</style>