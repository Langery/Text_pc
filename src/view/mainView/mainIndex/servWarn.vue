<template>
  <div class="card_infor">
    <div class="row">
      <div class="col-md-6 card_left">
        <div class="card_main">
          <h6>{{serverWarn}}</h6>
          <p>{{serverInfor}}</p>
          <p>{{serverInfor}}</p>
        </div>
      </div>
      <div class="col-md-6 card_right">
        <div class="card_main">
          <h6>{{riskWarn}}</h6>
          <p>{{riskInfor1}}</p>
          <p>{{riskInfor2}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SerTab',
  data () {
    return {
      serverWarn: '服务提醒：',
      serverInfor: '客户后天生日，送上祝福',
      riskWarn: '风险预警：',
      riskInfor1: '近10天来电10次',
      riskInfor2: '近5天投诉3次'
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'node_modules/bootstrap/scss/bootstrap.scss';
@import '@/css/allcolor.scss';
// 选项卡片
.card_infor{
  width:430px;
  height: 90px;
  overflow: hidden;
  margin-bottom: 8px;
  background: no-repeat;
  border: 0;
  clear: both;
}
.card_left{
  padding-left: 15px;
  padding-right: 5px;
}
.card_right{
  padding: 0;
  padding-left: 5px;
}
.card_main{
  padding: 12px;
  height: 15vh;
  background: $white;
  overflow: hidden;
  position: relative;
  h6{
    font-weight: normal;
    text-align: start;
    color: $titlecolor;
    margin-bottom: 12px;
    font-family: 'MicrosoftYaHei';
    font-size: 14px;
  }
  p{
    margin: 0;
    margin-bottom: 8px;
    text-align: start;
    font-size: 11px;
    font-family: 'MicrosoftYaHei';
    color: $fontcolor;
  }
}
</style>
