/* globals require */

(function() {
  "use strict";

  var test = require("../src/test");
  var p = require("../src/pair");

  test.describe("pair");

  test.it(
    "should give car",
    function() {
      return p.car(p.get(1, 2));
    },
    1
  );

  test.it(
    "should give cdr",
    function() {
      return p.cdr(p.get(1, 2));
    },
    2
  );

  test.it(
    "should be able to tell pair type",
    function() {
      return p.is(p.get(1, 2));
    },
    true
  );

  test.it(
    "should be able to tell pair type",
    function() {
      return p.is(42);
    },
    false
  );

  test.it(
    "should be able to set car",
    function() {
      var pair = p.get(1, 2);
      p.setCar(pair, 42);

      return [p.car(pair), p.cdr(pair)];
    },
    [42, 2]
  );

  test.it(
    "should be able to set cdr",
    function() {
      var pair = p.get(1, 2);
      p.setCdr(pair, 42);

      return [p.car(pair), p.cdr(pair)];
    },
    [1, 42]
  );
})();
