<template>
  <div class="user-history">
    <table class="table">
      <thead>
        <tr>
          <th v-for="(item, index) in topList" :key="index">{{item.name}}</th></tr>
      </thead>
      <tbody>
        <tr>
          <td v-for="(item, index) in List1" :key="index">{{item.infor}}</td>
        </tr>
        <tr>
          <td v-for="(item, index) in List1" :key="index">{{item.infor}}</td>
        </tr>
        <tr>
          <td v-for="(item, index) in List1" :key="index">{{item.infor}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'user-history',
  data () {
    return {
      topList: [
        {name: '时间'},
        {name: '接触点'},
        {name: '内容'},
        {name: '客户满意度'},
        {name: '进度'},
        {name: '详情'}
      ],
      List1: [
        {infor: '2018.07.09'},
        {infor: '柜面'},
        {infor: '购买常青树'},
        {infor: '10'},
        {infor: '完成'},
        {infor: '接触详情'}
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/css/allcolor.scss';

.table{
  width: 100%;
  thead{
    tr{
      th{
        font-size:13px;
        font-family:'MicrosoftYaHei';
        padding-bottom: 9px;
        font-weight: normal;
        padding-top: 8px;
        color: $fontcolor;
      }
    }
  }
  tbody{
    tr{
      td{
        font-size:10px;
        font-family:'SimSun';
        padding-bottom: 11px;
        color: $lighttext;
      }
    }
  }
}
</style>
