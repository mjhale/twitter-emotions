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

        $('body').append("<br />happy " + happyCount);
        $('body').append("<br />sad " + sadCount);

        if (happyCount >= sadCount) {
          $('.feel').html(":D");
        } else {
          $('.feel').html(":(");
        }
      });
    });
  };

  $(function () { main(); });
}(jQuery));