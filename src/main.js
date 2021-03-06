/* global require */

(function() {
  "use strict";

  var test = require("./test");

  require("../test/chr");
  require("../test/pair");
  require("../test/rdr");
  require("../test/sym");
  require("../test/tokenize");
  require("../test/uniq");
  require("../test/parse");

  test.run();
})();
