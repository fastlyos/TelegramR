'use strict';

import * as types from '../constants/Types';
import {addChatMessage, goToEnd} from "./chatAction";

export function setMessageStr(messageStr) {
  return {
    type: types.SET_MESSAGESTR,
    messageStr
  }
}

export function setMessageMedia(currentMessageMedia) {
  console.log(currentMessageMedia)
  return {
    type: types.SET_MESSAGEMEDIA,
    currentMessageMedia
  }
}

export function sendMessage() {
  return (dispatch, getState) => {
    const {messageStr} = getState().messageMedia;
    // dispatch(sendingMessage());
    // TODO: 模拟用户登录
    const result = fetch('https://www.baidu.com/')
      .then((res) => {
        dispatch(sendSuccess(messageStr));
      }).catch((error) => {
        dispatch(sendError(error));
      })
  }
}

export function showMessageModalFn() {
  return {
    type: types.SHOW_MESSAGEMODAL
  }
}

export function closeMessageModalFn() {
  return {
    type: types.CLOSE_MESSAGEMODAL
  }
}

function sendSuccess(messageStr) {
  console.log('success', messageStr);
  const newMessageObj = {
    id: '1',
    from_id: '1',
    to_id: '2',
    out: true,
    uname: 'Beats0',
    avatar: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4',
    message: messageStr,
    date: '12: 47'
  }
  return dispatch => {
    dispatch(setMessageStr(''))
    dispatch(addChatMessage(newMessageObj))
    dispatch(goToEnd(true))
  }
}

function sendError(error) {
  console.log(error);
  return {
    type: types.SEND_ERROR,
    errorInfo: error
  }
}

