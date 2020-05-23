//Setup to check every minute
const tickRate = 60000;
//Your client id
const Client_id = "";
//Your Auth key
const Auth_key = "";
//The user login of the twitch channel
const User_login = "rebeudeter";

chrome.browserAction.onClicked.addListener(function () {
  chrome.tabs.create({ url: `https://twitch.com/${User_login}` });
});

function checkStream() {
  let XML = new XMLHttpRequest();
  let response = null;

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
      // console.log("pas en ligne");
      chrome.browserAction.setIcon({
        path: {
          "64": "src/images/icon-off-64.png",
        },
      });
    } else {
      // console.log("en ligne");
      chrome.browserAction.setIcon({
        path: {
          "64": "src/images/icon-64.png",
        },
      });
    }
  };
}
checkStream();
setInterval(() => {
  checkStream();
}, tickRate);
