/* global require */

(function() {
  "use strict";

  var test = require("../src/test");
  var sym = require("../src/sym");

  test.describe("sym");

  test.it(
    "should return exactly the same sym for the passed arg",
    function() {
      return sym.get("test");
    },
    sym.get("test")
  );

  test.it(
    "should be able to give me a sym name",
    function() {
      return sym.name(sym.get("test"));
    },
    "test"
  );

  test.it(
    "should be able to tell it's a symbol",
    function() {
      return sym.is(sym.get("test"));
    },
    true
  );

  test.it(
    "should be able to tell it's a symbol",
    function() {
      return sym.is("test");
    },
    false
  );

  test.it(
    "should define nil",
    function() {
      return sym.is(sym.nil);
    },
    true
  );

  test.it(
    "should define t",
    function() {
      return sym.is(sym.t);
    },
    true
  );
})();
