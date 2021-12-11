function logout(){
  eraseCookie("session_key");
  eraseCookie("user_id");
  eraseCookie("username");
  eraseCookie("mail");
  eraseCookie("phone");
  window.location.href = "index.html";
}

document.getElementById('account_name').textContent = getCookie("username");
document.getElementById('account_mail').textContent = getCookie("mail");
document.getElementById('account_number').textContent = getCookie("phone");
