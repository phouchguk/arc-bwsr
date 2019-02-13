/* global exports, require */

(function() {
  "use strict";

  var config = require("./config");
  var sym = require("./sym");

  var uniqIndex = 0;

  exports.uniq = function() {
    var s;

    s = sym.get(config.gensymPrefix + uniqIndex);
    uniqIndex++;

    return s;
  };

  // only for testing!
  exports.reset = function() {
    uniqIndex = 0;
  };
})();
