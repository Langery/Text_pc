<template>
  <div class="avator-img">
    <swiper class="swiper-img" :options="swiperOption" ref="SwiperAvator">
      <swiper-slide class="pagination" v-for="(page, index) in express[0].list" :key="index">
        <ul>
          <li class="page-item" v-for="list in page.pageList" :key="list.id" v-html="list.code" @click="selectEmoji(list.code)"></li>
        </ul>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { emojiMap } from '@/script/emojiMap'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'avator-img',
  components: {
    swiper,
    swiperSlide
  },
  props: {
    inputPos: {
      type: Number
    }
  },
  data () {
    return {
      express: [
        {
          name: 'emoji',
          icon: '#icon-wode',
          list: []
        }
      ],
      inputEle: null,
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        },
        // pagination: '.swiper-pagination',
        paginationClickable: true,
        mousewheelControl: true,
        observer: true,
        observeParents: true
      }
    }
  },
  mounted () {
    this.swiper.slideTo(0, 1000, false)
    this._normalizeEmojiList()
  },
  computed: {
    swiper () {
      return this.$refs.SwiperAvator.swiper
    }
  },
  methods: {
    _normalizeEmojiList () {
      const row = 3
      const col = 5
      const singleNum = row * col
      const totalPage = Math.floor((emojiMap.length + 1) / singleNum) + 1
      const map = emojiMap
      for (let i = 0; i < totalPage; i++) {
        const list = map.slice(i * singleNum, (i + 1) * singleNum)
        const temp = {
          page: i + 1,
          pageList: list
        }
        this.express[0].list.push(temp)
      }
    },
    selectEmoji (code) {
      this.$emit('selectEmojiWithCode', code)
      //        父组件绑定自定义回调方法  子组件参数内容
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/css/allcolor.scss';

.avator-img{
  width: 290px;
  height: 150px;
  background: $white;
  z-index: 100;
  opacity: 0.9;
  position: absolute;
  top: -150px;
  left: -60px;
  border-radius: 10px;
  .swiper-img{
    width: 100%;
    height: 100%;
  }
  ul{
    list-style-type: none;
    clear: both;
    padding: 15px;
    margin-top: 5px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    li{
      float: left;
      flex-basis: 20%;
      text-align: center;
      padding-bottom: 15px;
      font-size: 20px;
    }
  }
  .swiper-pagination{
    position: absolute;
    bottom: 15px;
    left: 0;
    right: 0;
    z-index: 101;
  }
}
</style>
