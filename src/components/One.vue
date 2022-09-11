<template>
  <div>
      <h2>人数统计</h2>
      <div id="chartone" class="one"></div>
  </div>
</template>

<script setup>
import {inject,onMounted,reactive} from "vue"
import link from "../api/link"
import url from "../api/url"

// let data=reactive({})
let xdata=reactive([])
let ydata=reactive([])


let $echarts=inject("echarts")
onMounted(()=>{

    let myChart=$echarts.init(document.getElementById("chartone"))


    link(url.chartDataOne,"",{},{}).then((ok)=>{
       let {data}=ok;
       console.log(data)

       xdata=data.map(v=>v.title)
       ydata=data.map(v=>v.num)

       console.log("x",xdata)
       console.log("y",ydata)

        myChart.setOption({
        xAxis:{
            type:"value",
            axisLine:{
                lineStyle:{
                    color:"#fff"
                }
            }
        },
        yAxis:{
            type:"category",
            data:xdata,
            axisLine:{
                lineStyle:{
                    color:"#fff"
                }
            }
        },
        grid:{
            top:"3%",
            left:"1%",
            bottom:"3%",
            right:"6%",
            containLabel:true

        },
        series:[
            {
                type:"bar",
                data:ydata,
                itemStyle:{
                    normal:{
                        barBorderRadius:[0,20,20,0],
                        color:new $echarts.graphic.LinearGradient(0,0,1,0,[
                            {
                                offset:0,
                                color:"#005eaa"
                            },
                            {
                                offset:0.5,
                                color:"#339ca8"
                            },
                            {
                                offset:1,
                                color:"#cda819"
                            },
                        ])
                    }
                }
            }
        ]
    })
    })



   
})


</script>

<style lang="scss" scoped>
    h2{
        height: 1rem;
        color: #fff;
        line-height: 1rem;
        text-align: center;
        font-size:1rem;
    }
    .one{
        height: 18.5rem;
        
    }
</style>