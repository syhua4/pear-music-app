export function fmtTime(time) {
  let a = new Date(time * 1000);
  let year = a.getFullYear();
  let month = a.getMonth() + 1;
  let date = a.getDate();
  let day = Math.floor(time / (60 * 60 * 24));
  day = day >= 10 ? day : '0' + day;
  let hour = Math.floor(time / (60 * 60));
  hour = hour >= 10 ? hour : '0' + hour;
  let minute = Math.floor((time / 60) % 60);
  minute = minute >= 10 ? minute : '0' + minute;
  let second = Math.floor(time % 60);
  second = second >= 10 ? second : '0' + second;
  return {
    year,
    month,
    date,
    day,
    hour,
    minute,
    second
  };
}

export function shuffle(arr) {
  let temp = [...arr];
  for (let i = temp.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [temp[i], temp[j]] = [temp[j], temp[i]];
  }
  return temp;
}

export function debounce(func, delay) {
  let timer = null;

  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
