/* global console, exports */

(function() {
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
})();
