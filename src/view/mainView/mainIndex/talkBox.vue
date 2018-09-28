<template>
  <div class="talk_view">
    <talk-area @NewMsg="openPromt = true"></talk-area>
    <prompt-box  v-if="openPromt"></prompt-box>
  </div>
</template>

<script>
import { setUserInfoMixin, IMMixin } from '@/common/js/mixin'

export default {
  name: 'talkBox',
  mixins: [
    setUserInfoMixin,
    IMMixin
  ],
  components: {
    'TalkArea': () => import('@/view/mainView/mainIndex/components/talkBox/talk-area'),
    'PromptBox': () => import('@/view/mainView/mainIndex/components/talkBox/prompt-box')
  },
  data () {
    return {
      openPromt: false
      // openPromt: true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
