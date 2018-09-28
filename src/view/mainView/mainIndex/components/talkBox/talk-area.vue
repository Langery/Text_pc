<template>
  <div class="talk-area">
    <div class="talk_show">
      <div class="talk_infor" id="container">
        <ul>
          <div class="loading" v-if="showLoading">
            <span> --  历史消息  -- </span>
          </div>
          <li v-for="(item, index) in this.msgs" :key="index" :class="[{'LeftSay': !item.isSelfSend, 'RightSay': item.isSelfSend}]">
            <p>{{item.time}}</p>
            <div class="main_infor">
              <!-- 显示为文字、图片、卡片 进行类型判断 -->
              <span class="fontside" v-if="item.msgType === msgTypes.msg_normal" v-html="item.content"></span>
              <img v-if="item.msgType === msgTypes.msg_img" :src="item.imgData.small" id="showImg">
              <span class="cardside" v-if="item.msgType === msgTypes.msg_card" v-html="item.content"></span>
            </div>
            <div class="header_img">
              <img :src="item.groupImg" alt="">
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="talk_input">
      <!-- 其他点击方式:头像、剪切、图片等 -->
      <div class="other_operation">
        <!-- 表情 -->
        <div class="choiceway">
          <a href="javascript:;">
            <img src="@/assets/emoji.png"  @click="emojiFuc">
          </a>
        </div>
        <!-- 头像表情显示 -->
        <avator-img v-show="showEmoji" v-on:selectEmojiWithCode="selectEmoji"></avator-img>
        <!-- 发送照片 -->
        <div class="choiceway">
          <!-- button -->
          <input type="file" id="UpImg" accept="images/*" ref="file" @change="upImg(this)" style="height: 100%;opacity:0;position:absolute;">
          <img src="@/assets/img.png" accept="images/*" ref="file">
        </div>
        <!--  截屏 -->
        <div class="choiceway">
          <img src="@/assets/cut.png">
        </div>
        <!-- 名片 -->
        <div class="choiceway">
          <img src="@/assets/card.png" @click="cardFuc">
        </div>
        <!-- 发送名片显示 -->
        <card-reply v-show="showCard" v-on:cardMsg="sendCard"></card-reply>
        <!-- 历史消息 -->
        <span class="history" @click="historyFuc">消息记录</span>
        <history-infor v-show="showHistory" @closeHistory="hiddenHistory"></history-infor>
      </div>
      <!-- 输入框 -->
      <textarea class="input_box" type="text" v-model="Talkmess" @keyup.enter="sendMess"></textarea>
      <img id="okImg" src="" v-show="false">
      <!-- 发送按钮 -->
      <button type="button" class="btn btn-primary send_btn" @click="sendMess">发送</button>
      <quick-reply @QuickReply="getReply"></quick-reply>
    </div>
  </div>
</template>

<script>
import { msgTypes } from '@/common/js/status'
import { mapGetters, mapMutations } from 'vuex'
import SerImg from '@/images/h.jpg'
import { setUserInfoMixin, IMMixin } from '@/common/js/mixin'

export default {
  name: 'talk-area',
  mixins: [
    setUserInfoMixin,
    IMMixin
  ],
  components: {
    'AvatorImg': () => import('@/view/mainView/mainIndex/components/talkBox/input-func/avator-img'),
    'CardReply': () => import('@/view/mainView/mainIndex/components/talkBox/input-func/card-reply'),
    'QuickReply': () => import('@/view/mainView/mainIndex/components/talkBox/input-func/quick-reply'),
    'HistoryInfor': () => import('@/view/mainView/mainIndex/components/talkBox/input-func/history-infor')
  },
  computed: {
    ...mapGetters([
      'msgs'
    ])
  },
  data () {
    return {
      msgTypes: msgTypes,
      showLoading: false,
      showEmoji: false,
      showCard: false,
      showHistory: false,
      dataUrl: '',
      InforList: [
        // 图片测试
        {
          nickName: '客人',
          // content: ViewImg,
          imgData: {
            big: '',
            small: ''
          },
          isSelfSend: false,
          time: '2018-07-01 9:12:32',
          isSystem: false,
          groupId: '',
          type: 'TEXT',
          msgType: msgTypes.msg_img,
          groupImg: SerImg
        },
        {
          who: '客人',
          content: '想一想还有什么没有实现',
          isSelfSend: false,
          time: '2018-07-01 9:13:32',
          groupId: '',
          msgType: msgTypes.msg_normal,
          groupImg: SerImg
        },
        {
          who: '小华',
          content: {
            name: '',
            number: '',
            id: ''
          },
          isSelfSend: false,
          time: '2018-07-01 9:13:32',
          groupId: '',
          msgType: msgTypes.msg_card,
          groupImg: SerImg
        }
      ],
      Talkmess: '',
      downFlag: false // 判断是否为加载中状态
    }
  },
  /**
   * scrollTop为滚动条在Y轴上的滚动距离
   * clientHeight为内容可视区域的高度
   * scrollHeight为内容可视区域的高度加上溢出（滚动）的距离
   * 滚动条到底部的条件即为scrollTop + clientHeight == scrollHeight
   */
  /**
   * this.loading = true  //显示加载动画
   * fetch()  // 发送请求
   * this.loading = false  //关闭动画、在请求数据成功后
   * this.loading
   */
  /**
   * activated
   * keep-alive 组件激活时调用
   * 该钩子在服务器端渲染期间不被调用
   */
  mounted () {
    const query = {
      cmd: 'create',
      roomName: sessionStorage.csId,
      userID: sessionStorage.loginID,
      userName: sessionStorage.nickName
    }
    this.setUserInfoToEnterRoom(query, this.initIM)
    // 第一次页面渲染完之后滚动条在最底部
    this.$nextTick(function () {
      const div = document.getElementById('container')
      div.scrollTop = div.scrollHeight
    })
    /**
     * unshift 在list头部添加数据,数据加载需要进行ajax请求
     */
    window.addEventListener('scroll', this.ScrollFun, true)
    // vuex
    // this.setMsgs(this.InforList)
  },
  activated () {
    this.$nextTick(function () {
      const div = document.getElementById('container')
      div.scrollTop = div.scrollHeight
    })
  },
  methods: {
    // 滚动事件 暂存
    ScrollFun () {
      let dom = document.getElementById('container')
      if (dom.scrollTop + dom.offsetHeight >= dom.scrollHeight) {
        // console.log('已超出文本范围')
      }
      if (dom.scrollTop === 0) {
        // console.log('===============> 已到达顶部 ')
        // 计时器
        setInterval(() => {
          this.showLoading = true
        }, 1000)
        let NewMsgs = this._shallowCopy(this.msgs)
        NewMsgs.unshift(this.msgs[3])
        this.setMsgs(NewMsgs)
      }
    },
    // 获取快捷回复
    getReply (CodeObj) {
      /**
       * concat() 方法用于连接两个或多个数组
       * 该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本
       * 对原来数组没有任何影响
       */
      const NewArr = this.msgs.concat(CodeObj)
      this.setMsgs(NewArr)
      this.$nextTick(function () {
        const div = document.getElementById('container')
        div.scrollTop = div.scrollHeight
      })
      this.Talkmess = ''
      if (this.msgs === '') {
        return false
      }
    },
    // 数组浅拷贝
    _shallowCopy (obj) {
      let newObj = []
      for (let key in obj) {
        newObj[key] = obj[key]
      }
      return newObj
    },
    // 子组件传参数据处理
    selectEmoji (code) {
      this.Talkmess = code
    },
    // 是否显示图标窗口
    emojiFuc () {
      this.showEmoji = !this.showEmoji
      this.$nextTick(function () {
        const div = document.getElementById('container')
        div.scrollTop = div.scrollHeight
      })
    },
    // 是否显示卡片窗口
    cardFuc () {
      this.showCard = !this.showCard
    },
    // 显示历史窗口
    historyFuc () {
      this.showHistory = true
    },
    // 关闭历史窗口
    hiddenHistory () {
      this.showHistory = false
    },
    // 发送按钮、回车 发送消息
    sendMess: function () {
      this.$nextTick(function () {
        const div = document.getElementById('container')
        div.scrollTop = div.scrollHeight
      })
      this.sendTextMsg(this.Talkmess)
      this.Talkmess = ''
      if (this.InforList === '') {
        return false
      }
    },
    // 上传图片
    upImg: function () {
      // 获取文件
      const file = document.querySelector('input[type=file]').files[0]
      this.sendImgMsg(file)
    },
    // 名片推送 子组件传参数据处理
    sendCard (data) {
      // this.showCard = false
      this.sendCardMsg(data)
    },
    ...mapMutations({
      setMsgs: 'SET_MSGS'
    })
  }
}
</script>

<style lang="scss" scoped>
@import 'node_modules/bootstrap/scss/bootstrap.scss';
@import '@/css/allcolor.scss';

.talk-area{
  display: inline;
}
.loading{
  display: inline-block;
  width: 100%;
  height: 40px;
  line-height: 40px;
  span{
    display: block;
    margin: 0 auto;
    text-align: center;
    clear: both;
    font-size: 13px;
  }
}
.talk_show{
  width: 100%;
  height: 315px;
  overflow: hidden;
  border-bottom: 1px solid $linecolor;
  ::-webkit-scrollbar-track-piece { //滚动条凹槽的颜色，还可以设置边框属性
    background-color:#f0f0f0;
  }
  ::-webkit-scrollbar {//滚动条的宽度
    width:5px;
    height:5px;
  }
  ::-webkit-scrollbar-thumb {//滚动条的设置
    background-color:#dddddd;
    background-clip:padding-box;
    min-height:30px;
  }
  ::-webkit-scrollbar-thumb:hover {//当鼠标浮动到滚动条上时的属性
    background-color:#bbb;
  }
  .talk_infor{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    ul{
      padding: 10px;
      padding-bottom: 0;
      list-style-type: none;
      padding: 0 80px;
      li{
        margin: 10px 0;
        margin-bottom: 20px;
        width: auto;
        clear: both;
        position: relative;
        p{
          width: 18%;
          padding: 6px 4px;
          margin: 0 auto;
          text-align: center;
          clear: both;
          margin-bottom: 5px;
          font-size: 10px;
          background: $shadowcolor;
          color: $white;
          border-radius: 10px;
        }
        .main_infor{
          clear: both;
          text-align: start;
          display: inline-block;
          width: auto;
          height: 100%;
          padding: 10px;
          border-radius: 10px;
          max-width: 380px;
          img{
            width: 100%;
            height: 100%;
          }
          .fontside{
            display: block;
            font-size: 10px;
            padding: 6px;
          }
        }
      }
      .header_img{
          display: inline-block;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          overflow: hidden;
          position: absolute;
          top: 25px;
          img{
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      // 聊天弹框设置
      .LeftSay{
        text-align: start;
        .header_img{
          left: -60px;
        }
        .main_infor{
          background: $leftback;
          .fontside{
            color: $white;
          }
        }
      }
      .RightSay{
        text-align: end; // 右侧
        .header_img{
          right: -60px;
        }
        .main_infor{
          background: $white;
          .fontside{
            color: $rightfont;
          }
        }
      }
    }
  }
}
.talk_input{
  width: 100%;
  height: 140px;
  position: relative;
  clear: both;
  button{
    background: $backtalk;
    color: $sidecolor;
    border-color: $sidecolor;
    border-radius: 40px;
  }
  .send_btn{
    position: absolute;
    right: 95px;
    bottom: 15px;
    width: 85px;
    height: 25px;
    line-height: 12px;
    font-size: 15px;
  }
  .other_operation{
    background: $backtalk;
    position: relative;
    text-align: start;
    width: 100%;
    height: 25%;
    .choiceway{
      position: relative;
      width: 26px;
      height: 26px;
      display: inline-block;
      overflow: hidden;
      margin-top: 15px;
      margin-left: 15px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .history{
      position: absolute;
      top: 14px;
      right: 21px;
      border: 1px solid $fontcolor;
      border-radius: 8px;
      cursor: pointer;
      color: $fontcolor;
      font-size: 11px;
      padding: 5px 9px;
      font-family: 'MicrosoftYaHei';
    }
  }
  .input_box{
    background: $backtalk;
    width: 100%;
    height: 70%;
    padding-bottom: 15%;
    padding: 10px;
    word-break:break-all;
    border: 0;
    position: absolute;
    left: 0;
    bottom: 0;
    outline: none;
    :focus{
      border: 0;
    }
  }
}
</style>
