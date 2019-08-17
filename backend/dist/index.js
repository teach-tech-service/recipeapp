"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _db = _interopRequireDefault(require("./config/db"));

var _recipe = _interopRequireDefault(require("./routes/recipe"));

var _search = _interopRequireDefault(require("./routes/search"));

var _config = _interopRequireDefault(require("dotenv/config"));

var _statistics = _interopRequireDefault(require("./routes/statistics"));

var _path = _interopRequireDefault(require("path"));

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PORT = process.env.PORT || 5000,
    MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/recipeapp",
    app = (0, _express["default"])();
(0, _db["default"])(MONGODB_URI);
app.use(_express["default"]["static"](_path["default"].join(__dirname, "../../client/build")));
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].json());
app.use((0, _cors["default"])());
app.use("/api/recipe", (0, _recipe["default"])());
app.use("/api/search", (0, _search["default"])());
app.use("/api/statistics", (0, _statistics["default"])());
app.get("*", function (req, res) {
  res.sendFile(_path["default"].join(__dirname, "../../client/build/index.html"));
});
app.listen(PORT, function () {
  console.log("Application is running on port ".concat(PORT));
});
var _default = app;
exports["default"] = _default;
//# sourceMappingURL=index.js.map