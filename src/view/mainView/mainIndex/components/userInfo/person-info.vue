<template>
  <div class="person-info">
    <div class="header">
      <div class="head_img">
        <img :src="userImg" alt="">
      </div>
      <p>{{this.customData.userName}}</p>
      <span>{{this.customData.userGradeName}}</span>
    </div>
    <div class="perinfo">
      <ul>
        <li>
          <span class="left">身份证</span>
          <span class="right">{{this.customData.idNo}}</span>
        </li>
        <li>
          <span class="left">联系电话</span>
          <span class="right">{{this.customData.userPhone}}</span>
        </li>
        <li>
          <span class="left">绿通等级</span>
          <span class="right">{{this.customData.userGrade}}级别</span>
        </li>
        <li>
          <span class="left">官微绑定情况</span>
          <span class="right">已关注已绑定</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import customImg from '@/images/h.jpg'
import { mapGetters } from 'vuex'

export default {
  name: 'person-info',
  // props: {
  //   basedata: {
  //     type: Object
  //   }
  // },
  computed: {
    ...mapGetters([
      'customData'
    ])
  },
  data () {
    return {
      userImg: customImg
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/css/allcolor.scss';

.person-info{
  width: 100%;
  height: 100%;
  clear: both;
  .header{
    height: 100%;
    width: 40%;
    float: left;
    overflow: hidden;
    color: $titlecolor;
    .head_img{
      display: inline-block;
      width: 92px;
      height: 92px;
      position: relative;
      overflow: hidden;
      clear: both;
      margin-top: 15px;
      margin-bottom: 15px;
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    p{
      font-size:17px;
      font-family:'MicrosoftYaHei-Bold';
      margin-top: 0;
      color: $bordcolor;
      margin-bottom: 10px;
      font-weight: bold;
    }
    span{
      font-size:13px;
      font-family:'MicrosoftYaHei';
      color: $sidecolor;
    }
  }
  .perinfo{
    float: right;
    width: 60%;
    height: 100%;
    ul{
      padding: 0;
      margin: 5px;
      margin-top: 30px;
      list-style-type: none;
      margin-right: 40px;
      li{
        clear: both;
        display: block;
        height: 16px;
        line-height: 16px;
        margin-bottom: 20px;
        color: $fontcolor;
        span{
          display: inline-block;
          font-family:'MicrosoftYaHei';
        }
        .left{
          float: left;
          text-align: start;
          color: $titlecolor;
          font-size: 14px;
        }
        .right{
          float: right;
          text-align: end;
          color: $fontcolor;
          font-size: 13px;
        }
      }
    }
  }
}
</style>
