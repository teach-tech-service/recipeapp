"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var _allergen = _interopRequireDefault(require("../enums/allergen"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var allergenSchema = new _mongoose.Schema({
  name: {
    type: String,
    "enum": _allergen["default"],
    required: true
  }
});
var _default = allergenSchema;
exports["default"] = _default;
//# sourceMappingURL=allergens.js.map