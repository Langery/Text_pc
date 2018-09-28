<template>
  <div class="history-infor">
    <div class="infor_type">
      <span class="clicked">
        <strong>消息记录</strong>
      </span>
      <span>
        <strong>视频记录</strong>
      </span>
      <img src="@/assets/quit.png" alt="" class="quit" @click="closeHistory">
    </div>
    <div class="infor_detail">
      <div class="detail_fir selected">
        <message-record></message-record>
      </div>
      <div class="detail_sec">
        <video-record></video-record>
      </div>
    </div>
    <div class="select-data">
      <img src="@/assets/calendar.png" alt="" class="time_table">
      <calendar v-show="showSelect = false"></calendar>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'history-infor',
  components: {
    'MessageRecord': () => import('@/view/mainView/mainIndex/components/talkBox/input-func/history-infor/message-record.vue'),
    'VideoRecord': () => import('@/view/mainView/mainIndex/components/talkBox/input-func/history-infor/video-record.vue'),
    'Calendar': () => import('@/view/mainView/mainIndex/components/talkBox/input-func/history-infor/calendar.vue')
  },
  data () {
    return {}
  },
  mounted () {
    $('.infor_type > span').click(function () {
      $(this).addClass('clicked').siblings().removeClass('clicked')
      const index = $(this).index()
      $('.infor_detail > div').eq(index).addClass('selected').siblings('div').removeClass('selected')
    })
  },
  methods: {
    // 关闭历史窗口
    closeHistory () {
      this.$emit('closeHistory')
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'node_modules/bootstrap/scss/bootstrap.scss';
@import '@/css/allcolor.scss';

.history-infor{
  width: 428px;
  height: 512px;
  background: $backtalk;
  position: relative;
  top: -412px;
  right: -360px;
  z-index: 100;
  border: 1px solid $linecolor;
  .infor_type{
    height: 43px;
    line-height: 43px;
    text-align: center;
    border-bottom: 1px solid $linecolor;
    span{
      float: left;
      cursor: pointer;
      width: 70px;
      margin: 0 15px;
      strong{
        display: inline-block;
        font-weight: normal;
        margin: 0 auto;
        font-size: 13px;
        font-weight: 400;
        font-family: 'MicrosoftYaHei';
        color: $titlecolor;
      }
    }
    .clicked{
      strong{
        color: $titlecolor;
        border-bottom: 2px solid $sidecolor;
      }
    }
    .quit{
      width: 11px;
      height: 11px;
      position: absolute;
      top: 18px;
      right: 15px;
      cursor: pointer;
    }
  }
  .infor_detail{
    position: relative;
    .detail_fir{
      display: none;
    }
    .detail_sec{
      display: none;
    }
    .selected{
      display: block !important;
    }
  }
  .select-data{
    width: 100%;
    height: 36px;
    line-height: 36px;
    clear: both;
    position: absolute;
    bottom: 0px;
    background: lightgreen;
    .time_table{
      cursor: pointer;
    }
  }
}
</style>
