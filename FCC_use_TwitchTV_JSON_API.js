$(document).ready(function(){

  var users = ["freecodecamp", "ESL_SC2", "OgamingSC2", "madeUpUserForTesting", "brunofin", "comster404"];

  for (i = 0; i < users.length; i++) {
    $.getJSON("https://api.twitch.tv/kraken/users/" + users[i] + "?client_id=[client ID]", function(json) {
      console.log(json);
      if (json.bio === null) {
        $(".userOffline").append("<div class='responseStream row well offline'><div class='col-md-2'><img src='" + json.logo + "' alt='profile image' class='img-responsive img-circle'></div><div class='col-md-3'><h4>" + json.display_name + "</a></h4></div><div class='col-md-7'><h5>Account closed</h5></div></div>");
      }

      else {
        $(".userOffline").append("<div class='responseStream row well offline' id='" + json.display_name + "'><div class='col-md-2'><img src='" + json.logo + "' alt='profile image' class='img-responsive img-circle'></div><div class='col-md-3'><h4><a href='" + json._links.self + "' alt='stream link' target='_blank'>" + json.display_name + "</a></h4></div><div class='col-md-7' id='currentStream" + json.display_name + "'><h5>Offline</h5></div></div>");

        $.getJSON("https://api.twitch.tv/kraken/streams/" + json.name + "?client_id=[client ID]", function(reply){
          console.log(reply);
          $("#" + reply.stream.channel.display_name).remove();
          $("#" + reply.stream.channel.display_name).remove();
          $(".userOnline").append("<div class='responseStream row well online' id='" + reply.stream.channel.display_name + "'><div class='col-md-2'><img src='" + reply.stream.channel.logo + "' alt='profile image' class='img-responsive img-circle'></div><div class='col-md-3'><h4><a href='" + reply.stream.channel.url + "' alt='stream link' target='_blank'>" + reply.stream.channel.display_name + "</a></h4></div><div class='col-md-7'><h5>" + reply.stream.channel.game + " - " + reply.stream.channel.status + "</h5></div></div>");
        });
      };

    })
    .fail(function(error) {
      $(".userOffline").append("<div class='responseStream row well offline'><div class='col-md-2'></div><div class='col-md-3'><h4></h4><h5>" + JSON.parse(error.responseText).message + "</h5></div><div class='col-md-7'></div></div>");
    });
  };
});
