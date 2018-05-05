uname=null;
imageAddress=null;

$(document).on('vclick', '#submit', function () {
  //  document.getElementById("submit").disabled=true;

  pageIsLoading();
  if($("#uname").val()=="" )
  {
    hideLoading();
    setTimeout(function(){  swal("Please fill in the user-name field"); },50);

  }
  else {
    if($("#pass").val()=="")
    {
      hideLoading();
        setTimeout(function(){    swal("Please fill in the password field"); },50);

    }
    else {


      uname=checkingLogin($("#uname").val(),$("#pass").val());
      if(uname!=null){

        setTimeout(goToMenu, 700);
        //document.getElementById("submit").disabled=false;
      }
      else {
        hideLoading();
        //  document.getElementById("submit").disabled=false;
      }
    }
  }

});

$( document ).ready(function() {
  if (typeof (Storage) !== "undefined") {
    // Store
    if  (localStorage.getItem("userId")!=null)
    {
      loginLocalStorage();
    }
  }
});

//remove storage
function logoutLocalStorage(){
  localStorage.removeItem('userId');
  localStorage.removeItem('userFirstName');
  localStorage.removeItem('userlastName');
  localStorage.removeItem('userImage');
}

function loginLocalStorage(){

  uname=localStorage.getItem("userId");
  var first=localStorage.getItem("userFirstName");
  var last=localStorage.getItem("userlastName");
  var user_image=localStorage.getItem("userImage");

  //for welcoming him
  $('#welcomUser').html(first);
  //for accesories list
  document.getElementById("ball-game-creat").innerHTML+='<option value='+uname+'>'+first+" "+last+'</option>'
  document.getElementById("pump-game-creat").innerHTML+='<option value='+uname+'>'+first+" "+last+'</option>'
  document.getElementById("water-game-creat").innerHTML+='<option value='+uname+'>'+first+" "+last+'</option>'
  document.getElementById("net-game-creat").innerHTML+='<option value='+uname+'>'+first+" "+last+'</option>'

  //change picture//
  var x = document.getElementById("my-image");
  var y = document.getElementById("user-image-pro");


  //only if the user has a picture//
  if(user_image!="null"  && user_image!="")
  {
    //picture in menu
    x.setAttribute("src", "http://35.233.83.193/gameonphp/upload/"+user_image);

    //picture in profile page
    y.setAttribute("src", "http://35.233.83.193/gameonphp/upload/"+user_image);

  }
  else {

    //picture in menu
    x.setAttribute("src", "http://35.233.83.193/gameonphp/upload/user.png");

    //picture in profile page
    y.setAttribute("src", "http://35.233.83.193/gameonphp/upload/user.png");
  }
  //go to main menu
goToMenu();
}

//show-panel//
$(function () {
  $("[data-role=panel]").enhanceWithin().panel();
});



//hide animation of loading page
function goToMenu() {
  //go to main menu
  $.mobile.changePage("#main-page", {
    transition: "slide", changeHase: false
  });

  setTimeout(sendingMes, 700);
}

//hide animation of loading page
function hideLoading() {
  $.mobile.loading( "hide" );

}
//showing animation of loading page
function pageIsLoading()
{
  //loading animation

  $.mobile.loading( "show", {
    text: "Loading...",
    textVisible: true,
    theme: "b",
    html: ""
  });
}

//user ranked a player's category//
function changeToRankedBall(myImage) {

  var str=  document.getElementById("rank-"+myImage).src;
  var pos = str.search("ball-icon3");
  var val=   $('#rank-user-'+myImage).text();

  var newVal;
  if(  pos==-1)
  {
    newVal=parseInt(val)+1;
    document.getElementById("rank-"+myImage).src="img/ball-icon3.png";
    document.getElementById('rank-user-'+myImage).innerHTML=newVal;

    swal(myImage+" Ranked!");
  }
  else {
    newVal=parseInt(val)-1;
    document.getElementById("rank-"+myImage).src="img/ball-icon2.png";
    document.getElementById('rank-user-'+myImage).innerHTML=newVal;
    swal(myImage+" Re-Ranked!");
  }

}

// Sign in-checking the values
$(document).on('vclick', '#sign-in-btn', function () {
  flag=true;
  str="";
  $('#sign-in-btn').addClass('ui-disabled');

  if($("#txt-user-sign-in").val()=="" )
  {
    setTimeout(function(){  swal("Please fill in the user-name field"); },50);

    flag=false;
  }
  var user=$("#txt-user-sign-in").val()
  if(flag && user.length<3)
  {
    setTimeout(function(){  swal("User name must contain at least 3 characters"); },50);
    flag=false;
  }

  if(flag && $("#txt-first-sign-in").val()=="" )
  {
    setTimeout(function(){  swal("Please fill in the first-name field"); },50);
    flag=false;
  }
  var first=$("#txt-first-sign-in").val()
  if(flag && first.length<2)
  {
    setTimeout(function(){  swal("First name must contain at least 2 characters"); },50);
    flag=false;
  }

  if(flag && !/^[a-zA-Z]+$/.test($("#txt-first-sign-in").val()))
  {
    setTimeout(function(){  swal("First name should contains only letters"); },50);
    flag=false;
  }

  if(flag && $("#txt-last-sign-in").val()=="" )
  {
    setTimeout(function(){  swal("Please fill in the last-name field"); },50);
    flag=false;
  }
  if(flag && !/^[a-zA-Z]+$/.test($("#txt-last-sign-in").val()))
  {
    setTimeout(function(){  swal("Last name should contains only letters"); },50);
    flag=false;
  }
  if(flag && $("#txt-password-sign-in").val()=="" )
  {
    setTimeout(function(){  swal("Please fill in the password field"); },50);
    flag=false;
  }
  var pass=$("#txt-password-sign-in").val()
  if(flag && pass.length<6)
  {
    setTimeout(function(){  swal("Password must contain at least 6 characters"); },50);
    flag=false;
  }
  if(flag && $("#txt-email-sign-in").val()=="" )
  {
    setTimeout(function(){  swal("Please fill in the email field"); },50);
    flag=false;
  }
  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  if(flag && !validateEmail($("#txt-email-sign-in").val()) )
  {
    setTimeout(function(){  swal("Email is illegal"); },50);
    flag=false;
  }
  if(flag && $("#date-sign-in").val()=="" )
  {
    setTimeout(function(){  swal("Please fill in the date of birth field"); },50);
    flag=false;
  }

  var now= new Date();
  var cgame=new Date($("#date-sign-in").val());
  if(flag && now<cgame)
  {
    setTimeout(function(){  swal("Please select a relevant date"); },50);
    flag=false;
  }


  if(flag && !functionCheckUserName($("#txt-user-sign-in").val())){
    setTimeout(function(){  swal("User name Exists, please choose another user name"); },50);
    flag=false;
  }
  //in case the date was choosen-we will convert it to this date format: yyyy/m/dd
  else {
    str=$("#date-sign-in").val();
    str2 = str.replace('-','/');
    str2 = str2.replace('-','/');
  }


  if(flag)
  {
    pageIsLoading();
    //document.getElementById("sign-in-btn").disabled=true;
    addUser($("#txt-user-sign-in").val(),$("#txt-first-sign-in").val(),$("#txt-last-sign-in").val(),
    $("#txt-password-sign-in").val(),$("#txt-email-sign-in").val(),str2
    ,$( "#city-sign-in option:selected" ).text(),$( "#foot-sign-in option:selected" ).text(),imageAddress);

  }
  else{
    $('#sign-in-btn').removeClass('ui-disabled');
  }

});


//picture//
$(document).ready(function(){

  // take picture from camera
  $('#but_take').click(function(){
    navigator.camera.getPicture(onSuccess, onFail, { quality: 20,
      destinationType: Camera.DestinationType.FILE_URL
    });
  });

  // upload select
  $("#but_select").click(function(){
    navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      destinationType: Camera.DestinationType.FILE_URI
    });
  });

  // Change image source and upload photo to server
  function onSuccess(imageURI) {
    //loading
    pageIsLoading();
    // Set image source
    var image = document.getElementById('img');
    image.src = imageURI  + '?' + Math.random();

    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";

    var params = {};
    params.value1 = "test";
    params.value2 = "param";

    options.params = params;
    options.chunkedMode = false;

    var ft = new FileTransfer();
    ft = new FileTransfer();

    ft.upload(imageURI, "http://23.251.139.146/gameonphp/upload.php", function(result){
      // swal('successfully uploaded ' + result.response);
      imageAddress=result.response;

      hideLoading();
    }, function(error){
      swal('error : ' + JSON.stringify(error));
      hideLoading();
    }, options);

  }
  function onFail(message) {
    swal('Failed because: ' + message);
    hideLoading();
  }

});

/* for rotate profile pic */
function Rotate() {
  var element = document.getElementById('img');

  if (element.className === "normal") {
    element.className = "rotate";
  }
  else   if ( element.className === "rotate") {
    element.className = 'rotate2';
  }
  else if ( element.className === "rotate2") {
    element.className = 'rotate3';
  }
  else   if ( element.className === "rotate3") {
    element.className = 'normal';
  }
}

/* to delete profile pic */
function deletePhoto() {
  var y = document.getElementById("img");
  y.setAttribute("src", "img/user.png");
}


//function for checking time of end-games
function sendingMes(){

  var  d=new Date();

  if(d.getHours()>=7 )
  {
    checkPassedGames(uname);
  }
}



//un select the balls on back
$(document).on('vclick', '#back-from-rank', function () {
  //unselect the selected balls
document.getElementById("rank-Speed").src="img/ball-icon2.png";
document.getElementById("rank-Shot").src="img/ball-icon2.png";
document.getElementById("rank-Dribble").src="img/ball-icon2.png";
document.getElementById("rank-Fairness").src="img/ball-icon2.png";
document.getElementById("rank-Header").src="img/ball-icon2.png";
});

function calculateAge(birthday) { // birthday is a date
  var bd=new Date(birthday);
    var ageDifMs = Date.now() - bd.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}
