<template>
  <div class="summary">
    <div class="ser_sum">
      <h3>服务小结</h3>
      <img src="@/assets/mix.png" alt="">
    </div>
    <div class="detail_sum">
      <ul class="sum_left">
        <li>
          <span class="left">用户姓名</span>
          <span class="right">{{this.customData.userName}}</span>
        </li>
        <li>
          <span class="left">服务渠道</span>
          <span class="right">{{userState}}</span>
        </li>
        <li>
          <span class="left">保单号</span>
          <span class="right">
            <select>
              <option v-for="(item, index) in this.customData.policyInfo" :key="index">
                {{item.InfopolicyNo}}
              </option>
            </select>
          </span>
        </li>
        <li>
          <span class="left">身份证号</span>
          <span class="right">{{this.customData.idNo}}</span>
        </li>
        <li>
          <span class="left">联系方式</span>
          <span class="right">{{this.customData.userPhone}}</span>
        </li>
      </ul>
      <ul class="sum_right">
        <li>
          <span class="left">归属机构</span>
          <span class="right">{{this.customData.manageCom}}</span>
        </li>
        <li>
          <span class="left">服务内容</span>
          <span class="right">
            <a class="addbtn" @click="showCho1">请添加</a>
            <div class="choiceTab choice1" v-if="ChoShow1">
              <ul>
                <li v-for="(item, index) in choList" :key="index" @click="showCho2">{{item.name}}</li>
              </ul>
            </div>
            <div class="choiceTab choice2" v-if="ChoShow2">
              <ul>
                <li v-for="(item, index) in choList" :key="index" @click="showCho3">{{item.name}}</li>
              </ul>
            </div>
            <div class="choiceTab choice3" v-if="ChoShow3">
              <ul>
                <li v-for="(item, index) in choList" :key="index" @click="showCho4">{{item.name}}</li>
              </ul>
            </div>
            <div class="choiceTab choice4" v-if="ChoShow4">
              <ul>
                <li v-for="(item, index) in choList" :key="index" @click="showCho5">{{item.name}}</li>
              </ul>
            </div>
            <div class="choiceTab choice5" v-if="ChoShow5">
              <ul>
                <li v-for="(item, index) in choList" :key="index">{{item.name}}</li>
              </ul>
            </div>
          </span>
        </li>
        <li>
          <span class="left">备注</span>
          <span class="right"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SerPro',
  computed: {
    ...mapGetters([
      'customData'
    ])
  },
  data () {
    return {
      userState: '在线',
      ChoShow1: false,
      ChoShow2: false,
      ChoShow3: false,
      ChoShow4: false,
      ChoShow5: false,
      NumList: [
        {number: '880811****1511'},
        {number: '880811****1231'},
        {number: '880811****1111'}
      ],
      choList: [
        {name: '咨询工单'},
        {name: '咨询工单'},
        {name: '咨询工单'},
        {name: '咨询工单'}
      ]
    }
  },
  methods: {
    showCho1 () {
      this.ChoShow1 = true
    },
    showCho2 () {
      this.ChoShow2 = true
    },
    showCho3 () {
      this.ChoShow3 = true
    },
    showCho4 () {
      this.ChoShow4 = true
    },
    showCho5 () {
      this.ChoShow5 = true
    }
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
  height:180px;
  .ser_sum{
    height: 40px;
    line-height: 40px;
    // background: lightcyan;
    text-align: center;
    border-bottom: 1px solid $linecolor;
    position: relative;
    h3{
      font-weight: normal;
      float: left;
      font-size: 14px;
      font-family: 'MicrosoftYaHei';
      margin-left: 15px;
      margin-top: 8px;
      padding: 5px;
      color: $titlecolor;
    }
    img{
      width: 14px;
      height: 14px;
      margin-top: 15px;
      display: inline-block;
      position: absolute;
      top: -5px;
      right: 15px;
      cursor: pointer;
    }
  }
  .detail_sum{
    position: relative;
    height: auto;
    .sum_left{
      position: absolute;
      left: 0;
    }
    .sum_right{
      float: right;
    }
    ul{
      width: 50%;
      margin: 0;
      position: relative;
      li{
        display: inline-block;
        clear: both;
        width: 100%;
        height: 20px;
        line-height: 20px;
        margin-left: 15px;
        margin-top: 4px;
        span{
          float: left;
          font-size: 13px;
        }
        .left{
          font-family: 'MicrosoftYaHei';
          color: $fontcolor;
        }
        .right{
          font-family: 'MicrosoftYaHei';
          color: $linecolor;
          margin-left: 15px;
          select{
            padding-left: 2px;
            width:148px;
            border-radius: 10px;
            font-size:13px;
            font-family:'MicrosoftYaHei';
            color: $topfont;
          }
        }
        .addbtn{
          text-decoration: none;
          color: $sidecolor;
          position: relative;
          cursor: pointer;
        }
        .addbtn:hover{
          color: $sidecolor;
        }
        // 选择业务
        .choiceTab{
          display: inline-block;
          width: 85px;
          height: 122px;
          background: $white;
          border-radius: 10px;
          border: 1px solid $linecolor;
          ul{
            width: 100%;
            padding-top: 12px;
            li{
              margin: 0;
              text-align: center;
              height: 24px;
              line-height: 24px;
              color: $topfont;
              font-size:13px;
              font-family:'MicrosoftYaHei';
            }
            li:hover{
              background: $backtalk;
            }
          }
        }
        .choice1{
          position: absolute;
          bottom: -25px;
          right: 5px;
        }
        .choice2{
          z-index: 100;
          position: absolute;
          bottom: -25px;
          right: -70px;
        }
        .choice3{
          z-index: 100;
          position: absolute;
          bottom: -25px;
          right: -145px;
        }
        .choice4{
          z-index: 100;
          position: absolute;
          bottom: -25px;
          right: -220px;
        }
        .choice5{
          z-index: 100;
          position: absolute;
          bottom: -25px;
          right: -295px;
        }
      }
    }
  }
}
</style>
