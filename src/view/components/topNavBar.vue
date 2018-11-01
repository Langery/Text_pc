<template>
  <nav class="nav_title navbar navbar-expand-sm bg-light navbar-inverse">
    <h3 class="title_name">服务系统</h3>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div id="collapsibleNavbar">
      <ul class="navbar-nav">
        <li class="nav-item" v-for="(item, index) in ClickList" :key="index" v-on:click="ClassMove(index)" v-bind:class="{active:index==current}">
          <a class="nav-link">{{item.name}}</a>
        </li>
        <li class="nav-item">
          <a class="nav-link">
            <img src="@/images/k.jpg" alt="" v-on:click="LoginShow()">
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
// import Bus from '@/script/bus.js'
import { ERR_OK, changestatus } from '@/server/index.js'

export default {
  name: 'TopnavBar',
  data () {
    return {
      showLogin: false,
      current: 0,
      ClickList: [
        {name: '就绪'},
        {name: '小憩'},
        {name: '签退'}
      ]
    }
  },
  methods: {
    ClassMove (index) {
      this.current = index
      // console.log(index)
      // Bus.$emit('status', index)
      if (index === 2) {
        console.log('========================> log out')
        this.$router.replace({path: '/login'})
        localStorage.clear()
      } else {
        // console.log('========================> change status')
        const data = {
          roomId: '123456789',
          operType: index
        }
        this._getChangeStatus(data)
      }
    },
    LoginShow (event) {
      this.showLogin = !this.showLogin
    },
    async _getChangeStatus (data) {
      const res = await changestatus(data)
      if (res.result.code === ERR_OK) {
        // console.log(res)
        console.log('=====================> get change status success')
      } else {
        console.log('=====================> get change status error')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'node_modules/bootstrap/scss/bootstrap.scss';
@import '@/css/allcolor.scss';

#collapsibleNavbar{
  height: 100%;
  ul{
    float: right;
    height: 100%;
    margin-right: 20px;
  }
}
.nav_title{
  width: 1296px;
  width: calc(100% - 70px);
  position: fixed;
  right: 0;
  height: 65px;
  line-height: 25px;
  display: inline-block;
  clear: both;
  padding-right: 70px;
  padding-bottom: 0px;
  // z-index: 99;
  .title_name{
    float: left;
    width:245px;
    text-align: start;
    height:40px;
    font-size:20px;
    font-family:'MicrosoftYaHei';
    color: $topfont;
    line-height:40px;
  }
  .nav-link{
    display: inline-block;
    font-size: 17px;
    height: 100%;
    font-family:'Adobe Heiti Std R';
    color: $topfont;
    line-height:50px;
    padding: 0;
    position: relative;
    cursor: pointer;
    img{
      width: 45px;
      height: 45px;
      border-radius: 50%;
      position: absolute;
      top: 5px;
    }
  }
  .active{
    color: #6ED763;
    /*border-bottom: 3px solid $sidecolor;*/
  }
  .active:before {
    content: '';
    display: inline-block;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: #6ED763;
  }
}
.tologin{
  display: inline-block;
  background: $white;
  width: 140px;
  height: 40px;
  line-height: 40px;
  border-radius: 10px;
  position: absolute;
  top: 60px;
  right: 15px;
  border: 1px solid $bordcolor;
}
</style>
