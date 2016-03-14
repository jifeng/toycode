var i = 0;

function timedCount(){
  i = i + 1;
  postMessage({ a: i, b: 2 });
  setTimeout(timedCount, 1000);
}

timedCount();