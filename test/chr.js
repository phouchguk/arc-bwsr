"use strict";

var test = require("../src/test");
var chr = require("../src/chr");

test.describe("chr");

test.it(
  "should instantiate correctly",
  function() {
    var c = chr.get(10);
    return chr.val(c);
  },
  10
);

test.it(
  "should reject non-numbers",
  function() {
    var c = chr.get("x");
    return chr.val(c);
  },
  "EXC: Error: Char value must be a number, was x"
);
