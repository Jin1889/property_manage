<template>
  <div class="content">
    <div class="inputDom">
      <el-input v-model="input" placeholder="请输入收款金额"></el-input>
      <el-button type="success" @click="MakeQrcode">生成二维码</el-button>
    </div>
  <div class="qrcode" ref="qrcodeDom"></div>
  </div>
</template>

<script setup>
import {nextTick, ref} from 'vue'
import QRcode from "qrcodejs2"
const input = ref('')
let qrcodeDom = ref(null)
let MakeQrcode=()=>{
  qrcodeDom.value.innerHTML = ""
  nextTick(() => {
    new QRcode(qrcodeDom.value,{
      text: input.value,
      colorDark: "#000",
      colorLight: "#fff",
      // correctLevel: QRcode.correctLevel.H
    })
  })
}
</script>

<style lang="scss" scoped>
.content{
  text-align: center;
}
.qrcode{
  width: 300px;
  height: 300px;
  margin: 0 auto;
}
.inputDom{
  width: 400px;
  margin: 0 auto;
}
</style>