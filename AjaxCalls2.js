
/*server address=173.194.106.92*/
//shani//
           /*the function insert an invitation to DB*/

           function addInvation(game_id,u_id){
           $.ajax({

                  url: "http://104.199.44.112/gameonphp/add_game_invation.php",

                  type: "post",
                    data:{game_id: game_id,u_id: u_id},
                  success: function(data){

                  //  alert("The user "+u_id+"  was invited!");

                },
                        error:function(data)
                        {swal("Error! The user "+u_id+"  wasn't invited!");}
                    });


                      }

                      /*the function insert an invitation to DB for Game creator*/

                      function addInvationForGameCreator(game_id,u_id){
                      $.ajax({
                             url: "http://104.199.44.112/gameonphp/add_game_invation_for_creator.php",
                             type: "post",
                               data:{game_id: game_id,u_id: u_id},
                             success: function(data){

                             },
                                   error:function(data)
                                   {swal("Error! The user "+u_id+"  wasn't invited!");}
                               });


                                 }

           //selecting all users but this user
           function selectAllUsers(uname){
          $.ajax({
                  url: "http://104.199.44.112/gameonphp/allusersButYou.php",
                  type: "post",
                  data:{uname:uname},
                  success: function(data){
                    emptyList();
                  $.each(data,function(i,item){

$('#addPlayersToGame').append('<li class="list-with-checkbox ui-li-has-alt ui-first-child"><a class="ui-btn"><div class="ui-checkbox">'+
'<label for="ap-'+item.user_id+'" class="list-with-checkbox ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left ui-checkbox-off">'+item.first_name+' '+item.last_name+'</label>'+
'<input data-iconpos="left" name="ap-'+item.user_id+'" id="ap-'+item.user_id+'" type="checkbox" data-cacheval="true" class="list-with-checkbox" value="true"/></div></a>'+
'<a href="#" class="ui-btn ui-shadow ui-corner-all ui-btn-icon-right ui-icon-myicon2 loadinfo" onclick="profileDeatils(\'' +item.user_id+ '\');"></a></li>');
$("[type=checkbox]").checkboxradio();
$('#addPlayersToGame').listview('refresh');

                   });
                 },async:false
                   });

                   hideLoading();
                 }

           //selecting the last games
              function lastGame(picked_Users){
                var g_id;
               $.ajax({
                       url: "http://104.199.44.112/gameonphp/selectLastGameId.php",
                       type: "get",
                       success: function(data){
                       $.each(data,function(i,item){

                             g_id=item.game_id;
                             //add invitation DB
                             addInvation(g_id,picked_Users);
                             //sending notification
                             addGameNoti(g_id,uname,picked_Users);

                   });
                   }

                   });
                 }

                 //selecting the last games for Game creator
                    function lastGameForGameCreator(picked_Users){
                      var g_id;
                     $.ajax({
                             url: "http://104.199.44.112/gameonphp/selectLastGameId.php",
                             type: "get",
                             success: function(data){
                             $.each(data,function(i,item){

                                   g_id=item.game_id;

                                   //add invitation DB
                                   addInvationForGameCreator(g_id,picked_Users);

                         });
                         }

                         });
                       }

                 //updateGameAccess
                    function updateGameAccess(game_id, ball, pump, water, net){
                      pageIsLoading();
                     $.ajax({
                             url: "http://104.199.44.112/gameonphp/updateGameAccessories.php",
                             type: "post",
                               data:{game_id:game_id,ball:ball,pump:pump,water:water,net:net},
                             success: function(data){

                                 },
                                   async:false
                         });
                         //go to edit game page
                         $.mobile.changePage("#edit-specific-game-info", {
                         transition: "slide", changeHase: false
                         });

                       }

// checks if the user name is already exists//
                        function functionCheckUserName(uname){
                          var exsist=false;
                           $.ajax({
                                   url: "http://104.199.44.112/gameonphp/connection.php",
                                   type: "post",
                                     data:{uname: uname},
                                   success: function(data){
                                     if(data.length==0)
                                       exsist=true;
                                   //  else{    alert("User name Exists");  }
                               },
                                 async:false
                               });
                          return exsist;
                             }


                             //selecting all fields from db
                                function selectAllFields(){

                                 $.ajax({
                                         url: "http://104.199.44.112/gameonphp/selectAllFields.php",
                                         type: "get",
                                         success: function(data){
                                           //remove the elemnts in the list
                                           $("#fields-list").find('li').remove();

                                         $.each(data,function(i,item){

                  //add the elemnts to the list

                  $('#fields-list').append('<li><a href="#" class="ui-btn ui-shadow ui-corner-all ui-btn-icon-right ui-icon-myicon2 loadinfo" onclick="fieldsDeatils(\'' +item.field_id+ '\');"><img src="http://104.199.44.112/gameonphp/upload/'+item.field_img+'"><h1>'+item.field_name+':'+' '+item.city+' </h1><p>'+item.address+'</p></a></li>').listview('refresh');
                            });
                            hideLoading();
                          }, error: function(data){hideLoading();}
                            });
                          }


  //add the deatils for a field
                          function fieldsDeatils(field_id){

                           $.ajax({
                                   url: "http://104.199.44.112/gameonphp/field_deatils.php",
                                   type: "post",
                                     data:{field_id:field_id},
                                   success: function(data){

                                   $.each(data,function(i,item){
                                     changeMapValues(item.longitude,item.latitude,item.field_name,item.address);

                                     document.getElementById("field-name-h1").innerHTML=item.field_name;
                                      document.getElementById("type-field").innerHTML=item.type;
                                     document.getElementById("size-field").innerHTML=item.length+"X"+item.width ;
                                     document.getElementById("amountOfpeople-field").innerHTML=item.amount_of_people;
                                      document.getElementById("hours-field").innerHTML=item.hours;
                                       document.getElementById("lighting-field").innerHTML=item.lighting;
                                       document.getElementById("city-field").innerHTML=item.city;
                                        document.getElementById("address-field").innerHTML=item.address;

                                        var x = document.getElementById("field-img");

                                          //picture of the field
                                          x.setAttribute("src", "http://104.199.44.112/gameonphp/upload/"+item.field_img);


                                      });
                                      hideLoading();
                               },
                                error: function(data){hideLoading();},
                                 async:false
                               });

                               //go to field page
                             $.mobile.changePage("#field-info-dynamic", {
                             transition: "slide", changeHase: false
                             });

                             }
                             // check if xsist invitation for user to this game
                               function checkIfInvitationExsist(user_id,  game_id, user_choice){
                                 var bool=true;
                                 $.ajax({
                                         url: "http://104.199.44.112/gameonphp/check_game_invitation.php",
                                         type: "post",
                                           data:{game_id:game_id, user_id:user_id},
                                         success: function(data){
                                           if(data.length!=0 && user_choice=="joined")
                                             bool= false;
                                             else if(data.length==0 && user_choice=="canceled"){
                                                 setTimeout(function(){   swal("You are not invited to the game"); }, 50);

                                             }
                                             else {
                                               if(user_choice=="joined") {     //if choice=joined- create new invitation for user
                                                 createInvitationjoin(user_id,  game_id);
                                                 }

                                                   else{     //if choice=canceled- sould update
                                                       bool=false;
                                                   }
                                             }
                                     },
                                       async:false
                                     });
                               return bool;
                               }

                             // create a new invitation for user (public game)
                             function createInvitationjoin(user_id,  game_id){
                               $.ajax({
                                       url: "http://104.199.44.112/gameonphp/add_game_invation_for_creator.php",
                                       type: "post",
                                         data:{game_id:game_id, u_id:user_id},
                                       success: function(data){
                                         selectAllGameForUserApprove();
                                           setTimeout(function(){   swal   ("Congratulations! You were added to the game"); }, 50);

                                         $.mobile.changePage("#my-games-page", {

                                             transition: "slide", changeHase: false
                                         });
                                   },
                                     async:false
                                   });
                             }


// get the last rank in league for the new team's rank
                             function getLastRankLeauge(){
                               $.ajax({
                                       url: "http://104.199.44.112/gameonphp/selectTableLeague.php",
                                       type: "get",
                                       success: function(data){

                                       $.each(data,function(i,item){

                                         document.getElementById("team-create-place").value=parseInt(item.ranking)+1;

                                          });
                                      }
                                      });
                             }

                             // create a new invitation for user (public game)
                             function checkTeamName(team_name,shirt,symbool,rank,uname){
                               $.ajax({
                                       url: "http://104.199.44.112/gameonphp/team_deatils.php",
                                       type: "post",
                                         data:{team_name: team_name},
                                       success: function(data){
                                          if(data.length==0)
                                          {
                                            addTeam(team_name,shirt,symbool,rank,uname);
                                          }
                                          else {
                                              setTimeout(function(){   swal("This name is already exists"); }, 50);

                                          }

                                        }
                                        ,
                                              error:function(data)
                                              {
                                                      setTimeout(function(){   swal  ("This name is already exists!"); }, 50);
                                              }
                                   });
                             }




                             // add team
                             function addTeam(team_name,shirt,symbool,rank,uname){
                               $.ajax({
                                       url: "http://104.199.44.112/gameonphp/add_team.php",
                                       type: "post",
                                         data:{team_name:team_name, uname:uname,uname:uname},
                                       success: function(data){
                                           setTimeout(function(){   swal    ("Congratulations! You team was created"); }, 50);

                                         //adding the team to the league//
                                         addTeamToLeague(team_name,rank);
                                         //updating user game_deatils
                                         updateUserTeam(uname,team_name);

                                         $.mobile.changePage("#team-page", {

                                             transition: "slide", changeHase: false
                                         });
                                   },
                                     async:false
                                   });
                             }

                             // add team
                             function addTeamToLeague(team_name,rank){
                               $.ajax({
                                       url: "http://104.199.44.112/gameonphp/insert_teamToLeague.php",
                                       type: "post",
                                         data:{team_name:team_name,rank:rank},
                                       success: function(data){
                                         //updating the rank of the new team that will be created//
                                         getLastRankLeauge();
                                   }
                                   });
                             }

                            //updating user game_deatils-team's field
                             function updateUserTeam(uname,team_name){
                               $.ajax({
                                       url: "http://104.199.44.112/gameonphp/update_user_team.php",
                                       type: "post",
                                         data:{team_name:team_name,uname:uname},
                                       success: function(data){

                                   }
                                   });
                             }


                             // the function checks if the user belong to team
                             function getUserTeam(uname){
                               $.ajax({
                                       url: "http://104.199.44.112/gameonphp/team_deatils_of_player.php",
                                       type: "post",
                                         data:{uname: uname},
                                       success: function(data){
                                          if(data.length!=0)
                                          {
                                              $.each(data,function(i,item){
                                                getTeamDeatilsToPlayer(item.team_name);
                                            });
                                          }
                                          else {
                                             setTimeout(function(){   swal    ("You aren't belong to any team"); }, 50);

                                          }

                                        }
                                        ,
                                              error:function(data)
                                              {   setTimeout(function(){   swal    ("You aren't belong to a team"); }, 50);
                                                }
                                   });
                             }

                             //add the deatils for a field
                                                     function getTeamDeatilsToPlayer(team_name){

                                                      $.ajax({
                                                              url: "http://104.199.44.112/gameonphp/team_deatils.php",
                                                              type: "post",
                                                                data:{team_name:team_name},
                                                              success: function(data){

                                                              $.each(data,function(i,item){


                                                                document.getElementById("team-name2").value=item.team_name;
                                                                 document.getElementById("wins2").value=parseInt(item.wins);
                                                                document.getElementById("team-NumOfThropies").innerHTML=item.trophies;

                                                                 });

                                                                 $.mobile.changePage("#manage-team", {

                                                                     transition: "slide", changeHase: false
                                                                 });
                                                          },
                                                            async:false
                                                          });


                                                        }
