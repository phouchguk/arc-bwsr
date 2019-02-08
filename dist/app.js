(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var Char = function(value) {
  if (typeof value !== "number") {
    throw new Error("Char value must be a number, was " + value);
  }

  this.value = value;
};

exports.get = function(value) {
  return new Char(value);
};

exports.val = function(c) {
  return c.value;
};

},{}],2:[function(require,module,exports){
"use strict";

var chr = require("./chr");
var test = require("./test");

require("../test/chr");

test.run();

},{"../test/chr":4,"./chr":1,"./test":3}],3:[function(require,module,exports){
"use strict";

var eql = function(a, b) {
  if (a !== null && a.constructor === Array) {
    for (var i = 0; i < a.length; i++) {
      return eql(a[i], b[i]);
    }
  }

  return a === b;
};

var runNs = function(tests, output) {
  var i, res;

  for (i = 0; i < tests.length; i++) {
    try {
      res = tests[i].fn();
    } catch (e) {
      res = "EXC: " + e;
    }

    var ok = eql(res, tests[i].expect);

    output.push({
      desc: tests[i].desc,
      pass: ok,
      res: res,
      expect: tests[i].expect
    });
  }
};

var tests = {};

var run = function() {
  var ns;
  var output = {};

  for (ns in tests) {
    if (tests.hasOwnProperty(ns)) {
      output[ns] = [];
      runNs(tests[ns], output[ns]);
    }
  }

  tests = null;

  for (ns in output) {
    if (output.hasOwnProperty(ns)) {
      console.log("---");
      console.log(ns);
      console.log("---");

      for (var i = 0; i < output[ns].length; i++) {
        var o = output[ns][i];
        console.log(o.desc);

        var expect = o.expect;

        /*
        if (arc.isSymbol(expect)) {
          expect = arc.symName(expect);
        }
				*/

        if (o.pass) {
          console.log("pass: " + expect);
        } else {
          var res = o.res;

          /*
          if (arc.isSymbol(res)) {
            res = arc.symName(res);
          }
					*/

          console.log("FAIL: expected " + expect + " got " + res);
        }

        console.log("   ");
      }
      runNs(ns, output[ns]);
    }
  }
};

var ns = null;

exports.describe = function(desc) {
  if (typeof tests[desc] === "undefined") {
    tests[desc] = [];
  }

  ns = tests[desc];
};

exports.it = function(desc, fn, expect) {
  ns.push({
    desc: desc,
    fn: fn,
    expect: expect
  });
};

exports.run = run;

},{}],4:[function(require,module,exports){
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

},{"../src/chr":1,"../src/test":3}]},{},[2]);
