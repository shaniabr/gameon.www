uname=null;
last_game=null;
lat_map=33.026289;
long_map=35.095381;
field_name_map=null;
field_address_map=null;
/*picked_Users=null;
counter=0;*/

$(document).on('vclick', '#submit', function () {
if($("#uname").val()=="" )
  {
          alert("Please fill in the user-name field");
  }
else {
      if($("#pass").val()=="")
      {
            alert("Please fill in the password field");
      }
      else {
        uname=checkingLogin($("#uname").val(),$("#pass").val());

      }
  }

});

$(function () {
  $("[data-role=panel]").enhanceWithin().panel();
});

    // Change the global varibels of field's deatils in map
function changeMapValues(longitude,latitude,f_name,f_address) {

  long_map=longitude;
  lat_map=latitude;
  field_name_map=f_name;
  field_address_map=f_address;
initMap();
}


// This example displays a marker at the field
    // When the user clicks the marker, an info window opens.

    function initMap() {
      var uluru = {lat:parseFloat(lat_map), lng:parseFloat(long_map)};
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: uluru
      });

      var contentString = '<div id="content">'+
          '<h1 id="firstHeading" class="firstHeading">'+field_name_map+'</h1>'+
          '<div id="bodyContent">'+
          '<p><b>'+field_name_map+'</b>, '+field_address_map+'</p>'+
          '</div>'+
          '</div>';

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      var marker = new google.maps.Marker({
        position: uluru,
        map: map,
        title: 'Uluru (Ayers Rock)'
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    }

//creat team//
    // Change the shirt of a team
function optionCusChanged() {
        if(document.getElementById('shirt-picker').value=="option2") {
         //Do something
         changeToPic2();
  }
  else {
    changeToPic1();
  }
}
  // Change the image
function changeToPic2() {
      document.getElementById("myImg").src="img/shirt2.png";
}
// Change the image
function changeToPic1() {
    document.getElementById("myImg").src="img/shirt1.png";
}


// Change the symbool of a team
function optionSymChanged() {
    if(document.getElementById('symbol-picker').value=="symbol2") {
     //Do something
     changeToSym2();
    }
   else {
        changeToSym1();
      }
}
// Change the symbool
function changeToSym2() {
  document.getElementById("myImg2").src="img/symbool2.png";
}
// Change the symbool-image
function changeToSym1() {
document.getElementById("myImg2").src="img/symbool1.png";
}



// Checking the team name is filled-create team
$(document).on('vclick', '#create-team-done', function () {
if($("#team-create-name").val()=="" )
          alert("Please fill in the team name field");
else {

  checkTeamName($("#team-create-name").val(),
  $("#shirt-picker option:selected").text(),$("#symbol-picker option:selected").text(),$("#team-create-place").val(),uname);
}

});



//manage team//
    // Change the shirt of a team
function optionCusChangedManage() {
        if(document.getElementById('shirt-picker2').value=="option2") {
         //Do something
         changeToPic2Manage();
  }
  else {
    changeToPic1Manage();
  }
}
  // Change the image
function changeToPic2Manage() {
      document.getElementById("myImg3").src="img/shirt2.png";
}
// Change the image
function changeToPic1Manage() {
    document.getElementById("myImg3").src="img/park-gil-cus.png";
}


// Change the symbool of a team
function optionSymChangedManage() {
    if(document.getElementById('symbol-picker2').value=="symbol2") {
     changeToSym2Manage();
    }
   else {
        changeToSym1Manage();
      }
}
// Change the symbool
function changeToSym2Manage() {
  document.getElementById("myImg4").src="img/symbool1.png";
}
// Change the symbool-image
function changeToSym1Manage() {
document.getElementById("myImg4").src="img/symbool2.png";
}
// Checking the team name is filled-manage team
$(document).on('vclick', '#done2', function () {
if($("#team-name2").val()=="" )
          alert("Please fill in the team name field");
else {
    alert("Information was updated!");
          $.mobile.changePage("#team-page", {
              transition: "slide", changeHase: false
          });
  }
});

//user ranked a player's category//
function changeToRankedBall(myImage) {

var str=  document.getElementById(myImage).src;
  var pos = str.search("ball-icon3");
  var val=  document.getElementById(myImage+'-td').innerHTML.substring(1);
  var newVal;

  if(  pos==-1)
  {
    newVal=parseInt(val)+1;
    document.getElementById(myImage).src="img/ball-icon3.png";
      document.getElementById(myImage+'-td').innerHTML="x"+newVal;
alert(myImage+" Ranked!");
  }
  else {
      newVal=parseInt(val)-1;
    document.getElementById(myImage).src="img/ball-icon2.png";
  document.getElementById(myImage+'-td').innerHTML="x"+newVal;
alert(myImage+" Re-Ranked!");
  }

}

// Change the cup of a tournament
function optionCupChanged() {
    if(document.getElementById('cup-picker').value=="Throphy-2") {
     changeToCup2();
    }
   else {
        changeToCup1();
      }
}
// Change to cup2
function changeToCup2() {
  document.getElementById("cupImg").src="img/cup2.png";
}
// Change to cup1
function changeToCup1() {
document.getElementById("cupImg").src="img/cup.png";
}


// Sign in-checking the values
$(document).on('vclick', '#sign-in-btn', function () {
flag=true;
str="";

if($("#txt-user-sign-in").val()=="" )
  {
          alert("Please fill in the user-name field");
          flag=false;
  }
  var user=$("#txt-user-sign-in").val()
  if(flag && user.length<3)
    {
            alert("Usre name must contain at least 3 characters");
            flag=false;
    }

  if(flag && $("#txt-first-sign-in").val()=="" )
    {
            alert("Please fill in the first-name field");
            flag=false;
    }
    var first=$("#txt-first-sign-in").val()
    if(flag && first.length<2)
      {
              alert("First name must contain at least 2 characters");
              flag=false;
      }

    if(flag && !/^[a-zA-Z]+$/.test($("#txt-first-sign-in").val()))
    {
        alert("First name should contains only letters");
            flag=false;
    }

    if(flag && $("#txt-last-sign-in").val()=="" )
      {
              alert("Please fill in the last-name field");
              flag=false;
      }
      if(flag && !/^[a-zA-Z]+$/.test($("#txt-last-sign-in").val()))
      {
          alert("Last name should contains only letters");
              flag=false;
      }
      if(flag && $("#txt-password-sign-in").val()=="" )
        {
                alert("Please fill in the password field");
                flag=false;
        }
        var pass=$("#txt-password-sign-in").val()
        if(flag && pass.length<6)
          {
                  alert("Password must contain at least 6 characters");
                  flag=false;
          }
        if(flag && $("#txt-email-sign-in").val()=="" )
          {
                  alert("Please fill in the email field");
                  flag=false;
          }
          function validateEmail(email) {
              var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              return re.test(email);
          }
          if(flag && !validateEmail($("#txt-email-sign-in").val()) )
            {
                    alert("Email is illegal");
                    flag=false;
            }
          if(flag && $("#date-sign-in").val()=="" )
            {
                    alert("Please fill in the date of birth field");
                    flag=false;
            }

            var now= new Date();
            var cgame=new Date($("#date-sign-in").val());
            if(flag && now<cgame)
            {
              alert("Please select a relevant date");
              flag=false;
            }


            if(flag && !functionCheckUserName($("#txt-user-sign-in").val())){
              alert("User name Exists, please choose another user name");
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
        addUser($("#txt-user-sign-in").val(),$("#txt-first-sign-in").val(),$("#txt-last-sign-in").val(),
      $("#txt-password-sign-in").val(),$("#txt-email-sign-in").val(),str2
      ,$( "#city-sign-in option:selected" ).text(),$( "#foot-sign-in option:selected" ).text());

      }

});


// Create Game-checking the values
$(document).on('vclick', '#next-game-creat', function () {
flag=true;
str="";


if(flag && $("#date-game-creat").val()=="" )
  {
          alert("Please fill in the date field");
          flag=false;
  }
  var now= new Date();
  var cgame=new Date($("#date-game-creat").val()+" 23:59");
  if(flag && now>cgame)
  {
    alert("please, select a relevant date");
    flag=false;
  }
  //in case the date was choosen-we will convert it to this date format: yyyy/m/dd
  else {
    str=$("#date-game-creat").val();
    str2 = str.replace('-','/');
    str2 = str2.replace('-','/');
  }
//alert( str2);

if(flag && $("#start-time-game-creat").val()=="" )
  {
          alert("Please fill in the start time field");
          flag=false;
  }
  var now= new Date();
  var cgame=new Date($("#date-game-creat").val()+" "+$("#start-time-game-creat").val());
  if(flag && now>cgame)
  {
    alert("please, select a relevant time")
      flag=false;
  }

  if(flag && $("#min-players-game-creat").val()=="" )
    {
  //    $end_time_create_game
    //alert($end_time_create_game);
            alert("Please fill in the minimum players field");
            flag=false;
    }
    else {
      if (flag && !/^[0-9]*$/.test($("#min-players-game-creat").val()))
      {
        flag=false;
        alert("min-players should contains only numbers");
      }
    }
    if(flag && $("#maximum-players-game-creat").val()=="" )
      {
              alert("Please fill in the maximum players field");
              flag=false;
      }
      else {
        if (!/^[0-9]*$/.test($("#maximum-players-game-creat").val()))
        {
          flag=false;
          alert("maximum-players should contains only numbers");
        }
        else {
          var min=document.getElementById("min-players-game-creat").value;
          var max=document.getElementById("maximum-players-game-creat").value;

          if (parseInt(min)>parseInt(max))
          {
            flag=false;
            alert("maximum-players can't be lower than min-players");
          }
        }
      }


        if(flag)
    {
      $.mobile.changePage("#create-game-part2", {
          transition: "slide", changeHase: false
      });
      }

});



// Create Game-part2
$(document).on('vclick', '#next2-game-creat', function () {

var startTime=document.getElementById("start-time-game-creat").value;
var startDate=new Date('2001-1-1 '+ startTime)
var duration=parseFloat($("#duration").val())
startDate.setHours(startDate.getHours()+duration);

if(duration%1==0.5){
startDate.setMinutes(startDate.getMinutes()+30);
}
var endTime=startDate.getHours()+":"+startDate.getMinutes();


// calling to php code and insert game to DB
addGame($("#date-game-creat").val(),$("#city-game-creat").val(),document.getElementById("start-time-game-creat").value,endTime,$("#min-players-game-creat").val(),
$("#maximum-players-game-creat").val(),$("#flip-select-game-creat option:selected").text(),$("#ball-game-creat" ).val(),$("#pump-game-creat" ).val()
,$("#water-game-creat" ).val(),$( "#net-game-creat" ).val(),$("#public-game-creat option:selected").text(),uname);

});

//selecting all games
$(document).on('vclick', '#gamebutton-join-game', function () {
  //empty the list
 $("#join-game-deatils").find('li').remove();
 //get the games from DB
  selectAllGame();
});

//selecting all games-for user approve
$(document).on('vclick', '#gamebutton-my-games', function () {
  //empty the lists
 $("#waiting-ul").find('li').remove();
  $("#joined-ul").find('li').remove();
   $("#canceled-ul").find('li').remove();
 //get the games from DB
  selectAllGameForUserApprove();
});


//user clicked the 'profile' category
$(document).on('vclick', '#profile-Button', function () {
 //get the user deatils from DB
  profileDeatils(uname);
});

//selecting all users
function selectUsers() {

  //get the users from DB
  selectAllUsers(uname);

}



//empty players list
function emptyList() {
  //empty the list
  $("#addPlayersToGame").find('li').remove();
}

//checks who was invited and send him an invitation
function CheckCheckboxes(){

    var elLength = document.MyFormGame.elements.length;
  var str;
  var res;
    for (i=0; i<elLength; i++)
    {
        var type = MyFormGame.elements[i].type;
        if (type=="checkbox" && MyFormGame.elements[i].checked){
            //taking the user id
             str = ""+MyFormGame.elements[i].id;
                res = str.substring(3, str.length);
                //send invitation
            lastGame(res);
        }
        else if (type=="checkbox") {
        }
        else {
        }
    }

    alert("Invitations were sent");
                  //back to game's page
    $.mobile.changePage("#game-page", {

        transition: "slide", changeHase: false
    });
    emptyList();
}


/*
$(document).ready(function() {

    //Default Action
    $("ul.tabs li:first").addClass("active").show(); //Activate first tab
     $(".tab_content:first").show(); //Show first tab content
  });
*/

/*picture choose*/

$(function(){
    $('#profile_image').change( function(e) {

        var img = URL.createObjectURL(e.target.files[0]);
        $('#profile_image2').attr('src', img);
    });
});
//updating the user invitation to-"joined"- sending the varibels to ajax
function joinInvitation()
{
  // If the flag is true, the invitation has been successful, if the flag is false, the invitation was exist (need updating)
var flag= checkIfInvitationExsist(uname,  document.getElementById("game-id-info").value,"joined");

if(!flag)
joinInvitationToAjax(uname,  document.getElementById("game-id-info").value,"joined");

}

//updating the user invitation to-"canceled"- sending the varibels to ajax
function cancelInvitation()
{
  // If the flag is true, the invitation has been successful, if the flag is false, the invitation was exist (need updating)
var flag= checkIfInvitationExsist(uname,  document.getElementById("game-id-info").value,"canceled");
if(!flag)
cancelInvitationToAjax(uname,  document.getElementById("game-id-info").value,"canceled");

}

//show the list of the players that are playing to the game
function showPlayersList()
{

if(document.getElementById("current-players-game-info").text==0)
{
  alert("There are no players");
}
else {
  showPlayersListToAjax(document.getElementById("game-id-info").value,"joined");
}

}


//user clicked the 'fields' category
$(document).on('vclick', '#infobutton-fields', function () {
  //go to field's page
$.mobile.changePage("#fields-page", {

transition: "slide", changeHase: false
});

 //get the fields deatils from DB
  selectAllFields();
});


//showing fields info call to ajax
function fieldsDeatilsToAjax()
{
fieldsDeatils(document.getElementById("locaition-info").value);

}


//selecting field's deatils for create game-call to ajax
$( document ).ready(function() {
 fieldsNamesToGameToAjax();
});



//user clicked the 'team' category
$(document).on('vclick', '#team-page-select', function () {
  //call the ajax function
getLastRankLeauge();
  });

  //user clicked the 'my-team' category
  $(document).on('vclick', '#teambutton-my-team', function () {
    //call the ajax function
  getUserTeam(uname);
    });



/*
// Create Game-update accesories
$(document).on('vclick', '#done-game-creat', function () {
alert("Game was successfully created!");
  //adding players to game
  $.mobile.changePage("#game-page", {
      transition: "slide", changeHase: false
  });

});
*/

/*
//adding all users
$(document).on('vclick', '#done-game-creat', function () {
  //getting the game id
 lastGame(picked_Users);

});*/
/*
//selecting a user to add
function pickingUser(user) {
  //taking the user id
  var str = ""+user.id;
     var res = str.substring(3, str.length);
   picked_Users[counter]=res;
counter++;


}*/
