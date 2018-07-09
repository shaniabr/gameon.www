//uname=null;

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
  setTimeout(function(){   swal("Please fill in the team name field");},50);
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
setTimeout(function(){   swal("Please fill in the team name field");},50);
else {
  setTimeout(function(){   swal("Information was updated!");},50);
          $.mobile.changePage("#team-page", {
              transition: "slide", changeHase: false
          });
  }
});


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

    //user clicked the 'create-team' category
    $(document).on('vclick', '#teambutton-create', function () {
      //call the ajax function
    getUserTeamForCreate(uname);
      });

    //clear tour deatils
     function clearTour() {
      //today's date
      var now = new Date();

    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);

    var today = now.getFullYear()+"-"+(month)+"-"+(day) ;

    $('#tour-date').val(today);
  }

  //checks who was invited and send him an invitation-team
  function CheckTeamboxes(){

      var elLength = document.MyFormTeam.elements.length;
    var str;
    var res;
      for (i=0; i<elLength; i++)
      {
          var type = MyFormTeam.elements[i].type;
          if (type=="checkbox" && MyFormTeam.elements[i].checked){
              //taking the user id
               str = ""+MyFormTeam.elements[i].id;
                  res = str.substring(3, str.length);
                  //send invitation
              addTeamNoti(document.getElementById("team-create-name").value,res);
              addTeamInvitation(document.getElementById("team-create-name").value,res);
          }
          else if (type=="checkbox") {
          }
          else {
          }
      }

      swal("Invitations were sent");
                    //back to game's page
      $.mobile.changePage("#team-page", {

          transition: "slide", changeHase: false
      });
      emptyList();
  }


  //updating the user invitation to-"joined"- sending the varibels to ajax
  function joinInvitationTeam()
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
