<template>
  <div class="row_left">
    <img class="logotop" alt="" src="@/assets/logo.png" />
    <ul class="nav nav-list flex-column">
      <li>
        <router-link :to="{path: '/home'}"><img src="@/assets/icon1.png" alt=""><span class="badge badge-danger">1</span></router-link>
      </li>
      <li>
        <router-link :to="{path: '/user/history'}"><img src="@/assets/icon2.png" alt=""></router-link>
      </li>
      <li>
        <router-link :to="{path: '/user/infor'}"><img src="@/assets/icon3.png" alt=""></router-link>
      </li>
      <li>
        <router-link :to="{path: '/user/setting'}"><img src="@/assets/icon4.png" alt=""></router-link>
      </li>
    </ul>
  </div>
</template>

<script>
// import one from '@/assets/icon1.png'
// import two from '@/assets/icon2.png'

export default {
  name: 'SideBar',
  computed: {
    screenType () {
      return this.csType === 2
    }
  },
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
      /*
      const indexShow = document.getElementById('showindex')
      const deviceWidth = document.documentElement.clientWidth
      const deviceHeight = document.documentElement.clientHeight
      indexShow.style.width = deviceWidth + 'px'
      indexShow.style.height = deviceHeight + 'px'
      debugger
      this.csType = this.$route.query.csType ? this.$route.query.csType : 1

      // window.onload = function(){
      const loginInfo=sessionStorage.getItem('loginInfo');
      debugger
      document.getElementById('showindex').contentWindow.postMessage(sessionStorage.getItem('loginInfo'), "http://127.0.0.1:8080/")
      */
      // }
    })
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import 'node_modules/bootstrap/scss/bootstrap.scss';
@import '@/css/allcolor.scss';

iframe{
  position: relative;
  left: 70px;
  top: -158px;
}
.row_left{
  position: fixed;
  left: 0;
  top: 0;
  width: 70px;
  height: 100vh;
  background: $sidecolor;
  // overflow: hidden;
  .logotop{
    display: inline-block;
    width: 36px;
    margin-top: 18px;
    height: 36px;
  }
  ul{
    margin-top: 60px;
    li{
      margin-bottom: 35px;
      position: relative;
      a{
        display: inline-block;
        width: 20px;
        height: 20px;
        color: $white;
        img{
          width: 100%;
          height: 100%;
        }
      }
      span{
        position: absolute;
        top: -8px;
        right: 15px;
      }
    }
  }
}
</style>
