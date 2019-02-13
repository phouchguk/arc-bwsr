/* globals Symbol, exports */

(function() {
  "use strict";

  var sym = function(name) {
    return Symbol.for(name);
  };

  exports.get = sym;

  exports.name = function(exp) {
    var str;

    str = exp.toString();
    return str.substring(7, str.length - 1);
  };

  exports.is = function(exp) {
    return typeof exp === "symbol";
  };

  exports.fn = sym("fn");
  exports.nil = sym("nil");
  exports.t = sym("t");
})();
