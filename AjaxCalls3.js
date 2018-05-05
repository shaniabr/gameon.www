
           //selecting all players are not in the game
           function selectPlayersNotInvited(gameid){

          $.ajax({
                  url: "http://localhost/gameonphp/selectAllPlayersNotInvited.php",
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
                        url: "http://localhost/gameonphp/selectGamesThatOver.php",
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
                           url: "http://localhost/gameonphp/connection.php",
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
                                 y.setAttribute("src", "http://localhost/gameonphp/upload/"+item.profile_picture);

                               }
                               else {

                                 //picture in menu
                                 y.setAttribute("src", "http://localhost/gameonphp/upload/user.png");
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
                           url: "http://localhost/gameonphp/update_rank_user.php",
                           type: "post",
                           data:{playerId:playerId,
                           goals:goals,assits:assits,
                           speed:speed,header:header,
                           shot:shot, dribble:dribble,
                          fairness:fairness},
                           success: function(data){
                               setTimeout(function(){   swal("User was ranked!");},50);
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
                           url: "http://localhost/gameonphp/show_players_list.php",
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