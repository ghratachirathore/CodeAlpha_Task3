const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
const equals = document.getElementById('equals');
const clear = document.getElementById('clear');

let exp = '';

function calc(str) {
  let n = [], o = [], temp = '';

  for (let i = 0; i < str.length; i++) {
    let ch = str[i];
    if ('0123456789.'.includes(ch)) {
      temp += ch;
    } else {
      n[n.length] = Number(temp);
      o[o.length] = ch;
      temp = '';
    }
  }
  if (temp !== '') n[n.length] = Number(temp);

  let i = 0;
  while (i < o.length) {
    if (o[i] === '*' || o[i] === '/') {
      let a = n[i];
      let b = n[i + 1];
      let result = o[i] === '*' ? a * b : a / b;
      n[i] = result;

      for (let j = i + 1; j < n.length - 1; j++) n[j] = n[j + 1];
      for (let j = i; j < o.length - 1; j++) o[j] = o[j + 1];
      n.length--;
      o.length--;
    } else {
      i++;
    }
  }

  let total = n[0];
  for (let j = 0; j < o.length; j++) {
    if (o[j] === '+') total += n[j + 1];
    if (o[j] === '-') total -= n[j + 1];
  }
  return total;
}

function updateDisplay() {
  display.value = exp;
}

buttons.forEach(btn => {
  const text = btn.innerText;

  if (text === 'C') {
    btn.onclick = () => {
      exp = '';
      display.value = '';
    };
  } else if (text === '=') {
    btn.onclick = () => {
      if (exp) {
        display.value = calc(exp);
        exp = display.value;
      }
    };
  } else {
    btn.onclick = () => {
      exp += text;
      updateDisplay();
    };
  }
});

window.onkeydown = e => {
  const k = e.key;
  if ('0123456789+-*/.'.includes(k)) {
    exp += k;
    updateDisplay();
  } else if (k === 'Enter' || k === '=') {
    if (exp) {
      display.value = calc(exp);
      exp = display.value;
    }
  } else if (k === 'Backspace') {
    exp = exp.slice(0, -1);
    updateDisplay();
  } else if (k.toLowerCase() === 'c') {
    exp = '';
    display.value = '';
  }
};
