/* global require */

(function() {
  "use strict";

  var test = require("./test");

  require("../test/chr");
  require("../test/pair");
  require("../test/sym");

  test.run();
})();
