/* global exports */

(function() {
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
})();
