import * as types from './mutation-types'

const mutations = {
  [types.SET_CUSTOM_DATA] (state, info) {
    state.customData = info
  },
  [types.SET_ROOM_ID] (state, id) {
    state.roomId = id
  },
  [types.SET_MSGS] (state, msgs) {
    state.msgs = msgs
  },
  [types.SET_QUEUE_MODE] (state, mode) {
    state.queueMode = mode
  },
  [types.SET_SCREEN_SHOT_IMAGE] (state, image) {
    state.screenShotImage = image
  }
}

export default mutations
