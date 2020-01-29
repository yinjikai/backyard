import Taro, { useEffect, useState, useRouter } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import { ICard } from '../../interface/card'
const DetailPage: React.FunctionComponent<ICard> = (props) => {
  const { name, desc, date, } = props;
  const router = useRouter()
  useEffect(() => {
    const id = router.params.id;
    console.log(id)
  }, []);
  return <View>详情页
    <View>{name}</View>
    <View>{desc}</View>
    <View>{date}</View>
  </View>
}
export default DetailPage