/* eslint-disable */

import http from './request'

// 错误状态码
export const ERR_OK = '0'

// WebRTCRoom
// 获取用户登录信息
// export const getLoginInfo = data => http.post('RTCRoom', '/getLoginInfo', data)
export const getLoginInfo = userId => http.get('RTCRoom', `/im/account/login?userId=${userId}`)
/**
 * [createRoom 创建房间]
 */
export const createRoom = async(roomId, roomname) => http.post('RTCRoom', '/comm/room/create', {roomId, roomname})

/**
 ************************************ 座席端 public ************************************
 */
/**
 * [changestatus 登录状态]
 */
export const changestatus = data => http.post('RTCRoom', '/comm/room/changestatus', data)
/**
 * [consumerLogin 用户登录]
 */
export const consumerLogin = data => http.post('public', '/video/cs/login', data)
/**
 * [consumerInfor 用户信息查询]
 */
export const consumerInfor = openId => http.get('public', `/video/cs/user?openId=${openId}`)
/**
 * [sendCard 名片推送]
 */
export const sendCard = data => http.post('public', '/video/cs/agentinfo', data)
/**
 * [faceRecognition 人脸识别]
 */
export const faceRecognition = data => http.post('public', '/video/cs/face/match', data)
