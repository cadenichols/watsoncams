'use strict';

$(document).ready(init);

function init() {
  $('#go').click(goClicked);
  $('body').on("keypress", inputEnter);
}

function inputEnter(e) {
  if(e.which === 13) {
    goClicked(e);
  }
}

function goClicked(e) {
  var $inputCS = $('#inputCS').val().split(", ");
  $.get("http://api.wunderground.com/api/daf9b48cc5c4fd1b/webcams/q/" + $inputCS[1] + "/" + $inputCS[0] + ".json", {
    dataType: 'jsonp',
    method: 'GET'
  })

  .success(function(data){
    console.log(data);
    console.log('city:', $inputCS[0]);


    var webcams = data.webcams.filter(function(webcam){
      console.log(webcam.city);
      return webcam.city === $inputCS[0];
    });

    var $tds = [];

    if(!webcams.length){
      webcams = data.webcams;
    }

    for(var i = 0; i < 6; i++) {
      var $img = $('<img>');
      $img.addClass('camframes');
      $img.attr('alt', 'webcam');
      var index = Math.floor(Math.random() * webcams.length)
      $img.attr('src', webcams[index].CURRENTIMAGEURL);

      var $td = $('<td>');
      $td.append($img);
      $tds.push($td);
    }

    var $secondTds = $tds.splice(3);

    var $tr1 = $('<tr>').append($tds);
    var $tr2 = $('<tr>').append($secondTds);

    $('#tableBody').append($tr1, $tr2);
    $('.hidden').removeClass('hidden');

  })
  .fail(function(error) {
    console.log('error:', error);
  });
}
