/* globals exports */

(function() {
  "use strict";

  var rdr = function(s) {
    this.s = s;
    this.len = s.length;
    this.cursor = 0;
  };

  rdr.prototype.close = function() {
    delete this.s;
    this.len = 0;
    this.cursor = 0;
  };

  rdr.prototype.peek = function() {
    if (this.cursor === this.len) {
      return null;
    }

    return this.s[this.cursor];
  };

  rdr.prototype.pop = function() {
    if (this.cursor === this.len) {
      return null;
    }

    return this.s[this.cursor++];
  };

  exports.IdxRdr = rdr;
})();
