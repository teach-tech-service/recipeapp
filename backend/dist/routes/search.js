"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _search = require("../controllers/search");

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var _default = function _default() {
  router.get("/", _search.searchRecipe);
  return router;
};

exports["default"] = _default;
//# sourceMappingURL=search.js.map