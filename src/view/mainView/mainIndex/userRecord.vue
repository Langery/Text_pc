<template>
  <div class="summary">
    <div class="ser_sum">
      <span class="clicked">
        <strong>接触历史</strong>
      </span>
      <span>
        <strong>对我印象</strong>
      </span>
      <span>
        <strong>收到礼物</strong>
      </span>
    </div>
    <div class="detail_sum">
      <div class="sum_fir selected">
        <user-history></user-history>
      </div>
      <div class="sum_sec">
        <user-impress></user-impress>
      </div>
      <div class="sum_sec">
        <user-persent></user-persent>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'userRecord',
  components: {
    'UserHistory': () => import('@/view/mainView/mainIndex/components/userRecord/user-history.vue'),
    'UserImpress': () => import('@/view/mainView/mainIndex/components/userRecord/user-impress.vue'),
    'UserPersent': () => import('@/view/mainView/mainIndex/components/userRecord/user-persent.vue')
  },
  data () {
    return {
    }
  },
  mounted () {
    $('.ser_sum > span').click(function () {
      $(this).addClass('clicked').siblings().removeClass('clicked')
      const index = $(this).index()
      $('.detail_sum > div').eq(index).addClass('selected').siblings('div').removeClass('selected')
    })
  }
}
</script>

<style lang="scss" scoped>
@import 'node_modules/bootstrap/scss/bootstrap.scss';
@import '@/css/allcolor.scss';

.summary{
  padding: 0;
  background: $white;
  width:430px;
  height:140px;
  margin-bottom: 8px;
  .ser_sum{
    height: 34px;
    line-height: 34px;
    text-align: center;
    border-bottom: 1px solid $linecolor;
    span{
      display: inline-block;
      text-align: center;
      cursor: pointer;
      width: 80px;
      margin: 0 30px;
      strong{
        display: inline-block;
        font-weight: normal;
        margin: 0 auto;
        font-size: 14px;
        font-family: 'MicrosoftYaHei';
        color: $titlecolor;
      }
    }
    .clicked{
      border-bottom: 2px solid $sidecolor;
      strong{
        color: $titlecolor;
      }
    }
  }
  .detail_sum{
    position: relative;
    .sum_fir{
      display: none;
    }
    .sum_sec{
      display: none;
    }
    .selected{
      display: block !important;
    }
  }
}
</style>
