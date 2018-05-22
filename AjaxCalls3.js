
//selecting all players are not in the game
function selectPlayersNotInvited(gameid){

  $.ajax({
    url: "http://104.155.36.52/gameonphp/selectAllPlayersNotInvited.php",
    type: "post",
    data:{gameid:gameid},
    success: function(data){
      $("#ulEdit-addPlayersToGame").find('li').remove();
      $.each(data,function(i,item){

        $('#ulEdit-addPlayersToGame').append('<li class="list-with-checkbox ui-li-has-alt ui-first-child"><a class="ui-btn"><div class="ui-checkbox">'+
        '<label for="pinv-'+item.user_id+'" class="list-with-checkbox ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left ui-checkbox-off">'+item.first_name+' '+item.last_name+'</label>'+
        '<input data-iconpos="left" name="pinv-'+item.user_id+'" id="pinv-'+item.user_id+'" type="checkbox" data-cacheval="true" class="list-with-checkbox" value="true"/></div></a>'+
        '<a href="#" class="ui-btn ui-shadow ui-corner-all ui-btn-icon-right ui-icon-myicon2 loadinfo" onclick="profileDeatils(\'' +item.user_id+ '\');"></a></li>');
        $("[type=checkbox]").checkboxradio();
        $('#ulEdit-addPlayersToGame').listview('refresh');

      });
    },async:false
  });

  //hideLoading();
}



//selecting all players are not in the game
function checkPassedGames(uname){
  //today's date
  var now = new Date();
  var hourTime=now.getHours();
  var day = ("0" + now.getDate()).slice(-2);
  var month = ("0" + (now.getMonth() + 1)).slice(-2);

  var today = now.getFullYear()+"-"+(month)+"-"+(day) ;

  $.ajax({
    url: "http://104.155.36.52/gameonphp/selectGamesThatOver.php",
    type: "post",
    data:{uname:uname,hourTime:hourTime,now:now,today:today},

    success: function(data){

      $.each(data,function(i,item){


        setTimeout(function(){swal({
          title: "Ranking players",
          text: "Do you want to rank the players from game "+item.game_id+" ?",
          type: "info",
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'No',
          confirmButtonText: 'Yes'
        }).then((result) => {
          if (result.value) {
            //showall players from this game

            showPlayersToRank(item.game_id);
          }
        })
      }, 50);
    });
  },async:false
});

hideLoading();
}

//selecting user's deatils- for ranking
function   profileDeatilsForRanking(username){
  $.ajax({
    url: "http://104.155.36.52/gameonphp/connection.php",
    type: "post",
    data:{uname:username},
    success: function(data){
      $.each(data,function(i,item){


        document.getElementById("rank-full-name").innerHTML=item.first_name+" "+item.last_name;
        document.getElementById("rank-user-goals").innerHTML=parseInt(item.goals);
        document.getElementById("rank-user-assists").innerHTML=parseInt(item.assits);
        document.getElementById("rank-user-Speed").innerHTML=parseInt(item.speed);
        document.getElementById("rank-user-Shot").innerHTML=parseInt(item.shot);
        document.getElementById("rank-user-Dribble").innerHTML=parseInt(item.dribble);
        document.getElementById("rank-user-Fairness").innerHTML=parseInt(item.fairness);
        document.getElementById("rank-user-Header").innerHTML=parseInt(item.header);
        //   document.getElementById("myId").name=item.user_id;
        var z = document.getElementById("myId");
        z.setAttribute("name", item.user_id);
        //change picture//

        var y = document.getElementById("rank-image-pro");
        //only if the user has a picture//
        if(item.profile_picture!=null  && item.profile_picture!="")
        {
          //picture in profile page
          y.setAttribute("src", "http://104.155.36.52/gameonphp/upload/"+item.profile_picture);

        }
        else {

          //picture in menu
          y.setAttribute("src", "http://104.155.36.52/gameonphp/upload/user.png");
        }

      });
      hideLoading();
    },  error: function(data){hideLoading();},
    async:false
  });
  $.mobile.changePage("#rank-page", {

    transition: "slide", changeHase: false
  });

}

//updating user's deatils- ranking
function   updateRanking(playerId){
  //unselect the selected balls
  document.getElementById("rank-Speed").src="img/ball-icon2.png";
  document.getElementById("rank-Shot").src="img/ball-icon2.png";
  document.getElementById("rank-Dribble").src="img/ball-icon2.png";
  document.getElementById("rank-Fairness").src="img/ball-icon2.png";
  document.getElementById("rank-Header").src="img/ball-icon2.png";


  if(playerId==uname)
  setTimeout(function(){   swal("You can't rank yourself!");},50);
  else{
    var goals=  parseInt(document.getElementById("rank-user-goals").innerHTML);
    var assits= parseInt(document.getElementById("rank-user-assists").innerHTML);
    var header= (document.getElementById("rank-user-Header").innerHTML);

    var speed=  parseInt(document.getElementById("rank-user-Speed").innerHTML);
    var shot=  parseInt(document.getElementById("rank-user-Shot").innerHTML);
    var dribble= parseInt(document.getElementById("rank-user-Dribble").innerHTML);
    var fairness= parseInt(document.getElementById("rank-user-Fairness").innerHTML);

    $.ajax({
      url: "http://104.155.36.52/gameonphp/update_rank_user.php",
      type: "post",
      data:{playerId:playerId,
        goals:goals,assits:assits,
        speed:speed,header:header,
        shot:shot, dribble:dribble,
        fairness:fairness},
        success: function(data){
          setTimeout(function(){   swal("User was ranked!");},50);
          //add Notification for ranking
          addRnkingNoti(uname,playerId);

          $.each(data,function(i,item){

          });
          hideLoading();
        },  error: function(data){hideLoading();},
        async:false
      });
    }
    $.mobile.changePage("#playersFromGame", {

      transition: "slide", changeHase: false
    });

  }


  //show the list of the players that are playing to the game
  function selectAllPlayersToRank(game_id){
    pageIsLoading();
    var user_choice="joined";

    $.ajax({
      url: "http://104.155.36.52/gameonphp/show_players_list.php",
      type: "post",
      data:{game_id:game_id, user_choice:user_choice},
      success: function(data){
        $("#ulRanking-Players").find('li').remove();
        $.each(data,function(i,item){
          $('#ulRanking-Players').append('<li><a href="#" class="ui-btn ui-shadow ui-corner-all ui-btn-icon-right ui-icon-myicon2 loadinfo" style="padding-top: 8px; padding-bottom: 8px;" onclick="  profileDeatilsForRanking(\'' +item.user_id+ '\');">'+item.first_name+' '+item.last_name+'</a></li>').listview('refresh');

        });
      },async:false
    });

    hideLoading();
  }



  //selecting all notifications to user
  function selectAllNotiOfPlayer(uname){


    $.ajax({
      url: "http://104.155.36.52/gameonphp/selectAllNoti.php",
      type: "post",
      data:{uname: uname},
      success: function(data){
        if(data.length!=0)
        $.each(data,function(i,item){

          //game invitation noti//
          if(item.text=="game_invitation_mes")

          $('#ulNoti').append('<li><a href="#" class="ui-btn ui-shadow ui-corner-all ui-btn-icon-right ui-icon-myicon2 loadinfo" onclick="updateGameNoti(\'' +item.noti_id + '\',\'' +item.game_id+ '\');">Game invitation from '+item.first_name+" "+item.last_name+'</a></li>').listview('refresh');

          //ranking noti//
          else {
            $('#ulNoti').append('<li><a href="#" class="ui-btn ui-shadow ui-corner-all ui-btn-icon-right ui-icon-myicon2 loadinfo" onclick="updateNoti(\'' +item.noti_id+ '\');">You were ranked by'+' '+item.first_name+" "+item.last_name+'</a></li>').listview('refresh');
          }
        });
        hideLoading();
      },  error: function(data){hideLoading();},
    });

  }


  //updating notifications to 'read' and calling game deatils function
  function updateGameNoti(noti_id,game_id){

    $.ajax({
      url: "http://104.155.36.52/gameonphp/update_noti.php",
      type: "post",
      data:{noti_id: noti_id},
      success: function(data){
        if(data.length!=0)
        //   $.each(data,function(i,item){

        gamesDeatils(game_id);
        //   });
        hideLoading();
      }
    });
  }


  //updating notifications to 'read' and calling profile deatils function
  function updateNoti(noti_id){

    $.ajax({
      url: "http://104.155.36.52/gameonphp/update_noti.php",
      type: "post",
      data:{noti_id: noti_id},
      success: function(data){
        if(data.length!=0)
        //   $.each(data,function(i,item){

        profileDeatils(uname);
        //     });
        hideLoading();
      }
    });
  }



  //creating notification of game invitation to user
  function addGameNoti(g_id,uname,picked_Users){
    var notiType="game_invitation_mes";
    $.ajax({
      url: "http://104.155.36.52/gameonphp/add_noti.php",
      type: "post",
      data:{g_id: g_id,uname:uname,picked_Users:picked_Users,notiType:notiType},
      success: function(data){
        //  if(data.length!=0)
      }
    });
  }

  //creating notification of game invitation to user
  function addRnkingNoti(uname,picked_Users){
    var notiType="ranking";
    g_id=null;
    $.ajax({
      url: "http://104.155.36.52/gameonphp/add_noti.php",
      type: "post",
      data:{g_id: g_id,uname:uname,picked_Users:picked_Users,notiType:notiType},
      success: function(data){
        //  if(data.length!=0)
      }
    });
  }
  //selecting all users from db
  function selectAlluserd(){
    pageIsLoading();
    $.ajax({
      url: "http://104.155.36.52/gameonphp/selectAllUsers.php",
      type: "get",
      success: function(data){
        //remove the elemnts in the list
        $("#allUsers").find('li').remove();

        $.each(data,function(i,item){

          //add the elemnts to the list

          $('#allUsers').append('<li><a href="#" class="ui-btn ui-shadow ui-corner-all ui-btn-icon-right ui-icon-myicon2 loadinfo" onclick="profileDeatils(\'' +item.user_id+ '\');"><img src="http://104.155.36.52/gameonphp/upload/'+item.profile_picture+'"><h1>'+item.first_name+' '+item.last_name+' </h1><p>'+item.city+'</p></a></li>').listview('refresh');
        });
        hideLoading();
      }, error: function(data){hideLoading();}
    });
  }

  //function to calculate the number of notifications
  function calculateAllNotiOfPlayer(uname){


    $.ajax({
      url: "http://104.155.36.52/gameonphp/calculateNumNoti.php",
      type: "post",
      data:{uname: uname},
      success: function(data){
        if(data.length!=0)
        $.each(data,function(i,item){
          //updating num of notifications
          document.getElementById("noti-span").innerHTML=item.numberOfNoti;
          if(item.numberOfNoti==0)
          {
             document.getElementById("notiDiv").style.backgroundColor = "grey";
          }
          else {
           document.getElementById("notiDiv").style.backgroundColor = "red";
          }
      });
      else {
        document.getElementById("noti-span").innerHTML=0;
       document.getElementById("notiDiv").style.backgroundColor = "grey";
      }
      //hideLoading();
    },  error: function(data){hideLoading();},
  });

}


/*the function add the user's deatils from facebook*/

function addUserfromfb(fbid, email, firstName, lastName, birthday, location, fbpic){
  //var bool;
  alert("fbid: "+fbid+ " email: "+email+" firstName: "+firstName+" lastName: "+lastName+" birthday: "+ birthday+" location: "+location+" picture: " +fbpic  );

  $.ajax({
    url: "http://104.155.36.52/gameonphp/addUserFromFB.php",
    type: "post",
    data:{fbid:fbid, email:email, firstName:firstName, lastName:lastName, birthday:birthday, location:location, fbpic:fbpic},
      success: function(data){
        swal("User was Added!","", "success");

        uname=checkingLogin(fbid,fbid);
        if(uname!=null){
          setTimeout(goToMenu, 700);
        }

        else {
          hideLoading();
        }
    /*      uname=localStorage.getItem("fbid");
          var first=localStorage.getItem("firstName");
          var last=localStorage.getItem("lastName");
          var user_image=localStorage.getItem("fbpic");
          loginLocalStorage();*/

      },
      error:function(data)
      {swal("Error!");
      hideLoading();
      $('#sign-in-btn').removeClass('ui-disabled');
    }
  });

}
