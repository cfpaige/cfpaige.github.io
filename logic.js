// ============== DATABASE ================
var firebaseConfig = {
    apiKey: "AIzaSyDzzJldNrwHP74q04wM9xrXQvD2-yq8MWs",
    authDomain: "buddyapp-7d790.firebaseapp.com",
    databaseURL: "https://buddyapp-7d790.firebaseio.com",
    projectId: "buddyapp-7d790",
    storageBucket: "buddyapp-7d790.appspot.com",
    messagingSenderId: "828020228335",
    appId: "1:828020228335:web:e7744d3bd6cd0bc4"
  };

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// ============== FB LOGIN SETUP ================

var provider = new firebase.auth.FacebookAuthProvider();

provider.addScope('id,first_name,last_name,email,picture');

firebase.auth().signInWithPopup(provider).then(function(result) {

  var provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope('id,first_name,last_name,email,picture');
  var token = result.credential.accessToken;
  var user = result.user;
}).catch(function(error) {
  var errorCode = error.code;
  var errorMessage = error.message;
  var email = error.email;
  var credential = error.credential;
});


// window.fbAsyncInit = function () {
//   FB.init({
//     appId: '314010786217012',
//     cookie: true,
//     xfbml: true,
//     version: 'v3.3'
//   });

  // FB.AppEvents.logPageView();

//   FB.getLoginStatus(function(response) {
//     if (response.status === 'connected') {
//          getFbUserData();
//     }
// });
// };

// (function (d, s, id) {
//   var js, fjs = d.getElementsByTagName(s)[0];
//   if (d.getElementById(id)) { return; }
//   js = d.createElement(s); js.id = id;
//   js.src = "https://connect.facebook.net/en_US/sdk.js";
//   fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'facebook-jssdk'));

// function fbLogin() {
//   FB.login(function (response) {
//       if (response.authResponse) {
//           getFbUserData();
//       } else {
//           document.getElementById('status').innerHTML = 'User cancelled login or did not fully authorize.';
//       }
//   }, {scope: 'email'});
// };

function getFbUserData(){
  FB.api('/me', {locale: 'en_US', fields: 'id,first_name,last_name,email,picture'},
  function (response) {
      document.getElementById('fbLink').setAttribute("onclick","fbLogout()");
      document.getElementById('fbLink').innerHTML = 'Logout from Facebook';
      document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.first_name + '!';
      document.getElementById('userData').innerHTML = '<p><b>FB ID:</b> '+response.id+'</p><p><b>Name:</b> '+response.first_name+' '+response.last_name+'</p><p><b>Email:</b> '+response.email+'</p><p><b>Picture:</b> <img src="'+response.picture.data.url+'"/></p>';
      saveUserData(response);
  });
};

$("#event-button").on("click", function (event) {
  event.preventDefault();

  var user_id = '+response.id+';
  var user_name = '+response.first_name+ ' + '+response.last_name+'
  var user_email = '+response.email+'
  var user_pic = '+response.picture.data.url+'

  var newUser = {
    id: user_id,
    name: user_name,
    email: user_email,
    picture: user_pic
  };

  database.ref().push(newUser);

  // clear input?

});

function fbLogout() {
  FB.logout(function() {
      document.getElementById('fbLink').setAttribute("onclick","fbLogin()");
      document.getElementById('fbLink').innerHTML = '<img src="fblogin.png"/>';
      document.getElementById('userData').innerHTML = '';
      document.getElementById('status').innerHTML = 'You have successfully logout from Facebook.';
  });
};

