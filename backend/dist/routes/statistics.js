"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _statistics = require("../controllers/statistics");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var _default = function _default() {
  router.get("/numberOfRecipes/:numberOfDays", _statistics.getNumberOfRecipes);
  router.get("/cuisines", _statistics.getCuisines);
  router.get("/difficulty", _statistics.getDifficulty);
  return router;
};

exports["default"] = _default;
//# sourceMappingURL=statistics.js.map