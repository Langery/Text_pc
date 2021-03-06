// import webim from 'webim'
/* eslint-disable */

const IM = (() => {
  function login(loginInfo, listeners, succ, fail) {
    webim.login(
      loginInfo,
      listeners,
      {
        isLogOn: false
      },
      function() {
        // 设置昵称
        webim.setProfilePortrait({
            'ProfileItem': [{
              'Tag': 'Tag_Profile_IM_Nick',
              'Value': loginInfo.identifierNick
            }]
          },
          function(resp) {
            succ()
          },
          function(err) {
            alert(err.ErrorInfo)
          }
        )
      },
      fail
    )
  }

  function logout() {
    webim.logout()
  }

  function createGroup(groupId, userID, succ, fail) {
    var options = {
      'GroupId': String(groupId),
      'Owner_Account': String(userID),
      'Type': 'AVChatRoom', // Private/Public/ChatRoom/AVChatRoom
      'ApplyJoinOption': 'FreeAccess',
      'Name': String(groupId),
      'Notification': '',
      'Introduction': '',
      'MemberList': []
    }
    webim.createGroup(
      options,
      function(resp) {
        if (succ) succ()
      },
      function(err) {
        if (err.ErrorCode === 10025 || err.ErrorCode === 10021) {
          if (succ) succ()
        } else {
          // eslint-disable-next-line
          sdkLog.error(err.ErrorInfo)
          if (fail) fail(err.ErrorCode)
        }
      }
    )
  }

  function joinGroup(groupId, identifier) {
    createGroup(groupId, identifier, function() {
      var options = {
        'GroupId': groupId // 群id
      }
      webim.applyJoinBigGroup(
        options,
        function(resp) {
          // JoinedSuccess:加入成功; WaitAdminApproval:等待管理员审批
          if (resp.JoinedStatus && resp.JoinedStatus === 'JoinedSuccess') {
            console.log('进群成功')
            webim.Log.info('进群成功')
          } else {
            alert('进群失败')
          }
        },
        function(err) {
          if (err.ErrorCode === 10013) {
            console.warn('applyJoinGroupSucc', groupId)
            return
          }
          alert(err.ErrorInfo)
        }
      )
    }, function() {
      alert('进群失败')
    })
  }

  function parseMsgs(newMsgList) {
    var textMsgs = []
    var whiteBoardMsgs = []
    for (var i in newMsgList) { // 遍历新消息
      var msg = parseMsg(newMsgList[i])
      if (msg && msg.type === 'TXWhiteBoardExt') {
        whiteBoardMsgs.push(msg.data)
      } else {
        textMsgs.push(msg)
      }
    }
    return {
      textMsgs: textMsgs,
      whiteBoardMsgs: whiteBoardMsgs
    }
  }

  function parseMsg(newMsg) {
    var msgItem = newMsg.getElems()[0]
    var type = msgItem.getType()
    var nickName = newMsg.getFromAccountNick()
    var msgStatus = ''
    var msgType = ''
    var time = ''
    var giftType = ''
    if (type === 'TIMCustomElem') {
      debugger
      var content = msgItem.getContent() // 获取元素对象
      var desc = JSON.parse(content.getDesc())
      msgType = desc.msgType
      msgStatus = desc.msgStatus
      time = desc.time
      var ext = JSON.parse(content.getExt())
      if (ext.giftType) {
        giftType = ext.giftType
      }
    } else if (type === 'TIMImageElem') {
      var imgList = msgItem.getContent().ImageInfoArray // 获取元素对象
      var imgData = {
        big: imgList[0].url,
        small: imgList[2].url
      }
      msgType = '5'
      msgStatus = '1'
    }
    return {
      nickName,
      imgData,
      content: newMsg.toHtml(),
      isSelfSend: newMsg.getIsSend(),
      isSystem: newMsg.getFromAccount() === '@TIM#SYSTEM' || false,
      msgType,
      msgStatus,
      time,
      giftType
    }
  }

  function parseMsgsInSystem(newMsgList) {
    var textMsgs = []
    var whiteBoardMsgs = []
    for (var i in newMsgList) { // 遍历新消息
      var msg = parseMsgInSystem(newMsgList[i])
      if (msg && msg.type === 'TXWhiteBoardExt') {
        whiteBoardMsgs.push(msg.data)
      } else {
        textMsgs.push(msg)
      }
    }
    // {data: 
    //   { code: 2, 
    //     csId: "001", 
    //     userId: "123", 
    //     userName: "测试用户"
    //   }, 
    //   openId: "xxx", 
    //   desc: "测试用户请求与您视频", 
    //   ext: ""
    // }
    return {
      textMsgs: textMsgs,
      whiteBoardMsgs: whiteBoardMsgs
    }
  }

  function parseMsgInSystem(newMsg) {
    var msgItem = newMsg.getElems()[0]
    var type = msgItem.getType()
    var nickName = newMsg.getFromAccountNick()
    var msgStatus = ''
    var msgType = ''
    var time = ''
    var giftType = ''
    if (type === 'TIMCustomElem') {
      var content = msgItem.getContent() // 获取元素对象
      var data = JSON.parse(content.getData())
      var desc = content.getDesc()
      // 配置参数
      var code = data.code
      var userId = data.userId
      var csId = data.csId
      var openId = data.openId
      var userName = data.userName
    }
    return {
      code,
      userId,
      csId,
      openId,
      userName,
      desc
    }
  }

  function sendMsg(identifier, groupId, msgContent) {
    // eslint-disable-next-line
    var self = this
    msgContent = msgContent.trim()
    if (!msgContent) {
      return
    }
    var selType = webim.SESSION_TYPE.GROUP // 当前聊天类型
    var selToID = String(groupId) // 当前选中聊天id（当聊天类型为私聊时，该值为好友帐号，否则为群号）
    var selSess = null // 当前聊天会话对象
    // eslint-disable-next-line
    var recentSessMap = {} // 保存最近会话列表
    if (!selSess) {
      selSess = new webim.Session(selType, selToID, selToID, null, Math.round(new Date().getTime() / 1000))
    }
    var isSend = true // 是否为自己发送
    var seq = -1 // 消息序列，-1表示sdk自动生成，用于去重
    var random = Math.round(Math.random() * 4294967296) // 消息随机数，用于去重
    var msgTime = Math.round(new Date().getTime() / 1000) // 消息时间戳
    var subType = webim.GROUP_MSG_SUB_TYPE.COMMON
    var msg = new webim.Msg(selSess, isSend, seq, random, msgTime, identifier, subType, null)
    msg.addText(new webim.Msg.Elem.Text(msgContent))
    msg.originContent = msgContent
    // eslint-disable-next-line
    webim.sendMsg(msg, function(resp) {}, function(err) {})
  }

  // 发送普通消息
  function sendRoomTextMsg(options, success, fail) {
    if (!options || !options.msg || !options.msg.trim()) {
      console.log('sendRoomTextMsg参数错误', options)
      fail && fail({
        errCode: -9,
        errMsg: 'sendRoomTextMsg参数错误'
      })
      return
    }
    sendCustomMsg({
      groupId: options.groupId,
      data: options.msg,
      desc: `{"nickName":"${options.nickName}","msgType":"${options.msgType}","time":"${options.time}","msgStatus":"${options.msgStatus}"}`,
      ext: `{"giftType":"${options.giftType}"}`,
      identifier: options.identifier,
      nickName: options.nickName
    }, function() {
      success && success()
    })
  }

  // 发送白板消息
  function sendBoardMsg(options, success, fail) {
    if (!options || !options.msg || !options.msg.trim()) {
      console.log('sendRoomTextMsg参数错误', options)
      fail && fail({
        errCode: -9,
        errMsg: 'sendRoomTextMsg参数错误'
      })
      return
    }
    sendCustomMsg({
      groupId: options.groupId,
      data: options.msg,
      ext: 'TXWhiteBoardExt',
      desc: '{"nickName":"' + options.nickName + '"}',
      identifier: options.identifier,
      nickName: options.nickName
    }, function() {
      success && success()
    })
  }

  // 发送自定义消息
  function sendCustomMsg(msgInfo, callback) {
    if (!msgInfo.groupId) {
      console.error('您还没有进入房间，暂不能聊天')
      return
    }
    // custom消息
    var data = msgInfo.data || ''
    var desc = msgInfo.desc || ''
    var ext = msgInfo.ext || ''

    var msgLen = webim.Tool.getStrBytes(data)
    if (data.length < 1) {
      alert('发送的消息不能为空!')
      return
    }
    var maxLen = webim.MSG_MAX_LENGTH.GROUP
    var errInfo = `消息长度超出限制(最多${Math.round(maxLen / 3)}汉字)`

    if (msgLen > maxLen) {
      alert(errInfo)
      return
    }

    var selSess = new webim.Session(webim.SESSION_TYPE.GROUP, msgInfo.groupId, msgInfo.groupId, null, Math.round(new Date().getTime() / 1000))
    var isSend = true // 是否为自己发送
    var seq = -1 // 消息序列，-1表示sdk自动生成，用于去重
    var random = Math.round(Math.random() * 4294967296) // 消息随机数，用于去重
    var msgTime = Math.round(new Date().getTime() / 1000) // 消息时间戳
    var subType = webim.GROUP_MSG_SUB_TYPE.COMMON
    var msg = new webim.Msg(selSess, isSend, seq, random, msgTime, msgInfo.identifier, subType, msgInfo.nickName)
    var customObj = new webim.Msg.Elem.Custom(data, desc, ext)
    msg.addCustom(customObj)

    // 调用发送消息接口
    webim.sendMsg(msg, (resp) => {
      webim.Log.info('发自定义消息成功')
      console.log('发自定义消息成功')
      callback && callback()
    }, function(err) {
      webim.Log.info(err.ErrorInfo)
      console.log('发自定义消息失败:', err)
    })
  }

  // 上传照片
  function uploadPic(img, extInfo) {
    var businessType // 业务类型，1-发群图片，2-向好友发图片
    // if (selType === SessionType.C2C) { // 向好友发图片
    //     businessType = webim.UPLOAD_PIC_BUSSINESS_TYPE.C2C_MSG
    // } else if (selType === SessionType.GROUP) { // 发群图片
    //     businessType = webim.UPLOAD_PIC_BUSSINESS_TYPE.GROUP_MSG
    // }
    businessType = webim.UPLOAD_PIC_BUSSINESS_TYPE.GROUP_MSG
    // 封装上传图片请求
    var opt = {
      'file': img, // 图片对象
      // 'onProgressCallBack': onProgress || (() => {}), // 上传图片进度条回调函数
      'From_Account': extInfo.from_id, // 发送者帐号
      'To_Account': extInfo.to_id, // 接收者
      'businessType': businessType// 业务类型
    }
    // 上传图片
    webim.uploadPic(
      opt,
      (resp) => {
        // 上传成功发送图片
        sendPic(resp, extInfo)
        console.log('上传成功发送图片')
      },
      (err) => {
        alert(err.ErrorInfo)
      }
    )
  }

  // 发送图片
  function sendPic(images, msgInfo, callback) {
      if (!msgInfo.groupId) {
        console.error('您还没有进入房间，暂不能聊天')
        return
      }
      var selSess = new webim.Session(webim.SESSION_TYPE.GROUP, msgInfo.groupId, msgInfo.groupId, null, Math.round(new Date().getTime() / 1000))
      var isSend = true // 是否为自己发送
      var seq = -1 // 消息序列，-1表示sdk自动生成，用于去重
      var random = Math.round(Math.random() * 4294967296) // 消息随机数，用于去重
      var msgTime = Math.round(new Date().getTime() / 1000) // 消息时间戳
      var subType = webim.GROUP_MSG_SUB_TYPE.COMMON
      var msg = new webim.Msg(selSess, isSend, seq, random, msgTime, msgInfo.identifier, subType, msgInfo.nickName)
      var imagesObj = new webim.Msg.Elem.Images(images.File_UUID)
      for (var i in images.URL_INFO) {
          var img = images.URL_INFO[i]
          var newImg
          var type
          switch (img.PIC_TYPE) {
              case 1: // 原图
                  type = 1 // 原图
                  break
              case 2:// 小图（缩略图）
                  type = 3 // 小图
                  break
              case 4:// 大图
                  type = 2 // 大图
                  break
          }
          newImg = new webim.Msg.Elem.Images.Image(type, img.PIC_Size, img.PIC_Width, img.PIC_Height, img.DownUrl)
          imagesObj.addImage(newImg)
      }
      msg.addImage(imagesObj)

      // 调用发送图片接口
      webim.sendMsg(msg, function(resp) {
          console.log('发送图片成功')
      }, function(err) {
          alert(err.ErrorInfo)
      })
  }

  return {
    login,
    logout,
    sendRoomTextMsg,
    createGroup,
    joinGroup,
    parseMsg,
    parseMsgs,
    parseMsgInSystem,
    parseMsgsInSystem,
    sendMsg,
    sendBoardMsg,
    uploadPic,
    sendPic
  }
})()

export default IM
