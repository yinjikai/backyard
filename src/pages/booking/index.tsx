import Taro, { useEffect, useState } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import TimeRange from './picker'
import * as service from '../../api'
import { genToken, handleRequestException } from '../../utils'
import './index.scss'
const Activity = () => {
  const [disabledTime, setDisabledTime] = useState([]);
  useEffect(() => {
    Taro.request({
      url: `${service.getDisabledTime(Taro.getStorageSync('userInfo').nickName)}`,
      header: {
        authorization: genToken(Taro.getStorageSync('token'))
      }
    }).then(res => {
      const { code, data: result } = res.data
      if (code == 200) {
        setDisabledTime(result)
      } else {
        handleRequestException()
      }
    })
  }, [])


  const handleTimeSelect = (time) => {
    Taro.setStorageSync('time', time)
    Taro.navigateTo({
      url: '/pages/selectProject/index'
    })
  }
  const handleCancel = () => {
    Taro.navigateBack()
  }
  return (
    <View className='activity-page'>
      <TimeRange onChange={handleTimeSelect} handleCancel={handleCancel} disableTime={[`00:00~` + `${new Date().getHours()}`.padStart(2, '0') + ':' + `${new Date().getMinutes()}`.padStart(2, '0'), ...disabledTime]} />
    </View>
  );

}
export default Activity;