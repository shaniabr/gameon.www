uname=localStorage.getItem("userId");
max=0;
/*server address=173.194.106.92*/

//login function
function checkingLogin(uname,pass){
  uname1=null;
  $.ajax({
    url: "http://35.205.20.238/gameonphp/login.php",
    type: "post",
    data:{uname: uname, pass:pass},
    success: function(data){
      if(data.length==0)
      setTimeout(function(){ swal("User isn't registered!"); }, 50);
      else{
        $.each(data,function(i,item){

          //saving the user id
          var  uname=item.user_id;
          var  firstName=item.first_name;
          var  lastName=item.last_name;
          var  image=item.profile_picture;


          if (typeof (Storage) !== "undefined") {
            localStorage.setItem("userId",uname);
            localStorage.setItem("userFirstName",firstName);
            localStorage.setItem("userlastName",lastName);
            localStorage.setItem("userImage",image);
          }

          //change picture//
          var x = document.getElementById("my-image");
          var y = document.getElementById("user-image-pro");

          //only if the user has a picture//
          if(item.profile_picture!=null  && item.profile_picture!="")
          {

            //picture in menu
            x.setAttribute("src", "http://35.205.20.238/gameonphp/upload/"+item.profile_picture);

            //picture in profile page
            y.setAttribute("src", "http://35.205.20.238/gameonphp/upload/"+item.profile_picture);

          }
          else {

            //picture in menu
            x.setAttribute("src", "http://35.205.20.238/gameonphp/upload/user.png");

            //picture in profile page
            y.setAttribute("src", "http://35.205.20.238/gameonphp/upload/user.png");
          }
          //saving the user id
          uname1=item.user_id;
          //for welcoming him
          document.getElementById("welcomUser").innerHTML=item.first_name
          //calcultes notifications
          calculateAllNotiOfPlayer(uname1);


        });
      }
    }
    ,async:false
  });

  return uname1;
}



/*the function checks the user's deatils*/

function addUser(uname,firstname,lastname,pass,email,birthdate,city,foot,imageAddress){
  var bool;
  $.ajax({
    url: "http://35.205.20.238/gameonphp/addUser.php",
    type: "post",
    data:{uname:uname, firstname:firstname, lastname:lastname,
      pass:pass, email:email, birthdate:birthdate, city:city, foot:foot,imageAddress:imageAddress},
      success: function(data){
        //this code in here doesn't work
        swal("User was Added!","", "success");
        //document.getElementById("sign-in-btn").disabled=false;

        $.mobile.changePage("#category-page", {
          transition: "slide", changeHase: false
        });
        $('#sign-in-btn').removeClass('ui-disabled');
      },
      error:function(data)
      {swal("Error! User name is already exists!");
      hideLoading();
      $('#sign-in-btn').removeClass('ui-disabled');
    }
  });

}


/*the function checks the game's deatils*/

function addGame(game_date,game_location,start_time,end_time,min_players,max_players,permanent,ball,pump,water,net,public_game,uname,end_date,sent){
  $.ajax({
    url: "http://35.205.20.238/gameonphp/addGame.php",
    type: "post",
    data:{game_date: game_date,game_location: game_location,start_time: start_time,
      end_time:end_time, min_players: min_players, max_players:max_players,permanent:permanent,ball:ball
      ,pump:pump,water:water,net:net,
      public_game:public_game,uname:uname,end_date:end_date,sent:sent},
      success: function(data){

        setTimeout(function(){ swal("Game was created!"); }, 500);
        //creating invitation for game's creator//
        lastGameForGameCreator(uname);

        //adding players to game
        $.mobile.changePage("#add-playersToGame", {

          transition: "slide", changeHase: false
        });
      },
      error:function(data)
      {swal("Error! Game wasn't created!");},

      async:false
    });
    selectUsers();
  }
  //selecting all games
  function selectAllGame(){

    var today=new Date();
    var date=today.getFullYear()+"/"+(parseInt(today.getMonth())+1)+"/"+today.getDate();
    var time=today.getHours()+":"+today.getMinutes();

    $.ajax({
      url: "http://35.205.20.238/gameonphp/selectGames.php",
      type: "post",
      data:{date: date, time:time, uname:uname},
      success: function(data){
        if(data.length!=0)
        $.each(data,function(i,item){

          $('#join-game-deatils').append('<li><a href="#" class="ui-btn ui-shadow ui-corner-all ui-btn-icon-right ui-icon-myicon2 loadinfo" onclick="gamesDeatils(\'' +item.game_id+ '\');" style="padding-top: 0px; padding-bottom: 0px;"><h1 style="color:#8bb7f0;">Date: '+item.game_date+'   '+item.start_time+'</h1> <p style="font-size: 14px;">Location: '+item.field_name+', '+item.city+'</p> <p style="font-size: 14px;">Creator: '+item.first_name+' '+item.last_name+'</p></a></li>').listview('refresh');

        });
        hideLoading();
      }
    });
  }

  //selecting all games for user approve- the functions adds the right type of game to user's list game
  function selectAllGameForUserApprove(){
    var today=new Date();
    var date=today.getFullYear()+"/"+(parseInt(today.getMonth())+1)+"/"+today.getDate();
    var time=today.getHours()+":"+today.getMinutes();
    $.ajax({
      url: "http://35.205.20.238/gameonphp/selectGamesForYou.php",
      type: "post",
      data:{uname: uname, time:time, date:date},
      success: function(data){
        $("#waiting-ul").find('li').remove();
        $("#joined-ul").find('li').remove();
        $("#canceled-ul").find('li').remove();
        $.each(data,function(i,item){

          if(item.approve=="waiting")
          $('#waiting-ul').append('<li><a href="#" class="ui-btn ui-shadow ui-corner-all ui-btn-icon-right ui-icon-myicon2 loadinfo" onclick="gamesDeatils(\'' +item.game_id+ '\');" style="padding-top: 0px; padding-bottom: 0px;"><h1 style="color:#8bb7f0;">Date: '+item.game_date+'   '+item.start_time+'</h1> <p style="font-size: 14px;">Location: '+item.field_name+', '+item.city+'</p> <p style="font-size: 14px;">Creator: '+item.first_name+' '+item.last_name+'</p></a></li>').listview('refresh');

          if(item.approve=="joined")
          $('#joined-ul').append('<li><a href="#" class="ui-btn ui-shadow ui-corner-all ui-btn-icon-right ui-icon-myicon2 loadinfo" onclick="gamesDeatils(\'' +item.game_id+ '\');" style="padding-top: 0px; padding-bottom: 0px;"><h1 style="color:#8bb7f0;">Date: '+item.game_date+'   '+item.start_time+'</h1> <p style="font-size: 14px;">Location: '+item.field_name+', '+item.city+'</p> <p style="font-size: 14px;">Creator: '+item.first_name+' '+item.last_name+'</p></a></li>').listview('refresh');
          if(item.approve=="canceled")
          $('#canceled-ul').append('<li><a href="#" class="ui-btn ui-shadow ui-corner-all ui-btn-icon-right ui-icon-myicon2 loadinfo" onclick="gamesDeatils(\'' +item.game_id+ '\');" style="padding-top: 0px; padding-bottom: 0px;"><h1 style="color:#8bb7f0;">Date: '+item.game_date+'   '+item.start_time+'</h1> <p style="font-size: 14px;">Location: '+item.field_name+', '+item.city+'</p> <p style="font-size: 14px;">Creator: '+item.first_name+' '+item.last_name+'</p></a></li>').listview('refresh');
        });
        hideLoading();
      },//, async:false
      error:function(data)
      {hideLoading();}
    });
    //hideLoading();
  }

  //selecting user's deatils- the functions adds the deatils from db and puts it on 'profile' page
  function profileDeatils(username){
    $.ajax({
      url: "http://35.205.20.238/gameonphp/connection.php",
      type: "post",
      data:{uname:username},
      success: function(data){
        $.each(data,function(i,item){


          document.getElementById("user-full-name").innerHTML=item.first_name+" "+item.last_name;
        //  document.getElementById("userNameProfile").innerHTML=item.first_name+" "+item.last_name;
          var age=calculateAge(item.date_of_birth);
          document.getElementById("userAgeProfile").innerHTML=age;
          document.getElementById("userCityProfile").innerHTML=item.city;
          var foot= "Right";
          if(item.foot=="L")
            foot="Left";
          document.getElementById("userFootProfile").innerHTML=foot;
          document.getElementById("user-goals").innerHTML=parseInt(item.goals);
          document.getElementById("user-assists").innerHTML=parseInt(item.assits);
          document.getElementById("user-Speed").innerHTML=parseInt(item.speed);
          document.getElementById("user-Shot").innerHTML=parseInt(item.shot);
          document.getElementById("user-Dribble").innerHTML=parseInt(item.dribble);
          document.getElementById("user-Fairness").innerHTML=parseInt(item.fairness);
          document.getElementById("user-Header").innerHTML=parseInt(item.header);

          //change picture//

          var y = document.getElementById("user-image-pro");
          //only if the user has a picture//
          if(item.profile_picture!=null  && item.profile_picture!="")
          {
            //picture in profile page
            y.setAttribute("src", "http://35.205.20.238/gameonphp/upload/"+item.profile_picture);

          }
          else {

            //picture in menu
            y.setAttribute("src", "http://35.205.20.238/gameonphp/upload/user.png");
          }

        });
        hideLoading();
      },  error: function(data){hideLoading();},
      async:false
    });
    $.mobile.changePage("#profile-page", {

      transition: "slide", changeHase: false
    });

  }

  //selecting game's deatils
  function gamesDeatils(game_id){
    //  pageIsLoading();
    $.ajax({
      url: "http://35.205.20.238/gameonphp/game_deatils.php",
      type: "post",
      data:{game_id:game_id},
      success: function(data){

        $.each(data,function(i,item){
          if(item.game_id!=null){

            document.getElementById("game-creator-info").value=item.first_name+" "+item.last_name;
            document.getElementById("game-id-info").value=item.game_id;
            document.getElementById("locaition-info").value=item.field_id;
            document.getElementById("date-game-info").value=item.game_date;
            document.getElementById("locaition-info").text=item.field_name;
            document.getElementById("start-time-game-info").value=item.start_time;
            document.getElementById("duration-info").value=item.end_time;
            document.getElementById("current-players-game-info").text=parseFloat(item.countPlayers);
            document.getElementById("num-players-game-info").value=parseFloat(item.max_players)-parseFloat(item.countPlayers);
            document.getElementById("permanent-game-info").value=item.permanent;
            document.getElementById("public-game-info").value=item.public_game;

          }

        });
        hideLoading();
      },
      error:function(data){hideLoading();},
      async:false
    });
    $.mobile.changePage("#game-info", {

      transition: "slide", changeHase: false
    });

  }


  //selecting field's deatils for create game
  function fieldsNamesToGameToAjax(){
    $.ajax({
      url: "http://35.205.20.238/gameonphp/selectAllFields.php",
      type: "get",
      success: function(data){
        $.each(data,function(i,item){

          $('#city-game-creat').append('<option id=cr'+item.field_id+' value='+item.field_id+'>'+item.field_name+', '+item.city+'</option>');
          $('#edit-locaition-info').append('<option id=ed'+item.field_id+' value='+item.field_id+'>'+item.field_name+', '+item.city+'</option>');
        });

      },
      async:false
    });

  }

  //show the list of the players that are playing to the game
  function showPlayersListToAjax(game_id,user_choice){


    $.ajax({
      url: "http://35.205.20.238/gameonphp/show_players_list.php",
      type: "post",
      data:{game_id:game_id, user_choice:user_choice},
      success: function(data){
        $("#players-list-info").find('li').remove();
        $.each(data,function(i,item){
          $('#players-list-info').append('<li><a href="#" class="ui-btn ui-shadow ui-corner-all ui-btn-icon-right ui-icon-myicon2 loadinfo" style="padding-top: 8px; padding-bottom: 8px;" onclick="profileDeatils(\'' +item.user_id+ '\');">'+item.first_name+' '+item.last_name+'</a></li>').listview('refresh');



          /*
          $('#players-list-info').append('<li ><a><div>'+
          '<label class="list-with-checkbox">'+item.first_name+' '+item.last_name+'</label>'+
          '</div></a>'+
          '<a href="#" class="ui-btn-icon-right ui-icon-myicon2" onclick="profileDeatils(\'' +item.user_id+ '\');"></a></li>');
          //$("[type=checkbox]").checkboxradio();
          $('#players-list-info').listview('refresh');
          */
        });
      }
    });

    $.mobile.changePage("#players-joined-list", {
      transition: "slide", changeHase: false
    });
  }
  //updating the user invitation to-"joined"
  function joinInvitationToAjax(user_id,game_id,user_choice){
    //swal(game_id);
    $.ajax({
      url: "http://35.205.20.238/gameonphp/update_game_invation.php",
      type: "post",
      data:{user_id:user_id, game_id:game_id, user_choice:user_choice},
      success: function(data){
        selectAllGameForUserApprove();
        swal("Congratulations! You were added to the game");

      },
      error:function(data)
      {swal("Error! You weren't added to the game");},

      async:false
    });
    changeActive();
    $.mobile.changePage("#my-games-page", {

      transition: "slide", changeHase: false
    });

  }


  //updating the user invitation to-"canceled"
  function cancelInvitationToAjax(user_id,game_id,user_choice){
    //swal(game_id);
    $.ajax({
      url: "http://35.205.20.238/gameonphp/update_game_invation.php",
      type: "post",
      data:{user_id:user_id, game_id:game_id, user_choice:user_choice},
      success: function(data){
        selectAllGameForUserApprove();
        swal("The invitation was canceled");


      },
      error:function(data)
      {swal("Error! The invitation wasn't canceled");},

      async:false
    });
    changeActive();
    $.mobile.changePage("#my-games-page", {

      transition: "slide", changeHase: false
    });

  }

  //selecting all games that the user created
  function selectAllGameUserCreated(){

    //empty the list
    $("#edit-game-info").find('li').remove();

    var today=new Date();
    var date=today.getFullYear()+"/"+(parseInt(today.getMonth())+1)+"/"+today.getDate();
    var time=today.getHours()+":"+today.getMinutes();

    $.ajax({
      url: "http://35.205.20.238/gameonphp/selectGamesUserCreated.php",
      type: "post",
      data:{date: date, time:time, uname:uname},
      success: function(data){
        if(data.length!=0)
        $.each(data,function(i,item){

          $('#edit-game-deatils').append('<li><a href="#" class="ui-btn ui-shadow ui-corner-all ui-btn-icon-right ui-icon-myicon2 loadinfo" onclick="gamesDeatils(\'' +item.game_id+ '\');" style="padding-top: 0px; padding-bottom: 0px;"><h1 style="color:#8bb7f0;">Date: '+item.game_date+'   '+item.start_time+'</h1> <p style="font-size: 14px;">Location: '+item.field_name+', '+item.city+'</p></a></li>').listview('refresh');
        });
        hideLoading();
      }
    });
  }


  //selecting game's deatils For editing
  function gamesDeatilsForEdit(game_id){

    $.ajax({
      url: "http://35.205.20.238/gameonphp/game_deatils.php",
      type: "post",
      data:{game_id:game_id},
      success: function(data){

        $.each(data,function(i,item){
          if(item.game_id!=null){

            var hours = parseFloat(item.start_time.split(":")[0]);
            var minutes = parseFloat(item.start_time.split(":")[1]);
            var stDate=new Date(item.game_date);

            stDate.setHours(hours);
            stDate.setMinutes(minutes);

            var hoursend = parseFloat(item.end_time.split(":")[0]);
            var minutesend = parseFloat(item.end_time.split(":")[1]);

            var endDate=new Date(item.end_date);

            endDate.setHours(hoursend);
            endDate.setMinutes(minutesend);

            var hoursDiff = ((endDate.getTime() - stDate.getTime()) / 1000)/3600;

            $("#edit-duration-info").val(hoursDiff).change();
            document.getElementById("edit-game-creator-info").value=item.first_name+" "+item.last_name;
            document.getElementById("edit-game-id-info").value=item.game_id;

            $('#edit-locaition-info').val( item.field_id ).change();

            document.getElementById("edit-date-game-info").value=item.game_date;
            document.getElementById("edit-start-time-game-info").value=item.start_time;
            document.getElementById("edit-max-players-game-info").value=parseFloat(item.max_players);

            $('#edit-flip-select-second-game-creat').val( item.permanent ).change();
            $('#edit-public-game-creat').val( item.public_game ).change();
            max=parseFloat(item.max_players);
          }

        });
        hideLoading();
      },
      error:function(data){hideLoading();},
      async:false
    });

    $.mobile.changePage("#edit-specific-game-info", {

      transition: "slide", changeHase: false
    });

  }

  //deleting game from db
  function deleteGame(game_id){

    $.ajax({
      url: "http://35.205.20.238/gameonphp/delete_game.php",
      type: "post",
      data:{game_id:game_id},
      success: function(data){
        setTimeout(function(){   swal("Game was deleted!"); }, 50);

        selectAllGameUserCreated();
        //  hideLoading();
      },
      error:function(data){
        selectAllGameUserCreated();
        //  hideLoading();
      },
      async:false
    });
    $.mobile.changePage("#edit-game-info", {

      transition: "slide", changeHase: false
    });


    pageIsLoading();

  }

  //updating game deatils in db
  function updateGame(game_id,game_date,game_location,start_time,end_time,max_players,permanent,public_game,end_date){

    $.ajax({
      url: "http://35.205.20.238/gameonphp/update_game.php",
      type: "post",
      data:{game_id:game_id, game_date:game_date, game_location:game_location,
        start_time:start_time, end_time:end_time, max_players:max_players,
        permanent:permanent, public_game:public_game, end_date:end_date},
        success: function(data){
          setTimeout(function(){ swal("Game was updated!"); }, 50);

          selectAllGameUserCreated();
          //    hideLoading();


        },
        error:function(data){
          selectAllGameUserCreated();
          //    hideLoading();
        },
        async:false
      });


      $.mobile.changePage("#edit-game-info", {

        transition: "slide", changeHase: false
      });
      pageIsLoading();
    }


    //selecting game's accesories For editing
    function accesoriesForEditAjax(game_id){
      $("#edit-ball-game").find('option').remove();
      $("#edit-net-game").find('option').remove();
      $("#edit-pump-game").find('option').remove();
      $("#edit-water-game").find('option').remove();

      $.ajax({
        url: "http://35.205.20.238/gameonphp/game_deatils.php",
        type: "post",
        data:{game_id:game_id},
        success: function(data){


          $.each(data,function(i,item){
            if(item.game_id!=null){

              // ball
              //if the user brings a ball, or no one brings a ball
              if(item.ball==uname|| item.ball==''|| item.ball=='null'){
                document.getElementById("edit-ball-game").innerHTML+='<option value=""></option>'
                document.getElementById("edit-ball-game").innerHTML+='<option value='+uname+'>'+item.first_name+' '+item.last_name+'</option>'
                $('#edit-ball-game').val(item.ball).change();
              }
              // If another user brings a ball
              else{
                $.ajax({
                  url: "http://35.205.20.238/gameonphp/user_deatils.php",
                  type: "post",
                  data:{user:item.ball},
                  success: function(data){
                    $.each(data,function(j,result){
                      document.getElementById("edit-ball-game").innerHTML+='<option value='+result.user_id+'>'+result.first_name+' '+result.last_name+'</option>'
                      $('#edit-ball-game').val(item.ball).change();
                    });
                  },
                  async:false
                });
              }
              // pump
              //if the user brings a pump, or no one brings a pump
              if(item.pump==uname|| item.pump==''|| item.pump=='null'){
                document.getElementById("edit-pump-game").innerHTML+='<option value=""></option>'
                document.getElementById("edit-pump-game").innerHTML+='<option value='+uname+'>'+item.first_name+' '+item.last_name+'</option>'
                $('#edit-pump-game').val(item.pump).change();
              }
              // If another user brings a pump
              else{
                $.ajax({
                  url: "http://35.205.20.238/gameonphp/user_deatils.php",
                  type: "post",
                  data:{user:item.pump},
                  success: function(data){
                    $.each(data,function(j,result){
                      document.getElementById("edit-pump-game").innerHTML+='<option value='+result.user_id+'>'+result.first_name+' '+result.last_name+'</option>'
                      $('#edit-pump-game').val(item.pump).change();
                    });
                  },
                  async:false
                });
              }
              // water
              //if the user brings a water, or no one brings a water
              if(item.water==uname|| item.water==''|| item.water=='null'){
                document.getElementById("edit-water-game").innerHTML+='<option value=""></option>'
                document.getElementById("edit-water-game").innerHTML+='<option value='+uname+'>'+item.first_name+' '+item.last_name+'</option>'
                $('#edit-water-game').val(item.water).change();
              }
              // If another user brings a water
              else{
                $.ajax({
                  url: "http://35.205.20.238/gameonphp/user_deatils.php",
                  type: "post",
                  data:{user:item.water},
                  success: function(data){
                    $.each(data,function(j,result){
                      document.getElementById("edit-water-game").innerHTML+='<option value='+result.user_id+'>'+result.first_name+' '+result.last_name+'</option>'
                      $('#edit-water-game').val(item.water).change();
                    });
                  },
                  async:false
                });
              }
              // net
              //if the user brings a net, or no one brings a net
              if(item.net==uname|| item.net==''|| item.net=='null'){
                document.getElementById("edit-net-game").innerHTML+='<option value=""></option>'
                document.getElementById("edit-net-game").innerHTML+='<option value='+uname+'>'+item.first_name+' '+item.last_name+'</option>'
                $('#edit-net-game').val(item.net).change();
              }
              // If another user brings a ball
              else{
                $.ajax({
                  url: "http://35.205.20.238/gameonphp/user_deatils.php",
                  type: "post",
                  data:{user:item.net},
                  success: function(data){
                    $.each(data,function(j,result){
                      document.getElementById("edit-net-game").innerHTML+='<option value='+result.user_id+'>'+result.first_name+' '+result.last_name+'</option>'
                      $('#edit-net-game').val(result.user_id).change();
                    });
                  },
                  async:false
                });
              }
            }
          });
          //hideLoading();
        },
        error:function(data){},
        async:false
      });
      //hideLoading();
      $.mobile.changePage("#edit-accesories", {

        transition: "slide", changeHase: false
      });
    }
