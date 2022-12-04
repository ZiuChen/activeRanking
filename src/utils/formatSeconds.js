function formatSeconds(value) {
  //  秒
  let second = parseInt(value)
  //  分
  let minute = 0
  //  小时
  let hour = 0
  //  天
  //  let day = 0
  //  如果秒数大于60，将秒数转换成整数
  if (second > 60) {
    //  获取分钟，除以60取整数，得到整数分钟
    minute = parseInt(second / 60)
    //  获取秒数，秒数取佘，得到整数秒数
    second = parseInt(second % 60)
    //  如果分钟大于60，将分钟转换成小时
    if (minute > 60) {
      //  获取小时，获取分钟除以60，得到整数小时
      hour = parseInt(minute / 60)
      //  获取小时后取佘的分，获取分钟除以60取佘的分
      minute = parseInt(minute % 60)
      //  如果小时大于24，将小时转换成天
      //  if (hour > 23) {
      //    //  获取天数，获取小时除以24，得到整天数
      //    day = parseInt(hour / 24)
      //    //  获取天数后取余的小时，获取小时除以24取余的小时
      //    hour = parseInt(hour % 24)
      //  }
    }
  }

  let result = '' + parseInt(second)
  if (second < 10) {
    result = '0' + result
  }
  if (minute > 0) {
    result = '' + parseInt(minute) + ':' + result
  } else {
    result = '00:' + result
  }
  if (hour > 0) {
    result = '' + parseInt(hour) + ':' + result
  }
  return result
}

export default formatSeconds
