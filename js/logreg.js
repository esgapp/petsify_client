let latInput = document.getElementById('latitude');
let longInput = document.getElementById('longitude');

if(latInput!=null&&longInput!=null&&latInput!=undefined&&longInput!=undefined){
navigator.geolocation.getCurrentPosition(function(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;

  latInput.value = lat;
  longInput.value = long;
});
}

if (location.protocol === 'https:') {
  location.replace(`http:${location.href.substring(location.protocol.length)}`);
}

async function login() {
  let username = document.getElementById('username').value;
  let pass = document.getElementById('pass').value;
  const rawResponse = await fetch('http://80.112.170.71:82/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: pass
    })
  });
  if (rawResponse["status"] != 200 || rawResponse == null) {
    alert("Can't establish the connection.");
    console.log("Can't establish the connection.");
  }
  const content = await rawResponse.json();

  console.log(content);
  if(content["status"]=="ok"){
    setCookie("session_key",content["session_key"],7);
    setCookie("user_id",content["user_id"],7);
    setCookie("username",content["username"],7);
    setCookie("mail",content["mail"],7);
    setCookie("phone",content["phone"],7);
    window.location.href="home.html";
  }
}

async function register() {
  let username = document.getElementById('username').value;
  let email = document.getElementById('email').value;
  let number = document.getElementById('number').value;
  let latitude = document.getElementById('latitude').value;
  let longitude = document.getElementById('longitude').value;
  let pass = document.getElementById('pass').value;
  const rawResponse = await fetch('http://80.112.170.71:82/register', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: pass,
      mail: email,
      phone: number,
      longitude: longitude,
      latitude: latitude

    })
  });
  if (rawResponse["status"] != 200 || rawResponse == null) {
    alert("Can't establish the connection.");
    console.log("Can't establish the connection.");
  }
  const content = await rawResponse.json();

  console.log(content);
    if(content["status"]=="ok"){
      window.location.href = "login.html";
    }
}
