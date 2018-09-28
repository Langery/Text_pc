<template>
  <div class="user-impress">
    <div v-for="(item, index) in tabList" :key="index" class="listbox">
      <button type="button" class="btn send_btn">{{item.name}}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user-impress',
  data () {
    return {
      tabList: [
        {name: '美丽知性'},
        {name: '商量温柔'},
        {name: '精致细心'},
        {name: '唯美大方'},
        {name: '温柔'},
        {name: '用心'}
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'node_modules/bootstrap/scss/bootstrap.scss';
@import '@/css/allcolor.scss';

.user-impress{
  .listbox{
    margin-left: 14px;
    margin-top: 4px;
    .send_btn{
      width: 85px;
      height: 26px;
      line-height: 13px;
      float: left;
      border-radius: 50px;
      overflow: hidden;
      color: $sidecolor;
      background: $white;
      border: 1px solid $sidecolor;
      margin-top: 14px;
      margin-right: 28px;
      font-size:11px;
      font-family:'MicrosoftYaHei';
    }
  }
}
</style>
