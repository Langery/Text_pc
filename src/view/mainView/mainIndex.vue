<template>
  <div class="mainInfor">
    <!-- 集成区域start -->
    <div style="margin-top:65px;margin-left:75px">
      <iframe frameborder=0 id="showindex" name="showHere" src="http://localhost:8080/videocs/home?csCode=hualife-video-test4" scrolling="auto" style="min-width: calc(100vw - 90px);min-height: calc(100vh - 60px)">
      </iframe>
    </div>
    <!-- 集成区域end -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      UserId: sessionStorage.csId,
      iframeState: false,
      csType: null,
      jumpList: [
        {
          // img: one,
          // link: '/user/home/user=12345678'
        }
      ]
    }
  },
  mounted () {
    this.$nextTick(() => {
      const indexShow = document.getElementById('showindex')
      indexShow.onload = function () {
        document.getElementById('showindex').contentWindow.postMessage(sessionStorage.getItem('loginInfo'), '*')
      }
      this.csType = this.$route.query.csType ? this.$route.query.csType : 1
    })
  },
  methods: {
    showIframe () {
      this.iframeState = true
    },
    postMsg () {
      // debugger
      // const loginInfo = sessionStorage.getItem('loginInfo')
      // document.getElementById('showindex').contentWindow.postMessage(sessionStorage.getItem('loginInfo'), "http://127.0.0.1:8080")
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'node_modules/bootstrap/scss/bootstrap.scss';
  @import '@/css/allcolor.scss';

  * {
    margin: 0;
    padding: 0;
  }

  .mainInfor {
    background: $gray;
    height: 100vh;
    overflow: hidden;
    .main_infor {
      // margin-left: 90px;
      display: block;
      // margin-top: 66px;
      padding: 0;
      position: relative;
      z-index: 0;
      .left_infor {
        display: inline-block;
        left: 0;
        position: absolute;
        clear: both;
        // overflow: hidden;
      }
    }
  }

  .chat_win {
    clear: both;
    width: 800px;
    margin-right: 36px;
    // overflow: hidden;
    height: auto;
    .talk_view {
      width: 100%;
      height: 455px;
      background: $backtalk;
      position: relative;
      margin-bottom: 8px;
      padding: 0;
    }
  }
</style>
