/*jslint indent:2, plusplus: true*/
/*global jQuery*/
(function($) {
  'use strict';

  var main = function () {
    var happyCount = 0,
      sadCount = 0;

    $.getJSON("/happyCount.json", function (happyCountData) {
      $.getJSON("/sadCount.json", function (sadCountData) {
        happyCount = happyCountData.happyCount;
        sadCount = sadCountData.sadCount;

        if (happyCount >= sadCount) {
          $('.feel').html('<img src="images/happy.jpg" alt="Happy" />');
        } else {
          $('.feel').html('<img src="images/sad.jpg" alt="Sad" />');
        }
      });
    });
  };

  $(function () { main(); });
}(jQuery));
