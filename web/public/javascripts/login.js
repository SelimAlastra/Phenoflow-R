function ready(callback){

  if (document.readyState!='loading') callback();
  else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback)
  else document.attachEvent('onreadystatechange', function(){ if(document.readyState=='complete') callback();});

}

function setSession(authResult) {

  const expiresAt = moment().add(authResult.expiresIn,"second");
  localStorage.setItem("id_token", authResult.idToken);
  localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );

}

function logout() {

  localStorage.removeItem("user")
  localStorage.removeItem("id_token");
  localStorage.removeItem("expires_at");
  for(let authentication of document.getElementsByClassName("authentication")) authentication.style.display = "inherit";
  for(let restricted of document.getElementsByClassName("restricted")) restricted.style.display = "none";
  if (window.location.href.indexOf("define") > -1 || window.location.href.indexOf("mine") > -1) {window.location.replace('/phenoflow')}

}

function isLoggedIn() { return moment().isBefore(this.getExpiration()); }

function isLoggedOut() { return !this.isLoggedIn(); }

function getExpiration() {

  const expiration = localStorage.getItem("expires_at");
  const expiresAt = JSON.parse(expiration);
  return moment(expiresAt);

}

function login() {

  const user = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if(username && password) sendPostRequest("login", JSON.stringify({"user":user, "password":password}), function(authResult) {

    if(authResult) {
      setSession(JSON.parse(authResult));
      localStorage.setItem("user", user);
      document.getElementById("authCheck").innerHTML = ""
      document.getElementById("username").value = "";
      document.getElementById("password").value = "";
      for(let authentication of document.getElementsByClassName("authentication")) authentication.style.display = "none";
      for(let restricted of document.getElementsByClassName("restricted")) restricted.style.display = "inherit";
      if(typeof postLogin === "function") postLogin();
    }
      
    else {
      console.log(user)
      document.getElementById("authCheck").innerHTML = "Wrong username or password, try again !"
      return false;
    }

    $('#loginModal').modal('hide');
  });
}
