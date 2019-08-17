"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var stepSchema = new _mongoose.Schema({
  number: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String
  }
});
var _default = stepSchema;
exports["default"] = _default;
//# sourceMappingURL=step.js.map