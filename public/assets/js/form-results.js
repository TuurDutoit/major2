var nameElem = document.querySelector(".page-results .name");
var messageElem = document.querySelector(".page-results .message");
var emailElem = document.querySelector(".page-results .email");
var params = {};
document.location.search
  .replace(/(^\?)/,"")
  .replace(/\+/g, "%20")
  .split("&")
  .forEach(function(p) {
    var s = p.split("=");
    params[s[0]] = decodeURIComponent(s[1]);
  });

nameElem.textContent = params.name;
messageElem.textContent = params.message;
emailElem.textContent = params.email;