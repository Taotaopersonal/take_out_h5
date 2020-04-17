import {
  Toast
} from 'vant';

export function loading() {
  Toast.loading({
    message: "加载中..."
  })
}

export function success() {
  Toast.clear()
  Toast.success({
    message: "请求成功"
  })
}

export function fail() {
  Toast.clear()
  Toast.fail({
    // message: error
    message: "请求失败！"
  })
}
