/* globals exports */

(function() {
  "use strict";

  // implementation is internal to cons
  var Pair = function(car, cdr) {
    this.car = car;
    this.cdr = cdr;
  };

  exports.get = function(car, cdr) {
    if (typeof car === "undefined") {
      throw new Error("pair - car cannot be undefined");
    }

    if (car === null) {
      throw new Error("pair - car cannot be null");
    }

    if (typeof cdr === "undefined") {
      throw new Error("pair - cdr cannot be undefined");
    }

    if (cdr === null) {
      throw new Error("pair - cdr cannot be null");
    }

    return new Pair(car, cdr);
  };

  exports.car = function(x) {
    return x.car;
  };

  exports.cdr = function(x) {
    return x.cdr;
  };

  exports.setCar = function(x, val) {
    x.car = val;
    return val;
  };

  exports.setCdr = function(x, val) {
    x.cdr = val;
    return val;
  };

  exports.is = function(x) {
    return x instanceof Pair;
  };
})();
