/*jslint indent:2, plusplus: true*/
/*global jQuery*/
(function($) {
  'use strict';

  var main = function () {
    var happyCount = 0,
      sadCount = 0;

    $.getJSON("/happyCount.json", function (happyCountData) {
      $.getJSON("/sadCount.json", function (sadCountData) {
        happyCount = Number(happyCountData.happyCount);
        sadCount = Number(sadCountData.sadCount);

        if (happyCount >= sadCount) {
          $('.feel').html('<img src="images/happy.jpg" alt="Happy" />');
        } else {
          $('.feel').html('<img src="images/sad.jpg" alt="Sad" />');
        }
      });
    });

    $.getJSON("/happy.json", function (happyData) {
      $.getJSON("/sad.json", function (sadData) {
        $.each(happyData, function () {
          $('.happy-words').append(this.word + ' ');
        });
        $.each(sadData, function () {
          $('.sad-words').append(this.word + ' ');
        });
      });
    });
  };

  $(function () { main(); });
}(jQuery));
