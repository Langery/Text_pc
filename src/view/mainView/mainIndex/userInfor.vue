<template>
  <div class="per_infor">
    <div id="demo" class="carousel slide" data-ride="carousel" style="position: unset;">
      <!-- 指示符 -->
      <ul class="carousel-indicators carousel_but">
        <li data-target="#demo" data-slide-to="0" class="active"></li>
        <li data-target="#demo" data-slide-to="1"></li>
        <li data-target="#demo" data-slide-to="2"></li>
      </ul>
      <!-- 轮播图片 -->
      <div class="carousel-inner">
        <div class="carousel-item active">
          <person-info></person-info>
        </div>
        <div class="carousel-item">
          <data-info></data-info>
        </div>
        <div class="carousel-item">
          <face-info></face-info>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ERR_OK, consumerInfor } from '@/server/index.js'
import { setUserInfoMixin, IMMixin } from '@/common/js/mixin'
import { mapMutations } from 'vuex'

export default {
  mixins: [
    setUserInfoMixin,
    IMMixin
  ],
  components: {
    'PersonInfo': () => import('@/view/mainView/mainIndex/components/userInfo/person-info'),
    'DataInfo': () => import('@/view/mainView/mainIndex/components/userInfo/data-info'),
    'FaceInfo': () => import('@/view/mainView/mainIndex/components/userInfo/face-info')
  },
  name: 'PerInfor',
  data () {
    return {
    }
  },
  mounted () {
    // 初始化聊天信息
    const self = this
    this.$nextTick(() => {
      self._getUserInfor(
        // sessionStorage.openId
        'oKXX7wABsIulcFpdlbwUyMKGisjQ' // openId
      )
      console.log(sessionStorage.openId)
    })
  },
  methods: {
    async _getUserInfor (data) {
      const res = await consumerInfor(data)
      console.log(res)
      if (res.result.code === ERR_OK) {
        console.log('===============> get success ')
        this.setUserData(res.data)
      } else {
        console.log('===============> get error ')
      }
    },
    ...mapMutations({
      setUserData: 'SET_CUSTOM_DATA'
    })
  }
}
</script>

<style lang="scss" scoped>
@import 'node_modules/bootstrap/scss/bootstrap.scss';
@import '@/css/allcolor.scss';
// 个人信息轮播
.per_infor{
  background: #ffffff;
  width:430px;
  height:200px;
  padding: 0;
  margin-bottom: 8px;
  position: relative;
  overflow: hidden;
  .carousel_but{
    position: absolute;
    bottom: -5px;
    li{
      background: $linecolor;
    }
    .active{
      background: $sidecolor;
    }
  }
}
</style>
