<template>
  <div class="historyIndex">
    <h1>历史会话信息</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import '@/css/allcolor.scss';

*{
  margin: 0;
  padding: 0;
}
.historyIndex{
  height: 100%;
  overflow: hidden;
  margin-left: 8px;
  margin-right: 4px;
  overflow: hidden;
  padding: 0;
  h1{
    float: left;
    margin-top: 70px;
    position: absolute;
    left:50%;
    top:40%;
    font-size: 20px;
  }
}
</style>
