<template>
  <router-view />
</template>

<script setup>
//启动json-server: json-server --watch data.json --port 8888
import * as echarts from "echarts";
import { provide, Provider } from "vue";
provide("echarts", echarts);
</script>

<style lang="scss">
</style>
