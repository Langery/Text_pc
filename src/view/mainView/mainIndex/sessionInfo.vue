<template>
  <div class="title_infor">
    <div class="title_left">
      <h3>
        {{this.customData.userName}}
      </h3>
      <span>
        会话时间: - - -
      </span>
    </div>
    <div class="but_view">
      <span>你为他/她服务了{{times}}次</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ChatTop',
  computed: {
    ...mapGetters([
      'customData'
    ])
  },
  data () {
    return {
      times: 'n'
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'node_modules/bootstrap/scss/bootstrap.scss';
@import '@/css/allcolor.scss';

.title_infor{
  width: 100%;
  height: 45px;
  line-height: 45px;
  background: $gray;
  margin: 0;
  margin-bottom: 8px;
  .title_left{
    background: $white;
    width: 610px;
    height: 100%;
    float: left;
    h3{
      font-weight: normal;
      font-family: 'MicrosoftYaHei';
      float: left;
      font-size: 17px;
      margin: 0;
      margin-top: 12px;
      margin-left: 20px;
      color: $fontcolor;
    }
    span{
      float: right;
      font-size: 14px;
      font-family: 'MicrosoftYaHei';
      margin-right: 20px;
      color: $fontcolor;
    }
  }
  .but_view{
    padding: 0;
    width: 190px;
    float: right;
    padding-left: 8px;
    overflow: hidden;
    span{
      width: 100%;
      height: 100%;
      float: right;
      background: $white;
      color: $fontcolor;
      font-size: 14px;
      font-family: 'MicrosoftYaHei';
    }
  }
}
</style>
