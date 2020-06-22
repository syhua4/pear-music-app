export function fmtTime(time) {
  let day = Math.floor(time / (60 * 60 * 24))
  day = day >= 10 ? day : '0' + day
  let hour = Math.floor(time / (60 * 60))
  hour = hour >= 10 ? hour : '0' + hour
  let minute = Math.floor((time / 60) % 60)
  minute = minute >= 10 ? minute : '0' + minute
  let second = Math.floor(time % 60)
  second = second >= 10 ? second : '0' + second
  return {
    day,
    hour,
    minute,
    second
  }
}
