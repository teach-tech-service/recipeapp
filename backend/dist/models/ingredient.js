"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var ingredientSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  value: {
    type: String,
    "default": " "
  }
});
var _default = ingredientSchema;
exports["default"] = _default;
//# sourceMappingURL=ingredient.js.map