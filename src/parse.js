/* global exports, require */

(function() {
  "use strict";

  var chr = require("./chr");
  var cons = require("./pair").get;
  var sym = require("./sym");
  var uniq = require("./uniq").uniq;

  var parse;

  var quotes = {
    "'": "quote",
    ",": "unquote",
    ",@": "unquote-splicing",
    "`": "quasiquote"
  };

  var parseChar = function(token) {
    var len = token.length;

    if (len === 3) {
      return chr.get(token.charCodeAt(2));
    }

    // unicode?
    if (len === 2) {
      return chr.get(token.charCodeAt(1));
    }

    switch (token.substring(2)) {
      case "newline":
        return chr.get(10);
      case "return":
        return chr.get(13);
      case "space":
        return chr.get(32);
      case "tab":
        return chr.get(9);
      default:
        throw "parse - unrecognised escape sequence '" + token + "'";
    }
  };

  var parseList = function(rdr, expected, genSym) {
    var exp, last, list;

    list = last = sym.nil;

    while (rdr.peek() !== null) {
      if (rdr.peek() === expected) {
        rdr.pop(); // remove trailing [expected]

        return list;
      }

      if (rdr.peek() === ".") {
        rdr.pop();
        last.cdr = parse(rdr, genSym);

        // remove trailing ')'
        rdr.pop();

        return list;
      }

      exp = parse(rdr, genSym);

      if (typeof genSym !== "undefined" && exp === sym.get("_")) {
        exp = genSym;
      }

      if (last === sym.nil) {
        list = cons(exp, sym.nil);
        last = list;
      } else {
        last.cdr = cons(exp, sym.nil);
        last = last.cdr;
      }
    }

    throw "expected '" + expected + "'";
  };

  parse = function(rdr, genSym) {
    var token = rdr.pop();

    // list?
    if (token === "(") {
      return parseList(rdr, ")", genSym);
    }

    if (token === "[") {
      var s = uniq();
      var l = parseList(rdr, "]", s);
      return cons(sym.fn, cons(cons(s, sym.nil), cons(l, sym.nil)));
    }

    // string?
    if (token[0] === '"') {
      return token.substring(1, token.length - 1);
    }

    // char?
    if (token[0] === "#") {
      return parseChar(token);
    }

    // quote?
    if (typeof quotes[token] !== "undefined") {
      return cons(sym.get(quotes[token]), cons(parse(rdr, genSym), sym.nil));
    }

    var nr = parseFloat(nr);

    // symbol?
    if (isNaN(nr)) {
      return sym.get(token);
    }

    // nr
    return nr;
  };

  exports.parse = parse;
})();
