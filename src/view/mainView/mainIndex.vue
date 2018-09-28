<template>
  <div class="mainInfor">
    <!--集成区域start-->
    <div style="margin-top:65px;margin-left:75px">
      <iframe frameborder=0   id="showindex" name="showHere"
              scrolling="auto">
      </iframe>
    </div>
    <!--集成区域end-->
  </div>
</template>

<script>
  window.onload=function(){
    const loginInfo = sessionStorage.getItem('loginInfo');
    document.getElementById('showindex').contentWindow.postMessage(sessionStorage.getItem('loginInfo'), "http://127.0.0.1:8080")
     //document.getElementById('showindex').contentWindow.postMessage(sessionStorage.getItem('loginInfo'), "https://vnap-webrtctest.ihxlife.com")

  }
  export default {
    components: {
      'UserInfor': () => import('@/view/mainView/MainIndex/userInfor'),
      'ServWarn': () => import('@/view/mainView/MainIndex/servWarn'),
      'UserRecord': () => import('@/view/mainView/MainIndex/userRecord'),
      'ServSummary': () => import('@/view/mainView/MainIndex/servSummary'),
      'SessionInfo': () => import('@/view/mainView/MainIndex/sessionInfo'),
      'TalkBox': () => import('@/view/mainView/MainIndex/talkBox'),
      'MsgHelper': () => import('@/view/mainView/MainIndex/msgHelper')
    },
    data() {
      return {
        UserId: sessionStorage.csId,
        iframeState: false,
        csType: null,
        jumpList: [
          {
            //img: one,
            //link: '/user/home/user=12345678'
          }
        ]
      }
    },
    mounted() {
     // alert(1);
      this.$nextTick(() => {

        const indexShow = document.getElementById('showindex');
        //indexShow.src = "https://vnap-webrtctest.ihxlife.com/videocs/home";
       indexShow.src = "http://127.0.0.1:8080/videocs/home";
        const deviceWidth = document.documentElement.clientWidth
        const deviceHeight = document.documentElement.clientHeight
        indexShow.style.width = deviceWidth + 'px'
        indexShow.style.height = deviceHeight + 'px'
        this.csType = this.$route.query.csType ? this.$route.query.csType : 1
      })
    },
    methods: {
      showIframe() {
        this.iframeState = true
      },
      postMsg() {
        // debugger;
       // const loginInfo = sessionStorage.getItem('loginInfo');
        //document.getElementById('showindex').contentWindow.postMessage(sessionStorage.getItem('loginInfo'), "http://127.0.0.1:8080")
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
