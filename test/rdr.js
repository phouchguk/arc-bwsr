/* globals require */

(function() {
  "use strict";

  var test = require("../src/test");
  var IdxRdr = require("../src/idx_rdr").IdxRdr;

  var rdr = new IdxRdr("abc");

  test.describe("rdr");

  test.it(
    "should pop first char",
    function() {
      return rdr.pop();
    },
    "a"
  );

  test.it(
    "should pop second char",
    function() {
      return rdr.pop();
    },
    "b"
  );

  test.it(
    "should peek third char",
    function() {
      return rdr.peek();
    },
    "c"
  );

  test.it(
    "should pop third char",
    function() {
      return rdr.pop();
    },
    "c"
  );

  test.it(
    "should return null",
    function() {
      return rdr.pop();
    },
    null
  );
})();
