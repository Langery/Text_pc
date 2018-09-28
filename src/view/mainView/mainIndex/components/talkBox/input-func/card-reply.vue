<template>
  <div class="card-reply">
    <table class="table">
      <thead>
        <tr>
          <th v-for="(item, index) in topList" :key="index">{{item.name}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in this.customData.policyInfo" :key="index">
          <td>{{item.agentChanel}}</td>
          <td>{{item.agentName}}</td>
          <td></td>
          <td>{{item.agentId}}</td>
          <td>{{item.agentPhone}}</td>
          <td>
            <button @click="SendCard(item)">Send</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'card-reply',
  props: {
    inputPos: {
      type: Number
    }
  },
  computed: {
    ...mapGetters([
      'customData'
    ])
  },
  data () {
    return {
      topList: [
        {name: '所属渠道'},
        {name: '代理人姓名'},
        {name: '性别'},
        {name: '工号'},
        {name: '电话'},
        {name: '推送'}
      ]
    }
  },
  mounted () {
  },
  methods: {
    SendCard (item) {
      console.log(item)
      // 封装父层需要数据，将数据传入到父层
      const data = {
        agentName: item.agentName,
        agentPhone: item.agentPhone,
        agentChanel: item.agentChanel,
        agentId: item.agentId
      }
      this.$emit('cardMsg', data)
    },
    ...mapMutations({
      setUserInfo: 'SET_USER_INFO'
    })
  }
}
</script>

<style lang="scss" scoped>
@import 'node_modules/bootstrap/scss/bootstrap.scss';
@import '@/css/allcolor.scss';

.card-reply{
  display: inline-block;
  width: 610px;
  height: 250px;
  background: $cardcolor;
  position: absolute;
  left: 0;
  top: -250px;
}
</style>
