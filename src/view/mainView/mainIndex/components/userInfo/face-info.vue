<template>
  <div class="face-info">
    <div class="face">
      <h3>人脸识别</h3>
      <ul>
        <li v-for="(item, index) in this.ImgList" :key="index">
          <img :src="item.Img" alt="">
          <span v-if="item === ''" class="empty"></span>
        </li>
      </ul>
    </div>
    <div class="face_data">
      <ul>
        <li>
          <span class="lefttitle">识别信息</span>
        </li>
        <li>
          <span class="left">客户姓名</span>
          <span class="right">{{this.customData.userName}}</span>
        </li>
        <li>
          <span class="left">证件类型</span>
          <span class="right">{{userCard}}</span>
        </li>
        <li>
          <span class="left">证件号码</span>
          <span class="right">{{userID}}</span>
        </li>
        <li>
          <span class="left">识别率</span>
          <span class="right">{{userRecog}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import H from '@/images/h.jpg'
import { ERR_OK, faceRecognition } from '@/server/index.js'
import { mapGetters } from 'vuex'
import Bus from '@/script/bus.js'

export default {
  name: 'face-info',
  computed: {
    ...mapGetters([
      'customData'
      // 'screenShotImage'
    ])
  },
  data () {
    return {
      ImgList: [
        {Img: ''},
        {Img: ''},
        {Img: ''}
      ],
      userCard: '身份证',
      userID: '',
      userRecog: ''
    }
  },
  mounted () {
    console.log(this.customData)
    Bus.$on('startTime', setTime => {
      console.log(setTime)
      if (setTime === true) {
        console.log('===========================> start update Img')
        let timer = setInterval((stopLoop) => {
          if (!localStorage.Img1 && !localStorage.Img2 && !localStorage.Img3) {
          } else {
            this.Img1 = localStorage.Img1
            this.ImgList[0].Img = localStorage.Img1
            console.log(this.Img1)
            window.clearInterval(timer)
            const data = {
              idType: this.customData.idType,
              idNo: this.customData.idNo,
              detectionFile: localStorage.Img1
            }
            this._getFaceRecognition(data)
          }
        }, 1000)
      } else {
        console.log('===========================> end update Img')
      }
    })
  },
  methods: {
    // 人脸识别接口
    // idType         证件类型  this.customData.idType
    // idNo           身份证号  this.customData.idNo
    // detectionFile  图片base64
    async _getFaceRecognition (data) {
      const res = await faceRecognition(data)
      debugger
      console.log(res)
      if (res.result.code === ERR_OK) {
        console.log('=========================> Recognition success')
      } else {
        console.log('=========================> Recognition error')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/css/allcolor.scss';

.face-info{
  width: 100%;
  height: 200px;
  clear: both;
  .face{
    width: 50%;
    height: 100%;
    float: left;
    clear: both;
    overflow: hidden;
    h3{
      text-align: start;
      font-weight: normal;
      font-size:17px;
      font-family:'MicrosoftYaHei';
      margin-left: 14px;
      margin-top: 14px;
      color: $titlecolor;
    }
    ul{
      margin-top: 20px;
      margin-left: 28px;
      li{
        float: left;
        margin: 0 8px;
        img{
          width: 71px;
          height: 92px;
        }
        .empty{
          display: inline-block;
          width: 36px;
          height: 36px;
          background: lightgreen;
        }
      }
    }
  }
  .face_data{
    width: 50%;
    height: 100%;
    float: right;
    ul{
      padding: 0;
      margin: 5px;
      margin-top: 28px;
      margin-right:40px;
      list-style-type: none;
      li{
        clear: both;
        display: block;
        height: 2vh;
        margin-bottom: 13px;
        color: $fontcolor;
        span{
          display: inline-block;
          font-size:13px;
          font-family:'MicrosoftYaHei';
          color: $linecolor;
        }
        .left{
          float: left;
          text-align: start;
        }
        .lefttitle{
          float: left;
          text-align: start;
          font-size: 14px;
          font-family:'MicrosoftYaHei';
          color: $fontcolor;
        }
        .right{
          float: right;
          text-align: end;
          color: $fontcolor;
        }
      }
    }
  }
}
</style>
