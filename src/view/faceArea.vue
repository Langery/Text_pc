<template>
  <div class="video-bar">
    <div class="full-screen-container">
      <div class="server-video-window">
        <video
          id="remoteVideo"
          muted
          autoplay
          playsinline
          src="videofile.ogg"
          poster="posterimage.jpg"
        ></video>
      </div>
      <canvas id="tenpcanvas"></canvas>
      <div class="customer-video-window">
        <video
          id="localVideo"
          autoplay
          playsinline
          src="videofile.ogg"
          poster="posterimage.jpg"
        ></video>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { RTCRoomMixin } from '@/common/js/mixin'
import { mapGetters, mapMutations } from 'vuex'
import { sleep } from '@/common/js/util'

export default {
  mixins: [
    // setUserInfoMixin,
    RTCRoomMixin
    // IMMixin
  ],
  computed: {
    ...mapGetters([
      'screenShotImage'
    ])
  },
  data () {
    return {
    }
  },
  mounted () {
    const query = this.$route.query
    this.initRTC(query)
    this.faceTimeOut()
  },
  methods: {
    // 封装流程 setTimeout
    async faceTimeOut () {
      // 异步处理
      await sleep(15000)
      await this.faceShot()
    },
    takeSnapshot: function () {
      // var video = document.getElementById('remoteVideo')
      // 暂时截取本地图片
      var video = document.getElementById('localVideo')
      var canvas = document.getElementById('tenpcanvas')
      var ctx = canvas.getContext('2d') // 类型是2d
      canvas.width = 400 // 画布的宽度等于视频屏幕的宽度
      canvas.height = 300
      ctx.drawImage(video, 0, 0, 400, 300) // 在画布上画画
      var base64 = canvas.toDataURL('images/png')
      console.log('=========截图成功=======' + base64)
      localStorage.setItem('Img1', base64)
      // localStorage.setItem('Img2', base64)
      // localStorage.setItem('Img3', base64)
      return base64
    },
    // 截图函数
    faceShot () {
      const promise = new Promise((resolve, reject) => {
        // 截取用户头像
        const url64 = this.takeSnapshot()
        if (url64 !== null) {
          this.setScreenShotImage([
            url64
          ])
          console.log(url64)
          resolve()
        } else {
          console.log('未获取到图片')
          reject(new Error('error'))
        }
      })
      return promise
    },
    ...mapMutations({
      setScreenShotImage: 'SET_SCREEN_SHOT_IMAGE'
    })
  }
}
</script>

<style lang="scss">
.video-bar {
  .line-up {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 105;
  }
  .full-screen-container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    .video-footer {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: 10;
    }
    .server-video-window {
      position: fixed;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      background-color: #666;
      z-index: 0;
      video {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .customer-video-window {
      position: fixed;
      top: 0;
      right: 0;
      margin: .5rem .5rem 0 0;
      width: 9rem;
      height: 17.2rem;
      border-radius: .4rem;
      z-index: 200;
      background-color: #222;
      overflow: hidden;
      z-index: 1;
      video {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .mini-container {
    position: fixed;
    top: 0;
    right: 0;
    margin: .5rem .5rem 0 0;
    width: 9rem;
    height: 17.2rem;
    border-radius: .4rem;
    z-index: 200;
    background-color: #222;
    overflow: hidden;
    .server-video-window {
      width: 100%;
      height: 100%;
      background-color: #666;
      video {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
