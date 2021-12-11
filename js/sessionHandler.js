let sh_userid = getCookie("user_id");
let sh_key = getCookie("session_key");

var filename = window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1);
if(filename=="index.html"||filename=="login.html"||filename=="register.html"){
  if(sh_userid!=null&&sh_key!=null){
    window.location.href = "home.html"
  }
} else {
  if(sh_userid==null||sh_key==null){
    window.location.href = "index.html"
  }
}
