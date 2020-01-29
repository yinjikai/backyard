import Taro, { useEffect, useState } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'
import * as service from '../../api'
import { genToken } from '../../utils'
const Index = () => {
  const [bookingList, setBookingList] = useState(null)
  const [userInfo, setUserInfo] = useState(null)
  const [showAuthBtn, setShowAuthBtn] = useState(false);
  const [token, setToken] = useState('');
  useEffect(() => {
    getBookingList(userInfo)
  }, [userInfo, token]);

  const getBookingList = (userInfo) => {
    if (userInfo && token) {
      Taro.request({
        url: `${service.getBookingList(userInfo.nickName)}`,
        header: {
          authorization: genToken(token),
          daad: 1111
        }
      }).then(res => {
        const { code, data: result } = res.data
        if (code == 200) {
          setBookingList(result || [])
        }
      })
    }
  }
  useEffect(() => {
    login()
  }, []);
  const login = () => {
    Taro.login().then(res => {
      const { code } = res;
      if (code) {
        getUserInfoFromServer(code)
      }
    })
  }
  const getUserInfoFromServer = (code) => {
    Taro.request({
      url: service.getUserInfo(code)
    }).then(res => {
      const { token } = res.data;
      Taro.setStorageSync('token', token)
      setToken(token)
    })
  }
  useEffect(() => {
    Taro.getSetting()
      .then(res => {
        if (res.authSetting["scope.userInfo"]) {
          getUserInfo()
        } else {
          //手动授权
          setShowAuthBtn(true)
        }
      }).catch(err => {
        console.log(err)
      })
  }, [])

  const getUserInfo = () => {
    Taro.getUserInfo().then(res => {
      setUserInfo(res.userInfo)
      Taro.setStorageSync('userInfo', res.userInfo)
    })
  }

  const handleBookingBtnClick = () => {
    if (Taro.getStorageSync('userInfo')) {
      Taro.navigateTo(
        { url: '/pages/booking/index' }
      )
    }
  }
  const getUserInfoManual = (e) => {
    const { detail: { userInfo, errMsg } } = e;
    if (errMsg == 'getUserInfo:ok') {
      setUserInfo(userInfo)
      Taro.setStorageSync('userInfo', userInfo)
    }
  }
  const cancelBooking = (id) => () => {
    Taro.request({
      url: service.cancelBooking(id),
      method: 'POST',
      data: { id: id },
      header: {
        'content-type': 'application/json',
        authorization: genToken(token)
      }
    }).then(res => {
      const { code } = res.data
      if (code == 200) {
        Taro.showToast({
          title: '已取消',
          icon: 'success',
          duration: 2000
        }).then(res => {
          getBookingList(userInfo)

        })
      } else {
        Taro.showToast({
          title: '请求出错',
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
  return (
    <View className='index-wrap'>

      <Button className='booking-btn' onClick={handleBookingBtnClick}>预 约</Button>
      {!userInfo && showAuthBtn && <Button openType='getUserInfo' onGetUserInfo={getUserInfoManual} className='auth_btn'>授权</Button>}
      {(Taro.getStorageSync('userInfo') && bookingList && bookingList.length > 0) ? <View>
        <View className='title'>我的预约</View>
        <View className='booking-list'>
          {
            bookingList.map(item => {
              const { project, timeRange, _id } = item;
              return <View className='booking-item'>
                <Text>{project}</Text>  <Text>{timeRange}</Text> <Text onClick={cancelBooking(_id)} className='cancel-btn'>取消</Text>
              </View>
            })
          }
        </View>
      </View> : <View className='empty-wrap'>暂无预约记录~</View>}

    </View>)
}

export default Index