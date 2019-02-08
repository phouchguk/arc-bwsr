/* globals exports */

(function() {
  "use strict";

  var isWhitespace = function(c) {
    return c === " " || c === "\t" || c === "\r" || c === "\n";
  };

  var isDelimiter = function(c) {
    return (
      isWhitespace(c) ||
      c === "(" ||
      c === "[" ||
      c === ";" ||
      c === "'" ||
      c === "`" ||
      c === ","
    );
  };

  var skipWhitespace = function(rdr) {
    while (true) {
      if (!isWhitespace(rdr.peek())) {
        break;
      }

      rdr.pop();
    }
  };

  var readEscapeSequence = function(rdr) {
    // pop \
    rdr.pop();

    var c = rdr.pop();

    if (c === "\\") {
      return "\\";
    }

    if (c === "n") {
      return "\n";
    }

    if (c === "r") {
      return "\r";
    }
    if (c === "t") {
      return "\t";
    }

    throw new Error("tokenize - unrecognised escape sequence \\" + c);
  };

  var readStr = function(rdr) {
    var str = ['"'];

    // pop initial "
    rdr.pop();

    while (true) {
      if (rdr.peek() === null) {
        throw new Error("tokenize - unterminated string literal");
      }

      if (rdr.peek() === "\\") {
        str.push(readEscapeSequence(rdr));
        continue;
      }

      if (rdr.peek() === '"') {
        str.push(rdr.pop());
        break;
      }

      str.push(rdr.pop());
    }

    return str.join("");
  };

  var readSymbol = function(rdr) {
    var symbol = [];

    while (true) {
      if (rdr.peek() === null || isDelimiter(rdr.peek())) {
        break;
      }

      symbol.push(rdr.pop());
    }

    return symbol.join("");
  };

  var readChar = function(rdr) {
    // pop #
    rdr.pop();

    if (rdr.peek() !== "\\") {
      throw new Error("tokenize - # must be followed by \\, was " + rdr.peek());
    }

    // pop \
    rdr.pop();

    // handle space
    if (rdr.peek() === " ") {
      rdr.pop();

      // followed by delimiter?
      if (isDelimiter(rdr.peek())) {
        return "#\\space";
      } else {
        throw new Error("tokenize - unrecognised char '#\\'");
      }
    }

    return "#\\" + readSymbol(rdr);
  };

  var skipComment = function(rdr) {
    while (true) {
      if (rdr.peek() === null) {
        break;
      }

      if (rdr.peek() === "\n") {
        rdr.pop();
        break;
      }

      rdr.pop();
    }
  };

  // rdrs can only peek and pop. return null for eof.
  exports.tokenize = function(rdr) {
    var tokens = [];

    while (true) {
      skipWhitespace(rdr);

      if (rdr.peek() === null) {
        break;
      }

      if (isDelimiter(rdr.peek())) {
        tokens.push(rdr.pop());
        continue;
      }

      if (rdr.peek() === '"') {
        tokens.push(readStr(rdr));
        continue;
      }

      if (rdr.peek() === ";") {
        skipComment(rdr);
        continue;
      }

      if (rdr.peek() === "#") {
        tokens.push(readChar(rdr));
        continue;
      }

      tokens.push(readSymbol(rdr));
    }

    rdr.close();

    return tokens;
  };
})();
