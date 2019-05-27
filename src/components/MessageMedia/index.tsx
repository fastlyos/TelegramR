/**
 * https://core.telegram.org/constructor/message
 * @param   id        {int}  Message id
 * @param   from_id   {int}  Message sender
 * @param   to_id     {Peer}  Message recipient
 * @param   out       {Bool}  If true, message was sent by the current user
 * @param   unread    {Bool}  Read status
 * @param   date      {int}  Date created
 * @param   message   {string}  Message text
 * @param   media     {MessageMedia}  Media content
 * @param   flags     {int}  Flag mask for the message:
 * @param   flags & 0x1 - message is unread (moved here from unread)
 * @param   flags & 0x2 - message was sent by the current user (moved here from out)
 Parameter was added in Layer 17.
 * */


/**
 * https://core.telegram.org/type/MessageMedia
 * @type MessageMedia
 * @Constructors    messageMediaEmpty      Empty constructor
 * @Constructors    messageMediaPhoto      Attached photo
 * @Constructors    messageMediaVideo      Attached video
 * @Constructors    messageMediaGeo        Attached map
 * @Constructors    messageMediaContact    Attached contact
 * @Constructors    messageMediaDocument   Attached document
 * @Constructors    messageMediaAudio      Attached audio file
 * */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  TextInput,
  Keyboard,
} from 'react-native';
import Modal from 'react-native-modal'
import ImagePicker from "react-native-image-picker"
// TODO: add 'react-native-fs' & 'react-native-fetch-blob'
import MessageMediaAudio from './MessageMediaAudio'
import MessageMediaSticker from './MessageMediaSticker'
import MessageMediaPhoto from './MessageMediaPhoto'
import S from '../../public/style'
import Svg from "../../lib/svg";
import { color, screen } from '../../utils'
import { TouchableCross } from '../../components'
import { connect } from "react-redux";
import * as messageMediaAction from "../../actions/messageMediaAction";
// import messageMedia from "../../reducers/messageMediaReducer";

interface Props {

}

interface State {

}

class MessageMedia extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      messageStr: '',
      currentMessageMedia: '',
      showMessageModal: false,
      fadeInUp: 0
      // fadeInUp: new Animated.Value(0)
    }
  }

  handleShowMessageMediaModal = (currentMessageMediaName: string) => {
    const { showMessageModalFn, setMessageMedia } = this.props
    showMessageModalFn()
    setMessageMedia(currentMessageMediaName)
    Keyboard.dismiss()
    // Animated.timing(
    //   this.state.fadeInUp,//初始值
    //   {
    //     toValue: 180,
    //     duration: 200,
    //   }
    // ).start();
  }

  handleCloseMessageMediaModal = () => {
    const { closeMessageModalFn } = this.props
    closeMessageModalFn()
    this.refs.messageInput.focus()
    // Animated.timing(
    //   this.state.fadeInUp,//初始值
    //   {
    //     toValue: 0,
    //     duration: 200,
    //   }
    // ).start();
  }

  handleSetCurrentMessageMedia = (currentMessageMediaName: string) => {
    const { currentMessageMedia, closeMessageModalFn } = this.props;
    if (currentMessageMedia === currentMessageMediaName) {
      closeMessageModalFn()
    } else {
      this.handleShowMessageMediaModal(currentMessageMediaName)
    }
  }

   // 选择图片
   selectPhotoTapped = () => {
    const {sendMessageMedia} = this.props
    const options = {
      title: '选择图片',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '选择照片',
      cameraType: 'back',
      mediaType: 'photo',
      videoQuality: 'medium',
      // 图片质量
      durationLimit: 10,
      maxWidth: 500,
      // 图片大小
      maxHeight: 500,
      // 图片大小
      quality: 0.8,
      angle: 0,
      allowsEditing: false,
      noData: false,
      storageOptions: {skipBackup: true},
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const photos = [
          response.uri
        ]
        sendMessageMedia(photos, 'img')
        // TODO: add upload file api
        // let file = {
        //   uri: response.uri,
        //   name: response.fileName,
        //   type: response.type
        // }
        // let formData = new FormData()
        // formData.append('photo', file)
        // apiUpload.avatar(formData).then(data => {
        //   if (data.type === 'success') {
        //
        //   }
        // })
      }
    });
  };


  renderCurrentMessageMedia = () => {
    const { currentMessageMedia } = this.props;
    switch (currentMessageMedia) {
      case '':
        return null
      case 'MessageMediaAudio':
        return <MessageMediaAudio/>
      case 'MessageMediaSticker':
        return <MessageMediaSticker/>
      case 'MessageMediaPhoto':
        return <MessageMediaPhoto/>
      default:
        return null
    }
  }

  // TODO: modal 弹出层，已废弃
  renderModal = () => {
    const { messageStr, showMessageModal, currentMessageMedia } = this.props;
    return (
      <Modal
        isVisible={ showMessageModal }
        closeOnClick={ true }
        transparent={ true }
        onBackdropPress={ () => this.setState({ showMessageModal: false }) }
        // backdropOpacity={0}
        onRequestClose={ this.closeMessageMediaModal }
        swipeDirection='down'
        onModalWillHide={ this.closeMessageMediaModal }
        deviceHeight={ screen.height - 100 }
        style={ {
          flexDirection: 'column',
          justifyContent: 'flex-end',
          margin: 0,
          height: 180
        } }
      >
        <View style={ [styles.messageContainer, S.borderTopOne] }>
          { this.renderCurrentMessageMedia() }
        </View>
      </Modal>
    )
  }

  render() {
    const {
      messageStr,
      showMessageModal,
      currentMessageMedia,
      setMessageStr,
      sendMessage
    } = this.props;
    // TODO: simple menuItems
    // const menuItems = [
    //
    // ]
    return (
      <View style={ [styles.messageContainer, S.borderTopOne] }>
        <View styl={ S.inputBar }>
          <TextInput
            ref="messageInput"
            style={ styles.input }
            placeholder="输入消息"
            placeholderTextColor={ color.gray }
            onChangeText={ setMessageStr }
            onFocus={ this.handleCloseMessageMediaModal }
            onTouchStart={ this.handleCloseMessageMediaModal }
            value={ messageStr }
            multiline={ true }
            numberOfLines={ 4 }
          />
          <TouchableCross
            onPress={ sendMessage }
            feed={ true }
            disabled={ messageStr === '' }
            background={ TouchableNativeFeedback.Ripple(color.border, false) }
          >
            <View style={ [S.btnContainer, S.flexCenter, styles.sendBtn] }>
              <Svg icon="send" size="25" color={ messageStr ? color.blue : color.gray }/>
            </View>
          </TouchableCross>
        </View>
        <View style={ [styles.inputMenu, { backgroundColor: color.grayLight }] }>
          <TouchableOpacity onPress={ () => this.handleSetCurrentMessageMedia('MessageMediaAudio') }
                            style={ [S.btnContainer, styles.menuBtn] }>
            <Svg icon="audio" size="26"
                 color={ currentMessageMedia === 'MessageMediaAudio' ? color.blueLight : color.gray }/>
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => this.handleSetCurrentMessageMedia('MessageMediaSticker') }
                            style={ [S.btnContainer, styles.menuBtn] }>
            <Svg icon="smile" size="26"
                 color={ currentMessageMedia === 'MessageMediaSticker' ? color.blueLight : color.gray }/>
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => this.handleSetCurrentMessageMedia('MessageMediaPhoto') }
                            style={ [S.btnContainer, styles.menuBtn] }>
            <Svg icon="image" size="27"
                 color={ currentMessageMedia === 'MessageMediaPhoto' ? color.blueLight : color.gray }/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.selectPhotoTapped} style={ [S.btnContainer, styles.menuBtn] }>
            <Svg icon="camera" size="27" color={ color.gray }/>
          </TouchableOpacity>
          <TouchableOpacity style={ [S.btnContainer, styles.menuBtn] }>
            <Svg icon="file" size="23" color={ color.gray }/>
          </TouchableOpacity>
          <TouchableOpacity style={ [S.btnContainer, styles.menuBtn] }>
            <Svg icon="phone" size="26" color={ color.gray }/>
          </TouchableOpacity>
          <TouchableOpacity style={ [S.btnContainer, styles.menuBtn] }>
            <Svg icon="location" size="25" color={ color.gray }/>
          </TouchableOpacity>
        </View>
        {/*FIXME: use Animated.View*/ }
        <View style={ { height: showMessageModal ? 180 : 0 } }>
          { this.renderCurrentMessageMedia() }
        </View>
        {/*FIXME: use Modal Vew*/ }
        {/*{this.renderModal()}*/ }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'column',
    backgroundColor: color.white
  },
  inputMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  input: {
    height: 46,
    width: screen.width - 50,
    padding: 0,
    marginHorizontal: 10,
    fontSize: 14,
    backgroundColor: color.white
  },
  sendBtn: {
    position: 'absolute',
    width: 46,
    height: 46,
    top: 0,
    right: 0
  },
  mediaContainer: {
    height: 200,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuBtn: {
    marginRight: 25
  }
})

export default connect(
  (state) => ({
    messageStr: state.messageMedia.messageStr,
    showMessageModal: state.messageMedia.showMessageModal,
    currentMessageMedia: state.messageMedia.currentMessageMedia,
    error: state.messageMedia.error,
    errorInfo: state.messageMedia.errorInfo
  }),
  (dispatch) => ({
    setMessageStr: (str) => dispatch(messageMediaAction.setMessageStr(str)),
    setMessageMedia: (mediaName) => dispatch(messageMediaAction.setMessageMedia(mediaName)),
    sendMessage: () => dispatch(messageMediaAction.sendMessage()),
    showMessageModalFn: () => dispatch(messageMediaAction.showMessageModalFn()),
    closeMessageModalFn: () => dispatch(messageMediaAction.closeMessageModalFn()),
    sendMessageMedia: (messageObj, mediaType) => dispatch(messageMediaAction.sendMessageMedia(messageObj, mediaType))
  })
)(MessageMedia)