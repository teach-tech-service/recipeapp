"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _recipe = require("../enums/recipe");

var _ingredient = _interopRequireDefault(require("./ingredient"));

var _step = _interopRequireDefault(require("./step"));

var _allergens = _interopRequireDefault(require("./allergens"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

var recipeSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  upvotes: {
    type: Number,
    "default": 0,
    required: true
  },
  difficulty: {
    type: String,
    "default": "easy",
    "enum": _recipe.difficultyEnums,
    required: true
  },
  time: {
    type: String,
    "default": "1:00",
    required: true
  },
  heroImage: {
    type: String,
    "default": "1.jpeg",
    required: true
  },
  ingredients: [_ingredient["default"]],
  steps: [_step["default"]],
  allergens: [_allergens["default"]],
  author: {
    type: String,
    "default": "john",
    required: true
  },
  cuisine: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    "default": new Date()
  }
});

var _default = _mongoose["default"].model("recipe", recipeSchema);

exports["default"] = _default;
//# sourceMappingURL=recipe.js.map