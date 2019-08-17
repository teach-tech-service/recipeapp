"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _recipe = _interopRequireDefault(require("../models/recipe"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(URI) {
  _mongoose["default"].connect(URI, {
    useNewUrlParser: true
  }, function (err) {
    if (err) {
      throw new Error("Error while trying to connect MongoDB ".concat(err));
    }

    console.log("Connected to MongoDB on port ".concat(URI));

    _recipe["default"].deleteMany({}).then(function () {
      _fs["default"].readFile(_path["default"].join(__dirname, "../data/recipes.json"), function (err, data) {
        if (err) {
          console.log("[MONGODB] Problem with recipes load mock data from file");
        }

        var recipes = JSON.parse(data);

        for (var i = 0; i < recipes.length; i++) {
          var _date = new Date();

          _date.setDate(_date.getDate() - i);

          recipes[i].createdAt = _date;
        }

        var date = new Date();
        date.setDate(date.getDate() - 5);
        recipes[1].createdAt = date;
        recipes[2].createdAt = date;

        _recipe["default"].insertMany(recipes);
      });
    });
  });
};

exports["default"] = _default;
//# sourceMappingURL=db.js.map