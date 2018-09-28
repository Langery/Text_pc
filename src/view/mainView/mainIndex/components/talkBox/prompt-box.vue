<template>
  <div class="prompt-box" v-if="openPromt">
    <img src="@/images/h.jpg" alt="" class="headimg">
    <span>{{this.customData.userName}} 邀请你参加视频聊天</span>
    <img src="@/assets/video.png" alt="" class="video">
    <span class="btn" type="button" @click="through">接通</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Bus from '@/script/bus.js'

export default {
  name: 'prompt-box',
  data () {
    return {
      openPromt: true
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'customData'
    ])
  },
  methods: {
    through () {
      console.log(this.userInfo)
      const setTime = true
      Bus.$emit('startTime', setTime)
      const query = {
        userId: sessionStorage.csId,
        userName: sessionStorage.nickName,
        sdkAppId: sessionStorage.sdkAppId,
        userSig: sessionStorage.userSig,
        accountType: sessionStorage.accountType
      }
      window.open(`/videocs/video?userName=${query.userName}&userId=${query.userId}&sdkAppId=${query.sdkAppId}&userSig=${query.userSig}&accountType=${query.accountType}`, 'newwindow', 'height=500, width=600, top=50, left=300, location=no, toolbar=no, menubar=no, scrollbars=no, status=no')
      this.openPromt = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/css/allcolor.scss';

.prompt-box{
  display: inline-block;
  width: 250px;
  height: 270px;
  background: #000;
  opacity: 0.8;
  z-index: 100;
  position: absolute;
  bottom: -120px;
  right: 0;
  .headimg{
    position: absolute;
    width: 30px;
    height: 30px;
    left: 15px;
    top: 18px;
    border-radius: 50%;
    overflow: hidden;
  }
  .video{
    width: 85px;
    height: 105px;
    display: inline-block;
    position: absolute;
    top: 80px;
    right: 32%;
  }
  span{
    float: left;
    margin-left: 54px;
    color: $white;
    margin-top: 25px;
    font-size:13px;
    font-family:'MicrosoftYaHei';
  }
  .btn{
    display: block;
    cursor: pointer;
    background: green;
    position: absolute;
    bottom: 20px;
    width: 85px;
    height: 28px;
    line-height: 28px;
    right: 30%;
    margin: 0 auto;
    color: $white;
    font-size: 17px;
    font-family:'MicrosoftYaHei';
  }
}
</style>
