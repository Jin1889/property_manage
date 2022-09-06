<template>
  <div class="common-layout">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.el-aside {
  background-color: #545c64;
}
.el-header {
  // background-color: gold;
}
.el-main {
  background-color: gainsboro;
}

.el-aside,
.el-container,
.common-layout,
#app,
body,
html {
  height: 100%;
}
</style>