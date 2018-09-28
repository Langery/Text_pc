<template>
  <div class="quick-reply">
    <!-- 其他选择框 -->
    <button class="btn btn-primary dropdown-toggle more_btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    </button>
    <!-- 推荐用语 -->
    <div class="menu_list dropdown-menu" aria-labelledby="dropdownMenuButton">
      <a class="dropdown-item" @click="replyQuick" v-for="(item, index) in RecommendedList" :key="index">{{item.infor}}</a>
    </div>
  </div>
</template>

<script>
import MeImg from '@/images/k.jpg'

export default {
  name: 'quick-reply',
  data () {
    return {
      RecommendedList: [
        {infor: 'Action'},
        {infor: 'Another action'},
        {infor: 'Something else here'}
      ]
    }
  },
  methods: {
    // 快速回复
    replyQuick (e) {
      const CodeDate = new Date()
      let CodeObj = {
        who: '小华',
        content: e.target.innerText,
        isSelfSend: true,
        time: CodeDate.toLocaleTimeString(),
        groupId: '',
        msgType: 'text_msg',
        groupImg: MeImg
      }
      this.$emit('QuickReply', CodeObj)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'node_modules/bootstrap/scss/bootstrap.scss';
@import '@/css/allcolor.scss';

.more_btn{
  position: absolute;
  bottom: 15px;
  right: 30px;
  width: 45px;
  height: 25px;
  line-height: 12px;
  background: $backtalk;
  color: $sidecolor;
  border-color: $sidecolor;
  border-radius: 40px;
  :focus{
    border: 0;
  }
}
.menu_list{
  height: auto;
  clear: both;
  text-align: start;
  overflow: hidden;
}
</style>
