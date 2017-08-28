$(document).ready(function() {

  var streamer = [
    "ESL_SC2",
    "OgamingSC2",
    "cretetion",
    "freecodecamp",
    "storbeck",
    "habathcx",
    "RobotCaleb",
    "noobs2ninjas",
    "OMGimSal"
  ];
  var streamerObj = {};
  var streamerNew = {};

  for (var i = 0; i < streamer.length; i++) {
    var twitchAPI =
      "https://wind-bow.glitch.me/twitch-api/streams/" + streamer[i];

    streamerObj[`https://api.twitch.tv/kraken/streams/${streamer[i]}`] = {
      'url': `https://www.twitch.tv/${streamer[i]}`,
      'streamer': `${streamer[i]}`,
      'api' : twitchAPI
    };

    streamerNew[`${streamer[i]}`] = streamerObj[`https://api.twitch.tv/kraken/streams/${streamer[i]}`];

    $.getJSON(twitchAPI, results);


    $(`tr#${streamer[i]} > th > img.avatar`).wrap(`<a href="${streamerNew[streamer[i]].url}" target="_blank"></a>`);

    $(`tr#${streamer[i]} > th:nth-child(2)`).wrap(`<th><a href="${streamerNew[streamer[i]].url}" target="_blank"></a><th>`);

    $(`tr#${streamer[i]}`).append(`<td></td>`);




    function results(data) {
      if (data["stream"] === null) {
        streamerObj[data["_links"]["self"]]["streaming"] = false;
      } else {
        streamerObj[data["_links"]["self"]]["streaming"] = true;
        streamerObj[data["_links"]["self"]]["stream"] = data["stream"]["game"];
        streamerObj[data["_links"]["self"]]["preview"] = data["stream"]["preview"]["small"];
      };
      colorTable(streamerObj[data["_links"]["self"]], streamerObj);
    };

  } // end of for loop

}); // doc ready end



function colorTable(stream, object) {
  var person = stream.streamer;
  console.log(stream);
  if (stream.streaming === true) {
    $(`tr#${person}`).addClass("streaming");
    $(`tr#${person} > td`).html(`<a href="${stream.url}">${stream.stream}</a>`);
  } else {
    $(`tr#${person}`).addClass("not-streaming");
    $(`tr#${person} > td`).html("Offline");
  }

}; // end of buildTable
