//uname=null;
last_game=null;
lat_map=33.026289;
long_map=35.095381;
field_name_map=null;
field_address_map=null;
waiting_bool="waiting";

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

// Create Game-checking the values
$(document).on('vclick', '#next-game-creat', function () {
flag=true;
str="";

if(flag && $("#date-game-creat").val()=="" )
  {
    setTimeout(function(){   swal("Please fill in the date field");},50);

          flag=false;
  }
  var now= new Date();
  var cgame=new Date($("#date-game-creat").val()+" 23:59");
  if(flag && now>cgame)
  {
    setTimeout(function(){  swal("please, select a relevant date");},50);

    flag=false;
  }
  //in case the date was choosen-we will convert it to this date format: yyyy/m/dd
  else {
    str=$("#date-game-creat").val();
    str2 = str.replace('-','/');
    str2 = str2.replace('-','/');
  }

if(flag && $("#start-time-game-creat").val()=="" )
  {
      setTimeout(function(){   swal("Please fill in the start time field");},50);

          flag=false;
  }
  var now= new Date();
  var cgame=new Date($("#date-game-creat").val()+" "+$("#start-time-game-creat").val());
  if(flag && now>cgame)
  {
      setTimeout(function(){  swal("please, select a relevant time"); },50);

      flag=false;
  }

  if(flag && $("#min-players-game-creat").val()=="" )
    {
        setTimeout(function(){      swal("Please fill in the minimum players field"); },50);

            flag=false;
    }
    else {
      if (flag && !/^[0-9]*$/.test($("#min-players-game-creat").val()))
      {
        flag=false;
          setTimeout(function(){      swal("min-players should contains only numbers"); },50);

      }
    }
    if(flag && $("#maximum-players-game-creat").val()=="" )
      {
              setTimeout(function(){     swal("Please fill in the maximum players field"); },50);

              flag=false;
      }
      else {
        if (!/^[0-9]*$/.test($("#maximum-players-game-creat").val()))
        {
          flag=false;
              setTimeout(function(){   swal("maximum-players should contains only numbers"); },50);

        }
        else {
          var min=document.getElementById("min-players-game-creat").value;
          var max=document.getElementById("maximum-players-game-creat").value;

          if (parseInt(min)>parseInt(max))
          {
            flag=false;
              setTimeout(function(){ swal("maximum-players can't be lower than min-players"); },50);

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
  //show loading
pageIsLoading();



var startTime=document.getElementById("start-time-game-creat").value;
var startdatetemp=new Date($("#date-game-creat").val());


var year=startdatetemp.getFullYear();
var month=startdatetemp.getMonth();
var day=startdatetemp.getDate();
var duration=parseFloat($("#duration").val());
var fullEndDate = new Date(year, month, day);

var hours = parseFloat(startTime.split(":")[0]);
  var minutes = parseFloat(startTime.split(":")[1]);

fullEndDate.setHours(hours+duration);
if(duration%1==0.5){
fullEndDate.setMinutes(minutes+30);
}
else {
  fullEndDate.setMinutes(minutes);
}

var endTime=fullEndDate.getHours()+":"+fullEndDate.getMinutes();
var endDate=fullEndDate.getFullYear()+"-"+(fullEndDate.getMonth()+1)+"-"+fullEndDate.getDate();


// calling to php code and insert game to DB
addGame($("#date-game-creat").val(),$("#city-game-creat").val(),document.getElementById("start-time-game-creat").value,endTime,$("#min-players-game-creat").val(),
$("#maximum-players-game-creat").val(),$("#flip-select-game-creat option:selected").text(),$("#ball-game-creat" ).val(),$("#pump-game-creat" ).val()
,$("#water-game-creat" ).val(),$( "#net-game-creat" ).val(),$("#public-game-creat option:selected").text(),uname,endDate,'No');

});

//selecting all games
$(document).on('vclick', '#gamebutton-join-game', function () {
  $.mobile.changePage("#join-game-page", {
      transition: "slide", changeHase: false
  });

  //empty the list
 $("#join-game-deatils").find('li').remove();

 //get the games from DB
  selectAllGame();
  //animation
  pageIsLoading();
});

//selecting all players from game to rank them
function showPlayersToRank(game_id) {

  $.mobile.changePage("#playersFromGame", {

    transition: "slide", changeHase: false
  });

  //empty the list
 $("#ulRanking-Players").find('li').remove();

 //get the games from DB
  selectAllPlayersToRank(game_id);
  //animation

}

//selecting all games
 function clearGame() {
  //today's date
  var now = new Date();

var day = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);

var today = now.getFullYear()+"-"+(month)+"-"+(day) ;

$('#date-game-creat').val(today);

  //empty the list
 $("#ball-game-creat").find('option').remove();
  $("#water-game-creat").find('option').remove();
   $("#pump-game-creat").find('option').remove();
    $("#net-game-creat").find('option').remove();
    $('#ball-game-creat').val('').change();
    $('#water-game-creat').val('').change();
    $('#pump-game-creat').val('').change();
    $('#net-game-creat').val('').change();
//ball
 document.getElementById("ball-game-creat").innerHTML+='<option value='+""+'></option>'
  document.getElementById("ball-game-creat").innerHTML+='<option value='+localStorage.getItem("userId")+'>'+localStorage.getItem("userFirstName")+' '+localStorage.getItem("userlastName")+'</option>'
//water
  document.getElementById("water-game-creat").innerHTML+='<option value='+""+'></option>'
   document.getElementById("water-game-creat").innerHTML+='<option value='+localStorage.getItem("userId")+'>'+localStorage.getItem("userFirstName")+' '+localStorage.getItem("userlastName")+'</option>'
//net
   document.getElementById("net-game-creat").innerHTML+='<option value='+""+'></option>'
    document.getElementById("net-game-creat").innerHTML+='<option value='+localStorage.getItem("userId")+'>'+localStorage.getItem("userFirstName")+' '+localStorage.getItem("userlastName")+'</option>'
//pump//
    document.getElementById("pump-game-creat").innerHTML+='<option value='+""+'></option>'
     document.getElementById("pump-game-creat").innerHTML+='<option value='+localStorage.getItem("userId")+'>'+localStorage.getItem("userFirstName")+' '+localStorage.getItem("userlastName")+'</option>'
}

//selecting all games-for user approve
$(document).on('vclick', '#gamebutton-my-games', function () {
  $.mobile.changePage("#my-games-page", {
      transition: "slide", changeHase: false
  });

  //empty the lists
 $("#waiting-ul").find('li').remove();
  $("#joined-ul").find('li').remove();
   $("#canceled-ul").find('li').remove();


 //get the games from DB
  selectAllGameForUserApprove();

  //animation
  pageIsLoading();
});


//user clicked the 'profile' category
$(document).on('vclick', '#profile-Button', function () {
pageIsLoading();
 //get the user deatils from DB
  profileDeatils(uname);
});



//update accesories- go to ajax
$(document).on('vclick', '#update-acc', function () {
pageIsLoading();
 //send game id and accesories
updateGameAccess($("#edit-game-id-info").val(), $("#edit-ball-game" ).val(), $("#edit-pump-game" ).val()
,$("#edit-water-game" ).val(), $( "#edit-net-game" ).val());
});
/*
//user clicked the 'rank' category
function changeToRankPage() {
pageIsLoading();
 //get the user deatils from DB
  profileDeatilsForRanking(uname);
}*/

//call ajax to rank player
function rankPlayer() {
pageIsLoading();
 //updates the user deatils in DB
  updateRanking($('#myId').attr('name')); 

}



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

    swal("Invitations were sent");
                  //back to game's page
    $.mobile.changePage("#game-page", {

        transition: "slide", changeHase: false
    });
    emptyList();
}

//updating the user invitation to-"joined"- sending the varibels to ajax
function joinInvitation()
{
  if(document.getElementById("num-players-game-info").value==0)
{swal("The game is full");}

else{
  // If the flag is true, the invitation has been successful, if the flag is false, the invitation was exist (need updating)
var flag= checkIfInvitationExsist(uname,  document.getElementById("game-id-info").value,"joined");

if(!flag)
joinInvitationToAjax(uname,  document.getElementById("game-id-info").value,"joined");
}
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
  hideLoading();
  swal("There are no players");
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

//user clicked on 'waiting'' in 'My Games'
$(document).on('vclick', '#waiting-my', function () {

waiting_bool="waiting";
});

//user clicked on 'joined' in 'My Games'
$(document).on('vclick', '#joined-my', function () {

waiting_bool="joined";
});

//user clicked on 'canceled' in 'My Games'
$(document).on('vclick', '#canceled-my', function () {

waiting_bool="canceled";
});

//class="ui-btn-active ui-state-persist"
//user clicked on 'back' in 'My Games'
$(document).on('vclick', '#gamebutton-my-games', function () {
  changeActive();
  });

  //user clicked on 'back' in ' Game info'
  $(document).on('vclick', '#back-game-info', function () {
    changeActive();
    });

  function changeActive(){

  if (waiting_bool=="waiting") {
              //  $("#waiting-my").removeClass( $.mobile.activeBtnClass );
              $("#waiting-my").addClass( $.mobile.activeBtnClass );
            }
  if (waiting_bool=="canceled") {
                        //  $("#waiting-my").removeClass( $.mobile.activeBtnClass );
              $("#canceled-my").addClass( $.mobile.activeBtnClass );
                      }
  if (waiting_bool=="joined") {
                  //  $("#waiting-my").removeClass( $.mobile.activeBtnClass );
                $("#joined-my").addClass( $.mobile.activeBtnClass );
                                }
}

//call to load function
$(document).on('vclick', '.loadinfo', function () {
  pageIsLoading();
});

//user chose edit games-selecting all games that the user created
$(document).on('vclick', '#gamebutton-edit-games', function () {
  $.mobile.changePage("#edit-game-info", {
      transition: "slide", changeHase: false
  });

 //get the games from DB
  selectAllGameUserCreated();
  //animation
  pageIsLoading();
});

//user chose delete games
$(document).on('vclick', '#edit-delete-game', function () {
deleteGame(document.getElementById("edit-game-id-info").value);
pageIsLoading();
  });

  //user chose update games
  $(document).on('vclick', '#edit-update-game', function () {
flag=true;
    if(flag && $("#edit-date-game-info").val()=="" )
      {
        setTimeout(function(){   swal("Please fill in the date field");},50);

              flag=false;
      }
      var now= new Date();
      var cgame=new Date($("#edit-date-game-info").val()+" 23:59");
      if(flag && now>cgame)
      {
        setTimeout(function(){  swal("please, select a relevant date");},50);

        flag=false;
      }
      //in case the date was choosen-we will convert it to this date format: yyyy/m/dd
      else {
        str=$("#edit-date-game-info").val();
        str2 = str.replace('-','/');
        str2 = str2.replace('-','/');
      }

    if(flag && $("#edit-start-time-game-info").val()=="" )
      {
          setTimeout(function(){   swal("Please fill in the start time field");},50);

              flag=false;
      }
      if(flag && $("#edit-duration-info").val()=="" )
        {
            setTimeout(function(){   swal("Please fill in the end time field");},50);

                flag=false;
        }
      var now= new Date();
      var cgame=new Date($("#edit-date-game-info").val()+" "+$("#edit-start-time-game-info").val());
      if(flag && now>cgame)
      {
          setTimeout(function(){  swal("please, select a relevant time"); },50);

          flag=false;
      }

        if(flag && $("#edit-max-players-game-info").val()=="" )
          {
                  setTimeout(function(){     swal("Please fill in the maximum players field"); },50);

                  flag=false;
          }
          else {
            if (!/^[0-9]*$/.test($("#edit-max-players-game-info").val()))
            {
              flag=false;
                  setTimeout(function(){   swal("maximum-players should contains only numbers"); },50);

            }
            else {

              if (max>$("#edit-max-players-game-info").val())
              {
                flag=false;

                  setTimeout(function(){ swal("maximum-players can't be lower than "+max.toString())},50);

              }
            }
          }

          var startTime=document.getElementById("edit-start-time-game-info").value;
          var startdatetemp=new Date($("#edit-date-game-info").val());


          var year=startdatetemp.getFullYear();
          var month=startdatetemp.getMonth();
          var day=startdatetemp.getDate();
          var duration=parseFloat($("#edit-duration-info").val());
          var fullEndDate = new Date(year, month, day);

          var hours = parseFloat(startTime.split(":")[0]);
            var minutes = parseFloat(startTime.split(":")[1]);

          fullEndDate.setHours(hours+duration);
          if(duration%1==0.5){
          fullEndDate.setMinutes(minutes+30);
          }
          else {
            fullEndDate.setMinutes(minutes);
          }

          var endTime=fullEndDate.getHours()+":"+fullEndDate.getMinutes();
          var endDate=fullEndDate.getFullYear()+"-"+(fullEndDate.getMonth()+1)+"-"+fullEndDate.getDate();


if(flag)
  updateGame($("#edit-game-id-info").val(),$("#edit-date-game-info").val(),$("#edit-locaition-info").val(),
$("#edit-start-time-game-info").val(),endTime ,$("#edit-max-players-game-info").val(),
  $("#edit-flip-select-second-game-creat option:selected").text(),$("#edit-public-game-creat option:selected").text(),endDate);

    });

    //user chose to add players
    $(document).on('vclick', '#edit-addPlayers', function () {
      $.mobile.changePage("#edit-add-playersToGame", {
          transition: "slide", changeHase: false
      });
      selectPlayersNotInvited(document.getElementById("edit-game-id-info").value);
        //  pageIsLoading();

      });

      //user chose to edit accesories
      $(document).on('vclick', '#edit-accesories-btn', function () {
      accesoriesForEditAjax(document.getElementById("edit-game-id-info").value);


        });

        //checks who was invited and send him an invitation-Edit add more players
        function CheckCheckboxesForEdit(){

            var elLength = document.MyFormEditGame.elements.length;
          var str;
          var res;
            for (i=0; i<elLength; i++)
            {
                var type = MyFormEditGame.elements[i].type;
                if (type=="checkbox" && MyFormEditGame.elements[i].checked){
                    //taking the user id
                     str = ""+MyFormEditGame.elements[i].id;
                        res = str.substring(5, str.length);
                        //send invitation
                     addInvation(document.getElementById("edit-game-id-info").value,res);
                }
                else if (type=="checkbox") {
                }
                else {
                }
            }

            swal("Invitations were sent");
                          //back to edit game's page
            $.mobile.changePage("#edit-specific-game-info", {

                transition: "slide", changeHase: false
            });


            emptyList();
        }
