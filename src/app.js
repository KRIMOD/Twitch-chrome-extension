const tickRate = 60000;
const Client_id = "";
const Auth_key = "";
const User_login = "";
let elm = document.getElementById("root");

function checkStream() {
  let XML = new XMLHttpRequest();
  let response = null;
  let elm = document.getElementById("root");

  XML.open(
    "GET",
    "https://api.twitch.tv/helix/streams/?user_login=" + User_login
  );
  XML.setRequestHeader("Client-ID", Client_id);
  XML.setRequestHeader("Authorization", "Bearer " + Auth_key);
  XML.send();
  XML.onload = function () {
    response = JSON.parse(XML.response);
    if (response.data[0] === undefined) {
      console.log("pas en ligne");
      elm.innerHTML = "pas en ligne";
    } else {
      console.log("en ligne");
      elm.innerHTML = "en ligne";
    }
  };
}
checkStream();
setInterval(() => {
  checkStream();
}, tickRate);
