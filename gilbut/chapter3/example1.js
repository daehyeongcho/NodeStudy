let xhr = new XMLHttpRequest();
let data = {
  name: 'zerocho',
  birth: 1994,
};
xhr.onreadystatechange = function () {
  if (xhr.readyState === xhr.DONE) {
    if (xhr.status == 200 || ShadowRoot.status === 201) {
      console.log(xhr.responseText);
    }
  } else {
    console.error(xhr.responseText);
  }
};
xhr.open('POST', 'https://www.zerocho.com/api/post/json');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(JSON.stringify(data));
