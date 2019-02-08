/* globals require */

(function() {
  "use strict";

  var IdxRdr = require("../src/idx_rdr").IdxRdr;
  var test = require("../src/test");
  var tokenize = require("../src/tokenize").tokenize;

  test.describe("tokenize");

  var rdrTest = function(desc, s, arr) {
    test.it(
      "should " + desc + " - " + s + " =>",
      function() {
        var rdr = new IdxRdr(s);
        return tokenize(rdr);
      },
      arr
    );
  };

  var exp;

  rdrTest("read single symbol", "abc", ["abc"]);
  rdrTest("read multiple symbols", "abc def", ["abc", "def"]);
  rdrTest("read multiple symbols", "abc def ghi", ["abc", "def", "ghi"]);
  rdrTest("read multiple symbols", "123 42.3 0", ["123", "42.3", "0"]);

  exp = ["(", "+", "1", "(", "+", "2", "3", ")", ")"];
  rdrTest("read braces", "(+ 1 (+ 2 3))", exp);
  rdrTest("read quote as delimiter", "42'x", ["42", "'", "x"]);

  exp = ["(", "map", "[", "+", "_", "5", "]", "'", "(", "1", "2", ")", ")"];
  rdrTest("read square brackets", "(map [+ _ 5] '(1 2))", exp);

  // actual newlines and tabs are treated as whitespace
  rdrTest("deal with whitespace", "   abc\n  def\t    ", ["abc", "def"]);
  rdrTest("deal with comments", "   abc\n  ;def\t    ", ["abc"]);
  rdrTest("deal with comments", "abc; def \nghi", ["abc", "ghi"]);
  rdrTest("read single char", "#\\a", ["#\\a"]);
  rdrTest("read multiple chars", "#\\a #\\b #\\c", ["#\\a", "#\\b", "#\\c"]);

  exp = ['#\\"', "#\\'", "#\\<", "#\\>"];
  rdrTest("read multiple chars", "#\\\" #\\' #\\< #\\>", exp);

  rdrTest("read space char", "#\\  #\\b #\\c", ["#\\space", "#\\b", "#\\c"]);
  rdrTest("read a string", '"abc def"', ['"abc def"']);

  // if we want a tab etc. in our string we need to escape it
  rdrTest("read an escape char", '"abc\\t def"', ['"abc\t def"']);
  rdrTest(
    "be able to have chars and comments in strings",
    '"abc\\t #\\\\a #\\\\ ; def"',
    ['"abc\t #\\a #\\ ; def"']
  );
})();
