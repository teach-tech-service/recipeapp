"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _recipe = require("../controllers/recipe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var _default = function _default() {
  router.get("/info", _recipe.getRecipeInfo);
  router.get("/page/:page", _recipe.getRecipePage);
  router.get("/:id", _recipe.getRecipeById);
  router.post("/", _recipe.postRecipe);
  return router;
};

exports["default"] = _default;
//# sourceMappingURL=recipe.js.map