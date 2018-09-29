<template>
  <div class="logIndex">
    <h2 class="logtitle">{{logtitle}}</h2>
    <!-- 登录界面 -->
    <div class="viewbox" v-if="loginShow">
      <!-- 图标 -->
      <div class="headset">
        <img src="@/assets/headset.png" alt="">
      </div>
      <!-- 输入框 -->
      <span class="warnfont" v-show="noBoth">请输入用户名和密码</span>
      <span class="warnfont" v-show="noUser">请输入用户名</span>
      <span class="warnfont" v-show="noPass">请输入密码</span>
      <span class="warnfont" v-show="errorInput">请输入正确的用户名或密码</span>
      <input type="text" placeholder="账号(ID)" ref="userNum" @focus.prevent="errorClear" class="curinput">
      <input type="password" placeholder="密码(KEY)" ref="userPass" @focus.prevent="errorClear" class="curinput" @keyup.enter="userLogin">
      <span class="forgetpwd" @click="PageSwitch">{{forpwd}}</span>
      <!-- 登录按钮 -->
      <button class="btn btn-primary btn-lg userbtn" @click="userLogin">登录</button>
    </div>
    <!-- 注册界面 -->
    <div class="viewbox" v-if="registerShow">
      <h3 class="regtitle">{{forpwd}}</h3>
      <span class="regfont">{{regfont}}</span>
      <!-- 输入框 -->
      <input type="text" placeholder="账号(ID)" class="curinput">
      <input type="text" class="validate" placeholder="请输入验证码">
      <div class="sendcode">
        <span type="text" class="valicode" placeholder="">
        <img src="@/assets/refresh.png" alt="">
        </span>
      </div>
      <button class="btn btn-primary btn-lg userbtn">发送邮件</button>
      <span class="backlog" @click="PageSwitch">{{backlog}}</span>
    </div>
  </div>
</template>

<script>
import { ERR_OK, consumerLogin, createRoom } from '@/server/index.js'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      errorInput: false,
      noBoth: false,
      noUser: false,
      noPass: false,
      logtitle: 'Login System',
      forpwd: '忘记密码',
      regfont: '我们将会发送重置密码邮件到您的登录邮箱',
      backlog: '返回登录',
      loginShow: true,
      registerShow: false
    }
  },
  mounted () {

  },
  methods: {
    PageSwitch () {
      this.loginShow = !this.loginShow
      this.registerShow = !this.registerShow
    },
    // 创建房间
    async _createRoom (roomId, roomname) {
      const res = await createRoom(roomId, roomname)
      console.log(res)
      if (res.result.code === ERR_OK) {
        console.log('==========================> create room success')
        this.$nextTick(() => {
          console.log('==========================> jump to index')
          sessionStorage.setItem('roomid', res.data.roomId)
          console.log(sessionStorage.csId)
          this.$router.replace({path: '/home'})
        })
      } else {
        console.log('==========================> create room error')
        this.errorInput = true
      }
    },
    // request
    async _setUserLoginInfor (data) {
      const res = await consumerLogin(data)
      console.log(res)
      // console.log(ERR_OK) 0
      if (res.result.code === ERR_OK) {
        console.log('==========================> post success')
        const loginInfo = {
          csId: res.data.csId,
          csName: res.data.csName,
          nickName: res.data.nickName,
          servTimes: res.data.servTimes,
          userType: res.data.userType,
          likesCount: res.data.likesCount,
          giftCount: res.data.giftCount
        }
        sessionStorage.setItem('loginInfo', JSON.stringify(loginInfo))
        console.log(sessionStorage)
        this.setCustomInfo(res.data)
        const roomId = sessionStorage.csId
        const roomname = sessionStorage.csName
        this._createRoom(roomId, roomname)
      } else {
        console.log('===========================> post error ')
      }
    },
    // 登录
    userLogin () {
      console.log('================================> actived login ')
      let username = this.$refs.userNum.value
      let userpass = this.$refs.userPass.value
      // eslint-disable-next-line
      const userCheck = /[@#\$%\^&\*]+/g.test(username)
      if (userCheck === true) {
        alert('请输入合法用户名')
        this.$refs.userNum.value = ''
      }
      // eslint-disable-next-line
      const passCheck = /[@#\$%\^&\*]+/g.test(userpass)
      if (passCheck === true) {
        alert('请输入合法密码')
        this.$refs.userPass.value = ''
      }
      if (username === '' && userpass === '') {
        this.noBoth = true
      } else if (userpass === '') {
        this.noPass = true
      } else if (username === '') {
        this.noUser = true
      } else {
        console.log('============================> input success')
        // cs-test1
        // 123456
        const data = {
          loginName: username,
          password: userpass
        }
        // console.log(sessionStorage)
        this._setUserLoginInfor(data)
      }
    },
    // 清除错误提醒
    errorClear () {
      if (this.noBoth === true) {
        this.noBoth = false
      } else if (this.noUser === true) {
        this.noUser = false
      } else if (this.noPass === true) {
        this.noPass = false
      } else if (this.errorInput === true) {
        this.errorInput = false
      }
    },
    ...mapMutations({
      setCustomInfo: 'SET_CUSTOM_DATA'
    })
  }
}
</script>

<style lang="scss" scoped>
@import 'node_modules/bootstrap/scss/bootstrap.scss';
@import '@/css/allcolor.scss';

.logIndex{
  width: 100%;
  height: 100%;
  background: url(~/static/img/login.png) no-repeat;
  background-size: 100% 100%;
  position: relative;
  .logtitle{
    font-size:26px;
    font-family:'MicrosoftYaHei';
    font-weight:bold;
    color: $white;
    position: absolute;
    top: 120px;
    right: 170px;
  }
  // 视图框
  .viewbox{
    width: 356px;
    height: 380px;
    background:rgba(255,255,255,0.3);
    position: absolute;
    top: 170px;
    right: 120px;
    // 提示文字
    .warnfont{
      display: inline-block;
      position: absolute;
      top: 157px;
      left: 62px;
      color: $warncolor;
      font-size: 14px;
      font-family:'MicrosoftYaHeiLight';
    }
    .headset{
      display: inline-block;
      width: 110px;
      height: 110px;
      line-height: 110px;
      background: $black;
      opacity:0.5;
      border-radius: 50%;
      margin-top: 35px;
      margin-bottom: 32px;
      img{
        width: 57px;
        height: 55px;
      }
    }
    .forgetpwd{
      font-size:11px;
      font-family:'MicrosoftYaHeiLight';
      position: absolute;
      color: $white;
      right: 60px;
      bottom: 88px;
      cursor: pointer;
    }
    .regtitle{
      margin-top: 55px;
      margin-bottom: 20px;
      color: $white;
      // font-weight: bold;
      font-size:28px;
      font-family:'MicrosoftYaHei';
    }
    .regfont{
      color: $white;
      display: block;
      width: 180px;
      height: 30px;
      line-height: 30px;
      margin: 0 auto;
      margin-bottom: 40px;
      font-size:14px;
      font-family:'MicrosoftYaHeiLight';
    }
    .backlog{
      display: block;
      font-size:11px;
      margin: 0 auto;
      color: $white;
      font-family:'MicrosoftYaHeiLight';
      cursor: pointer;
    }
    .sendcode{
      display: inline-block;
      position: relative;
      clear: both;
      img{
        position: absolute;
        top: 11px;
        right: 15px;
        width: 13px;
        height: 13px;
      }
    }
  }
  input:focus{
    outline:none
  }
  // 通用 input 框宽度
  .curinput{
    width: 250px;
  }
  // 输入验证码
  .validate{
    display: inline-block;
    width: 140px;
    margin-left: 53px;
    clear: both;
    position: relative;
    top: -11px;
    margin-bottom: 10px;
  }
  // 验证码框
  .valicode{
    display: block;
    width: 100px;
    height: 34px;
    position: relative;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.2);;
    margin-right: 53px;
    clear: both;
    margin-left: 5px;
  }
  // 登录 忘记密码 通用按钮
  .userbtn{
    color: $white;
    width: 210px;
    height: 36px;
    line-height: 16px;
    font-size:17px;
    background: $sidecolor;
    border: 0;
    border-radius: 20px;
    font-family:'MicrosoftYaHeiLight';
    margin: 0 auto;
    margin-top: 15px;
    margin-bottom: 8px;
  }
  // input 输入框
  input{
    display: block;
    height: 36px;
    line-height: 36px;
    background:rgba(0,0,0,0.2);
    margin: 0 auto;
    margin-bottom: 21px;
    border-radius: 10px;
    padding-left: 14px;
    border: 0px;
    color: $white;
    clear: both;
    font-size: 14px;
    font-family:'MicrosoftYaHeiLight';
  }
  input:focus{
    border: 0;
  }
  input::-webkit-input-placeholder{
    color: $white;
    opacity: 1;
  }
}
</style>
