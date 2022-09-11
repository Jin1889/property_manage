<template>
  <div>
    <h2>人数统计</h2>
    <div id="chartfour" class="four"></div>
  </div>
</template>

<script setup>
import { inject, onMounted, reactive } from "vue";
import link from "../api/link";
import url from "../api/url";

let $echarts = inject("echarts");
onMounted(() => {
  let myChart = $echarts.init(document.getElementById("chartfour"));

  link(url.chartDataFour,"",{},{}).then((ok) => {
    let { data } = ok;
    console.log(data);

    myChart.setOption({
         grid:{
            top:"3%",
            left:"1%",
            bottom:"3%",
            right:"6%",
            containLabel:true

        },
        tooltip:{
            trigger:"axis",
            axisPointer:{
                type:"shadow"
            }
        },
        xAxis:{
            type:"category",
            data:data.day,
            axisLine:{
                lineStyle:{
                    color:"#fff"
                }
            }
        },
        yAxis:{
            type:"value",
            axisLine:{
                lineStyle:{
                    color:"#fff"
                }
            }
        },
        series:[
            {
                type:"bar",
                data:data.num.一般用户,
                stack:"total"
            },
            {
                type:"bar",
                data:data.num.月租用户,
                stack:"total"
            },
            {
                type:"bar",
                data:data.num.特殊车辆,
                stack:"total"
            }
        ]
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
.four {
  height: 18.5rem;
}
</style>