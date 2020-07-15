export function fmtDate(time) {
  let a = new Date(time * 1000);
  let year = a.getFullYear();
  let month = a.getMonth() + 1;
  let date = a.getDate();
  return {
    year,
    month,
    date
  };
}

export function fmtDuration(duration) {
  let days = Math.floor(duration / 1000 / 60 / 60 / 24);
  let hours = Math.floor(duration / 1000 / 60 / 60 - 24 * days);
  let minutes = Math.floor(duration / 1000 / 60 - 24 * 60 * days - 60 * hours);
  let seconds = (duration / 1000 - 24 * 60 * 60 * days - 60 * 60 * hours - 60 * minutes).toFixed(0);
  if (hours) {
    minutes += hours * 60;
  }
  return {
    minutes: minutes < 10 ? '0' + minutes : minutes,
    seconds: seconds < 10 ? '0' + seconds : seconds
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

export function isEmail(val) {
  const pattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
  const neteaseDomain = '163.com';
  if (pattern.test(val)) {
    let domain = val.substring(val.indexOf('@') + 1);
    if (neteaseDomain === domain) return true;
  }
  return false;
}
