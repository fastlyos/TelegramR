import React, { Component } from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  Platform,
  StatusBar
} from 'react-native';
import { SafeAreaView, NavigationScreenProp, NavigationParams, NavigationState } from 'react-navigation';
import { Avatar, Btn, TouchableCross } from '../../components'
import S from "../../public/style";
import { color, screen } from "../../utils";
import Svg from "../../lib/svg";
import { H4, H2 } from "../../components/TextTool";

const { HEADER_MAX_HEIGHT } = screen


interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface State {
  scrollY: any;
  refreshing: boolean;
}


export default class User extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
      ),
      refreshing: false,
    };
  }

  private navigateTo = (routeName: string, params?: NavigationParams) => {
    this.props.navigation.navigate(routeName, params)
  };

  renderHeaderBar = () => (
    <View style={ [S.flexSB, S.flexAIC, S.pd10, {
      position: 'absolute',
      top: 18,
      left: 0,
      borderWidth: 1,
      borderColor: '#991010',
      width: screen.width,
      justifyContent: 'space-between',
    }] }>
      <View style={ [S.flexCenter, { width: 30, height: 30 }] }>
        <Btn circular={ true } onPress={ () => (this.props.navigation.goBack()) }>
          <Svg icon="arrowleft" size="22"/>
        </Btn>
      </View>
      <View style={ [S.flexCenter, { width: 30, height: 30 }] }>
        <Btn circular={ true } onPress={ () => Alert.alert('search') }>
          <Svg icon="ellipsis" size="25"/>
        </Btn>
      </View>
    </View>
  )

  renderFiles = () => {
    const files = [
      {
        id: '',
        uri: 'https://pic.xiami.net/images/collect/903/3/183545903_58e320f4e3be9_vzkF_1491280116.jpg?x-oss-process=image/resize,limit_0,s_390,m_fill/quality,q_80'
      },
      {
        id: '',
        uri: 'https://pic.xiami.net/images/collect/422/22/148428422_5864dfa89fbe9_RTkK_1483005864.jpg?x-oss-process=image/resize,m_fill,limit_0,s_300/quality,q_80'
      },
      {
        id: '',
        uri: 'https://pic.xiami.net/images/collect/541/41/250879541_5864df07561a7_zbdx_1483005703.jpg?x-oss-process=image/resize,m_fill,limit_0,s_300/quality,q_80'
      },
      {
        id: '',
        uri: 'https://pic.xiami.net/images/collect/495/95/104618495_5864df86bad80_EMKX_1483005830.jpg?x-oss-process=image/resize,m_fill,limit_0,s_300/quality,q_80'
      },
    ]
    return (
      <View style={ styles.itemLabel }>
        <TouchableCross feed={ true } onPress={ () => Alert.alert('files') }>
          <View style={ styles.title }>
            <Text style={ styles.textTitle }>媒体文件</Text>
            <Image source={ require('../../static/images/ico_right.png') } style={ styles.arrowRight }/>
          </View>
        </TouchableCross>
        <View style={ styles.labelContainer }>
          {
            files.map((item, index) => {
              return (
                <TouchableOpacity style={ styles.labelItem } key={ index }>
                  <Image source={ { uri: item.uri } } style={ styles.fileImg }/>
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
    )
  }

  renderGroup = () => {
    const groups = [
      { title: '组1', uri: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4' },
      { title: '组2', uri: 'https://avatars3.githubusercontent.com/u/16267608?s=70&v=4' },
      { title: '组3', uri: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4' },
      { title: '组4', uri: 'https://avatars3.githubusercontent.com/u/16267608?s=70&v=4' },
      { title: '组5', uri: 'https://avatars3.githubusercontent.com/u/16267608?s=70&v=4' },
    ]
    return (
      <View style={ [styles.itemLabel, { borderTopWidth: screen.onePixel, borderTopColor: color.borderOne }] }>
        <TouchableCross feed={ true } onPress={ () => this.navigateTo('Groups') }>
          <View style={ styles.title }>
            <Text style={ styles.textTitle }>加入的群</Text>
            <Image source={ require('../../static/images/ico_right.png') } style={ styles.arrowRight }/>
          </View>
        </TouchableCross>
        <View style={ styles.labelContainer }>
          {
            groups.map((item, index) => (
                <TouchableOpacity onPress={ () => this.navigateTo('Chat') } style={ styles.groupBox } key={ index }>
                  <View style={ [S.flexCenter, styles.groupItem] }>
                    <Image source={ { uri: item.uri } } style={ styles.groupImg }/>
                  </View>
                  <Text style={ styles.groupText }>{ item.title }</Text>
                </TouchableOpacity>
              )
            )
          }
        </View>
      </View>
    )
  }

  render() {
    // Because of content inset the scroll value will be negative on iOS so bring
    // it back to 0.
    const scrollY = Animated.add(
      this.state.scrollY,
      Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
    );

    return (
      <SafeAreaView style={ styles.container }>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="rgba(0, 0, 0, 0)"
        />
        <ScrollView showsVerticalScrollIndicator={ false } style={ styles.container }>
          <Image source={ { uri: 'https://i0.hdslb.com/bfs/space/0d8ca2df20e9ac78596f7b5b3c4f9c8f44938c47.png' } }
                 resizeMode='cover'
            // blurRadius={1}
                 style={ styles.bg }/>
          <View style={ [S.pd10, S.flexRow] }>
            <View style={ { marginTop: -50 } }>
              <Avatar uri={ 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4' } size={ 80 }/>
            </View>
            <View style={ [S.flexCenter, styles.editBtn] }>
              <TouchableCross onPress={ () => Alert.alert('编辑') }
                              feed={ true }
                              style={ [S.flexCenter, styles.editBtn] }
              >
                <Text>编辑</Text>
              </TouchableCross>
            </View>
          </View>
          <View style={ styles.userInfoContainer }>
            <H2 title={ 'Beats0' } style={ { fontWeight: 'bold' } }/>
            <H4 title={ '@Beats0ling' } color={ '#A7A7A7' }/>
            <H4 title={ 'some sign...' } style={ { marginVertical: 5 } }/>
            <H4 title={ 'Gensokyo' } color={ '#1da1f2' }/>
            <H4 title={ 'github.com/Beats0' } color={ '#1da1f2' }/>
          </View>
          <View style={ S.spacing }/>
          { this.renderFiles() }
          { this.renderGroup() }
        </ScrollView>
        { this.renderHeaderBar() }
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    width: screen.width,
    height: 120,
  },
  userInfoContainer: {
    flexDirection: 'column',
    padding: 10,
  },
  editBtn: {
    position: 'absolute',
    right: 10,
    top: 10,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderRadius: 20,
    borderColor: '#A7A7A7',
  },
  itemLabel: {
    marginBottom: 5,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  textTitle: {
    color: '#000',
    fontSize: 16,
  },
  arrowRight: {
    transform: [
      {
        scale: 0.4
      }
    ]
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10
  },
  labelItem: {
    width: screen.width / 4 - 8,
    height: screen.width / 4 - 8,
    marginHorizontal: 2
  },
  fileImg: {
    width: screen.width / 4 - 10,
    height: screen.width / 4 - 10,
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: screen.width - 30,
    height: screen.width * 0.32,
    overflow: 'hidden',
    flexWrap: 'wrap'
  },
  groupBox: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  groupItem: {
    width: screen.width / 5 - 15,
    height: screen.width / 5 - 15,
    borderRadius: (screen.width / 5 - 15) / 2,
    overflow: 'hidden',
    marginRight: 10
  },
  groupImg: {
    width: screen.width / 5 - 20,
    height: screen.width / 5 - 20,
    borderRadius: (screen.width / 5 - 20) / 2,
  },
  groupText: {
    fontSize: 14,
    color: '#333',
    marginTop: 5
  },
});
