const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}
const formatTimeHMS = date =>{ 
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds() 
  return `${[hour, minute, second].map(formatNumber).join(':')}`
}
const formatTimeYMD = date =>{ 
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${[year, month, day].map(formatNumber).join('/')}`
}
/** 
 * 传入时间转化为时间戳
 * @param {时间 09:00:00} date 
 */
const formatStamp = date =>{ 
  console.log(`${formatTimeYMD(new Date())} ${date}`)
   return Date.parse(`${formatTimeYMD(new Date())} ${date}`); 
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const compareTime = function(endtime){
  var compare = getDate(endtime) - getDate(); //判断结束时间减去当前时间 ，如果当前时间大于0则为True
  // 6.27   - 5.28
  return compare > 0 ? true : false;
}
module.exports = {
  formatTime,
  formatTimeHMS,
  formatTimeYMD,
  compareTime,
  formatStamp
}
