import Taro from "@tarojs/taro";
export function genToken(token) {
  return `Bearer ${token}`;
}
export function handleRequestException() {
  Taro.showToast({
    title: "啊哦出错了，请稍后再试",
    icon: none,
    duration: 2000
  }).then(() => {
    Taro.navigateTo("/pages/index/index");
  });
}
