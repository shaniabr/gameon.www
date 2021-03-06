uname=null;
imageAddress=null;


$(document).on('vclick', '#submit', function () {

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
      }

      else {
        hideLoading();
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

    //picture in profile page-Not from facebook
if(user_image.indexOf("http")==-1)
{
    x.setAttribute("src", "http://35.241.154.54/gameonphp/upload/"+user_image);

    //picture in profile page
    y.setAttribute("src", "http://35.241.154.54/gameonphp/upload/"+user_image);
  }
  //from facebook//
  else {
    x.setAttribute("src", user_image);
    y.setAttribute("src",user_image);
  }


  }
  else {

    //picture in menu

    //picture in profile page

    x.setAttribute("src", "http://35.241.154.54/gameonphp/upload/user.png");

    //picture in profile page
    y.setAttribute("src", "http://35.241.154.54/gameonphp/upload/user.png");

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
//check user name
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

//check first name
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
  if(flag && !/^[a-zA-Z][a-zA-Z\s]*$/.test($("#txt-first-sign-in").val()))
  {
    setTimeout(function(){  swal("First name should contains only letters"); },50);
    flag=false;
  }

//check last name
  if(flag && $("#txt-last-sign-in").val()=="" )
  {
    setTimeout(function(){  swal("Please fill in the last-name field"); },50);
    flag=false;
  }
  if(flag && !/^[a-zA-Z][a-zA-Z\s]*$/.test($("#txt-last-sign-in").val()))
  {
    setTimeout(function(){  swal("Last name should contains only letters"); },50);
    flag=false;
  }

  //check password
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

  //check email
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

  //check birth of date
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
  if(flag &&  document.getElementById("checkbox-enhanced").checked==false)
  {
setTimeout(function(){  swal("You must agree to terms of use"); },50);
    flag=false;
  }
  //check if user name exists
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

// upload picture
    if(flag){
      pageIsLoading();
     uploadPicture();
    }
//Making a button available
 if(!flag){
    $('#sign-in-btn').removeClass('ui-disabled');
  }

});


//picture//
var deviceReady = false;
   /**
    * Take picture with camera
    */
   function takePicture() {
       navigator.camera.getPicture(
           function(uri) {
               var img = document.getElementById('img');
               img.style.visibility = "visible";
               img.style.display = "block";
               img.src = uri;
            //   document.getElementById('camera_status').innerHTML = "Success";
           },
           function(e) {
               console.log("Error getting picture: " + e);
               setTimeout(function(){  swal("Error getting picture"); },50);
              // document.getElementById('camera_status').innerHTML = "Error getting picture.";
           },
           { quality: 50,
             destinationType: navigator.camera.DestinationType.FILE_URI,
             allowEdit: true,
             targetWidth: 1000,
             targetHeight: 1000
           });
   };
   /**
    * Select picture from library
    */
   function selectPicture() {

       navigator.camera.getPicture(
           function(uri) {

               var img = document.getElementById('img');
               img.style.visibility = "visible";
               img.style.display = "block";
               img.src = uri;
               $('imgAddUser').append()

           },
           function(e) {

               console.log("Error getting picture: " + e);
                 setTimeout(function(){  swal("Error getting picture"); },50);

           },
           { quality: 50,
             destinationType: navigator.camera.DestinationType.FILE_URI,
             sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
             allowEdit: true,
             targetWidth: 1000,
             targetHeight: 1000
         });

   };

   /**
    * Upload current picture
    */
   function uploadPicture() {

     // Get URI of picture to upload
     var img = document.getElementById('img');
       var imageURI = img.src;

       if (!imageURI || (img.style.display == "none")) {
            setTimeout(function(){  swal("Take picture or select picture from library first"); },50);
        //   document.getElementById('camera_status').innerHTML = "Take picture or select picture from library first.";
           return;
       }
       if( $('#img').attr('src')!="img/user.png"){

       // Verify server has been entered

       server = "http://35.241.154.54/gameonphp/upload.php";

       if (server) {

           // Specify transfer options
           var options = new FileUploadOptions();
           options.fileKey="file";
           options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
           options.mimeType="image/jpeg";
           options.chunkedMode = false;
           // Transfer picture to server
           var ft = new FileTransfer();
           ft.upload(imageURI, server, function(r) {
               imageAddress=r.response;
               // If no image is selected
               if(imageAddress==''|| imageAddress==null){
                 imageAddress='user.png';
               }
               //add user
               addUser($("#txt-user-sign-in").val(),$("#txt-first-sign-in").val(),$("#txt-last-sign-in").val(),
               $("#txt-password-sign-in").val(),$("#txt-email-sign-in").val(),str2
               ,$( "#city-sign-in option:selected" ).text(),$( "#foot-sign-in option:selected" ).text(),imageAddress);

           }, function(error) {
               setTimeout(function(){  swal("Upload failed: file size is greater than 4 MB"); },50);
              // document.getElementById('camera_status').innerHTML = "Upload failed: Code = "+error.code;
           }, options);
       }
     }
     else{

       //add user
       addUser($("#txt-user-sign-in").val(),$("#txt-first-sign-in").val(),$("#txt-last-sign-in").val(),
       $("#txt-password-sign-in").val(),$("#txt-email-sign-in").val(),str2
       ,$( "#city-sign-in option:selected" ).text(),$( "#foot-sign-in option:selected" ).text(),"user.png");

     }
   }

   function init() {
       document.addEventListener("deviceready", function() {deviceReady = true;}, false);
       window.setTimeout(function() {
           if (!deviceReady) {
               alert("Error: PhoneGap did not initialize.  Demo will not run correctly.");
           }
       },2000);
   }

/* for rotate profile pic */
/*
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
*/
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

//calcultes the age of a player
function calculateAge(birthday) { // birthday is a date
  var bd=new Date(birthday);
    var ageDifMs = Date.now() - bd.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

//show notifications page//
function showNotiPage() {

  $.mobile.changePage("#noti-page", {

    transition: "slide", changeHase: false
  });

pageIsLoading();
  //empty the list
 $("#ulNoti").find('li').remove();

  selectAllNotiOfPlayer(uname);

}


//user clicked the side menu
$(document).on('vclick', '.menu', function () {
  //summon the function to calculate the number of notifications
  calculateAllNotiOfPlayer(uname);
});


//terms of use
function termsOfUse()
{
  setTimeout(function(){  swal({
//  title: 'Terms Of Use',
  text: 'Modal with a custom image.',

  imageUrl: 'img/game.png',
background: '#DCDCDC',
  imageWidth: 400,
  imageHeight: 140,
  //type: 'info',
  html:
    'The Gameon app will not be responsible '+
     'for any violent or racist action resulting from '+
      'the organization of the Games. We ask each user '+
      'to respect human rights and to respect other users. '+
        'A user who does not '+
     'comply with what is said here will be suspended from '+
      'the app and may be permanently removed from it.',
  showCloseButton: false,
  showCancelButton: false,
  focusConfirm: false,
  confirmButtonText:
    '<i class="fa fa-thumbs-up"></i> Ok',
  confirmButtonAriaLabel: 'Thumbs up, great!',
  cancelButtonText:
  '<i class="fa fa-thumbs-down"></i>',
  cancelButtonAriaLabel: 'Thumbs down',
}); },50);
}

        //-- ---------------------------------------------- FB SDK -------------------------------------------------------- --

        var fbLoginSuccess = function (data) {
          //  alert("Success! " + data.authResponse.userID);
            if (data.status == 'connected') {
                facebookConnectPlugin.api("/me?fields=email,first_name,last_name,birthday,gender,location,picture.width(360).height(360)", ["public_profile", "email"], function (profileData) {
                  //  alert('Successful login for: ' + JSON.stringify(profileData));
                    var email = profileData.email;
                    var firstname = profileData.first_name;
                    var lastname = profileData.last_name;

                    var birthday = profileData.birthday;
                    if(birthday==undefined)
                  {   var today=new Date();
                      birthday=today.getFullYear()+"/"+(parseInt(today.getMonth())+1)+"/"+today.getDate();
                //   alert("birthday: "+birthday);
}
                    var location = profileData.location;
                      if(location==undefined)
                      location="";
//alert("location: "+location);
                    var picture = profileData.picture.data.url;
                    var fbid=profileData.id;

                    if(functionCheckUserName(fbid))
        //            uploadPictureFB(fbid, email, firstname, lastname, birthday, location, picture);

addUserfromfb(fbid, email, firstname, lastname, birthday, location, picture);

                    else {
                      uname=checkingLogin(fbid,fbid);
                      if(uname!=null){
                        setTimeout(goToMenu, 700);
                      }

                      else {
                        hideLoading();
                      }

                    }
                  //    alert("ok id: "+fbid);
                });
            }
        }

        function login_fb() {
            facebookConnectPlugin.login(["public_profile", "email"],
                fbLoginSuccess,
                function (error) { alert("err in login" + JSON.stringify(error)); }
            );
        }


        /* to edit details */
        function editUserToAjax() {
          editDeatils(uname);

        }

        // edit user's details-checking the values
        $(document).on('vclick', '#sign-in-btn2', function () {

          flag=true;
          str="";
          $('#sign-in-btn2').addClass('ui-disabled');

        //check first name
          if(flag && $("#txt-first-sign-in2").val()=="" )
          {
            setTimeout(function(){  swal("Please fill in the first-name field"); },50);
            flag=false;
          }
          var first=$("#txt-first-sign-in2").val()
          if(flag && first.length<2)
          {
            setTimeout(function(){  swal("First name must contain at least 2 characters"); },50);
            flag=false;
          }
          if(flag && !/^[a-zA-Z][a-zA-Z\s]*$/.test($("#txt-first-sign-in2").val()))
          {
            setTimeout(function(){  swal("First name should contains only letters"); },50);
            flag=false;
          }

        //check last name
          if(flag && $("#txt-last-sign-in2").val()=="" )
          {
            setTimeout(function(){  swal("Please fill in the last-name field"); },50);
            flag=false;
          }
          if(flag && !/^[a-zA-Z][a-zA-Z\s]*$/.test($("#txt-last-sign-in2").val()))
          {
            setTimeout(function(){  swal("Last name should contains only letters"); },50);
            flag=false;
          }

          //check password
          if(flag && $("#txt-password-sign-in2").val()=="" )
          {
            setTimeout(function(){  swal("Please fill in the password field"); },50);
            flag=false;
          }
          var pass=$("#txt-password-sign-in2").val()
          if(flag && pass.length<6)
          {
            setTimeout(function(){  swal("Password must contain at least 6 characters"); },50);
            flag=false;
          }

          //check email
          if(flag && $("#txt-email-sign-in2").val()=="" )
          {
            setTimeout(function(){  swal("Please fill in the email field"); },50);
            flag=false;
          }
          function validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
          }
          if(flag && !validateEmail($("#txt-email-sign-in2").val()) )
          {
            setTimeout(function(){  swal("Email is illegal"); },50);
            flag=false;
          }

          //check birth of date
          if(flag && $("#date-sign-in2").val()=="" )
          {
            setTimeout(function(){  swal("Please fill in the date of birth field"); },50);
            flag=false;
          }
          var now= new Date();
          var cgame=new Date($("#date-sign-in2").val());
          if(flag && now<cgame)
          {
            setTimeout(function(){  swal("Please select a relevant date"); },50);
            flag=false;
          }


          //in case the date was choosen-we will convert it to this date format: yyyy/m/dd
          else {
            str1=$("#date-sign-in2").val();
            str3 = str1.replace('-','/');
            str3 = str3.replace('-','/');
          }

        // upload picture
            if(flag){
              pageIsLoading();
          //  alert(document.getElementById("img2").src);

//uploadPicture2();
              //update User
              updateUser(uname,$("#txt-first-sign-in2").val(),$("#txt-last-sign-in2").val(),
              $("#txt-password-sign-in2").val(),$("#txt-email-sign-in2").val(),str3
              ,$( "#city-sign-in2 option:selected" ).text(),$( "#foot-sign-in2 option:selected" ).text(),document.getElementById("img2").src);
          //   uploadPicture2();
            }
        //Making a button available
         if(!flag){
            $('#sign-in-btn2').removeClass('ui-disabled');
          }

        });

           /**
            * Take picture with camera
            */
           function takePicture2() {
               navigator.camera.getPicture(
                   function(uri) {
                       var img2 = document.getElementById('img2');
                       img2.style.visibility = "visible";
                       img2.style.display = "block";
                       img2.src = uri;
                    //   document.getElementById('camera_status').innerHTML = "Success";
                   },
                   function(e) {
                       console.log("Error getting picture: " + e);
                       setTimeout(function(){  swal("Error getting picture"); },50);
                      // document.getElementById('camera_status').innerHTML = "Error getting picture.";
                   },
                   { quality: 50,
                     destinationType: navigator.camera.DestinationType.FILE_URI,
                     allowEdit: true,
                     targetWidth: 1000,
                     targetHeight: 1000
                   });
           };
           /**
            * Select picture from library
            */
           function selectPicture2() {

               navigator.camera.getPicture(
                   function(uri) {

                       var img2 = document.getElementById('img2');
                       img2.style.visibility = "visible";
                       img2.style.display = "block";
                       img2.src = uri;
                       $('imgAddUser2').append()

                   },
                   function(e) {

                       console.log("Error getting picture: " + e);
                         setTimeout(function(){  swal("Error getting picture"); },50);

                   },
                   { quality: 50,
                     destinationType: navigator.camera.DestinationType.FILE_URI,
                     sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
                     allowEdit: true,
                     targetWidth: 1000,
                     targetHeight: 1000
                 });

           };

           /**
            * Upload current picture
            */
           function uploadPicture2() {

             // Get URI of picture to upload
             var img2 = document.getElementById('img2');
               var imageURI2 = img2.src;

               if (!imageURI2 || (img2.style.display == "none")) {
                    setTimeout(function(){  swal("Take picture or select picture from library first"); },50);
                //   document.getElementById('camera_status').innerHTML = "Take picture or select picture from library first.";
                   return;
               }
               if( $('#img2').attr('src')!="img/user.png"){

               // Verify server has been entered

               server = "http://35.241.154.54/gameonphp/upload.php";

               if (server) {

                   // Specify transfer options
                   var options = new FileUploadOptions();
                   options.fileKey="file";
                   options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
                   options.mimeType="image/jpeg";
                   options.chunkedMode = false;
                   // Transfer picture to server
                   var ft = new FileTransfer();
                   ft.upload(imageURI, server, function(r) {
                       imageAddress2=r.response;
                       // If no image is selected
                       if(imageAddress2==''|| imageAddress2==null){
                         imageAddress2='user.png';
                       }
                       //update User
                       updateUser(uname,$("#txt-first-sign-in2").val(),$("#txt-last-sign-in2").val(),
                       $("#txt-password-sign-in2").val(),$("#txt-email-sign-in2").val(),str3
                       ,$( "#city-sign-in2 option:selected" ).text(),$( "#foot-sign-in2 option:selected" ).text(),imageAddress2);

                   }, function(error) {
                       setTimeout(function(){  swal("Upload failed: file size is greater than 4 MB"); },50);
                      // document.getElementById('camera_status').innerHTML = "Upload failed: Code = "+error.code;
                   }, options);
               }
             }
             else{

               //update User
               updateUser(uname,$("#txt-first-sign-in2").val(),$("#txt-last-sign-in2").val(),
               $("#txt-password-sign-in2").val(),$("#txt-email-sign-in").val(),str3
               ,$( "#city-sign-in2 option:selected" ).text(),$( "#foot-sign-in2 option:selected" ).text(),"user.png");

             }
           }


        /* to delete profile pic */
        function deletePhoto2() {
          var y = document.getElementById("img2");
          y.setAttribute("src", "img/user.png");
        }




        //user clicked the 'table league button'
        $(document).on('vclick', '#table-leauge', function () {
            pageIsLoading();
          //summon the function in ajax
          getLeauge();
        });



//upload profile picture
    /*    function uploadPictureFB(fbid, email, firstname, lastname, birthday, location, imageURI) {
alert("fbid: "+fbid+ "imageURI: "+imageURI);
          // Get URI of picture to upload

            if (!imageURI || (img.style.display == "none")) {
                 setTimeout(function(){  swal("no picture"); },50);
             //   document.getElementById('camera_status').innerHTML = "Take picture or select picture from library first.";
                return;
            }

            // Verify server has been entered
            server = "http://35.241.154.54/gameonphp/upload.php";

            if (server) {

                // Specify transfer options
                var options = new FileUploadOptions();
                options.fileKey="file";
                options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
                options.mimeType="image/jpeg";
                options.chunkedMode = false;
                // Transfer picture to server
                var ft = new FileTransfer();
                ft.upload(imageURI, server, function(r) {
                  alert("shani");
                    imageAddress=r.response;
                    alert("imageAddress: "+ imageAddress);
                    // If no image is selected
                    if(imageAddress==''|| imageAddress==null){
                      imageAddress='user.png';
                    }
                    addUserfromfb(fbid, email, firstname, lastname, birthday, location, imageAddress);


                }, function(error) {
                    setTimeout(function(){  swal("Upload failed: file size is greater than 4 MB"); },50);
                   // document.getElementById('camera_status').innerHTML = "Upload failed: Code = "+error.code;
                }, options);
            }


        }

        function init() {
            document.addEventListener("deviceready", function() {deviceReady = true;}, false);
            window.setTimeout(function() {
                if (!deviceReady) {
                    alert("Error: PhoneGap did not initialize.  Demo will not run correctly.");
                }
            },2000);
        }*/

        // ---------------------------------------------- FB SDK ---------------------------------------------------- -
