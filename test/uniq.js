/* global require */

(function() {
  "use strict";

  var pfx = require("../src/config").gensymPrefix;
  var sym = require("../src/sym");
  var test = require("../src/test");
  var uniq = require("../src/uniq");

  test.describe("uniq");

  test.it(
    "should give us a unique symbol",
    function() {
      return sym.name(uniq.uniq());
    },
    pfx + "0"
  );

  test.it(
    "should give us a unique symbol",
    function() {
      return sym.name(uniq.uniq());
    },
    pfx + "1"
  );

  test.it(
    "should give us a unique symbol",
    function() {
      return sym.name(uniq.uniq());
    },
    pfx + "2"
  );

  test.it(
    "should be resettable for predicatable testing",
    function() {
      uniq.reset(0);
      return sym.name(uniq.uniq());
    },
    pfx + "0"
  );
})();
