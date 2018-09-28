<template>
  <div class="col-md-12 recom_infor">
    <input class="sear_int" type="text" placeholder="请输入快捷知识的关键词">
    <img src="@/assets/search.png" alt="">
      <ol>
        <li v-for="(item, index) in keyList" :key="index">{{item.infor}}</li>
      </ol>
  </div>
</template>

<script>
export default {
  name: 'ChatBut',
  data () {
    return {
      keyList: [
        {infor: '1.xxxxxxxxxxxxxxxxxx'},
        {infor: '2.xxxxxxxxxxxxxxxxxx'}
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'node_modules/bootstrap/scss/bootstrap.scss';
@import '@/css/allcolor.scss';

.recom_infor{
  width: 100%;
  height: 118px;
  background: $white;
  .sear_int{
    display: block;
    padding-top: 10px;
    border: 0;
    border-bottom: 1px solid $linecolor;
    background: $white;
    width:100%;
    outline: none;
    color: $titlecolor;
  }
  input::-webkit-input-placeholder{
    color: $linecolor;
  }
  input::-moz-placeholder {
    color: $linecolor;
  }
  input::-moz-placeholder {
    color: $linecolor;
  }
  input::-ms-input-placeholder {
    color: $linecolor;
  }
  ol{
    margin-top: 8px;
    li{
      display: block;
      text-align: start;
      font-size: 11px;
      font-family: 'MicrosoftYaHei';
      color: $fontcolor;
      margin-bottom: 8px;
    }
  }
  img{
    width: 17px;
    height: 17px;
    position: absolute;
    top: 8px;
    right: 30px;
  }
}
</style>
