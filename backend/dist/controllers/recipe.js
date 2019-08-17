"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRecipeById = getRecipeById;
exports.getRecipePage = getRecipePage;
exports.getRecipeInfo = getRecipeInfo;
exports.postRecipe = postRecipe;

var _recipe = _interopRequireDefault(require("../models/recipe"));

var _mongoose = require("mongoose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ObjectId = _mongoose.Types.ObjectId;

function getRecipeById(_x, _x2) {
  return _getRecipeById.apply(this, arguments);
}

function _getRecipeById() {
  _getRecipeById = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    var id, recipe;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;

            if (id) {
              _context5.next = 3;
              break;
            }

            return _context5.abrupt("return", res.status(400).send({}));

          case 3:
            _context5.next = 5;
            return _recipe["default"].findOne({
              _id: new ObjectId(id)
            });

          case 5:
            recipe = _context5.sent;

            if (recipe) {
              _context5.next = 8;
              break;
            }

            return _context5.abrupt("return", res.status(404).send({}));

          case 8:
            res.send({
              recipe: recipe
            });

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _getRecipeById.apply(this, arguments);
}

function getRecipePage(req, res) {
  var getRecipePage =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var recipes;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _recipe["default"].aggregate([{
                $skip: (Number(req.params.page) - 1) * 10
              }, {
                $limit: 10
              }]);

            case 2:
              recipes = _context.sent;
              return _context.abrupt("return", recipes);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function getRecipePage() {
      return _ref.apply(this, arguments);
    };
  }();

  var getNumberOfRecipes =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var numberofRecipes;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _recipe["default"].countDocuments({});

            case 2:
              numberofRecipes = _context2.sent;
              return _context2.abrupt("return", numberofRecipes);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function getNumberOfRecipes() {
      return _ref2.apply(this, arguments);
    };
  }();

  Promise.all([getRecipePage(), getNumberOfRecipes()]).then(function (result) {
    if (result[0].length === 0) {
      return res.status(404).send({
        numberOfRecipes: result[1],
        currentPage: req.params.page
      });
    }

    res.send({
      recipes: result[0],
      numberOfRecipes: result[1],
      currentPage: req.params.page
    });
  });
}

function getRecipeInfo(req, res) {
  var getDistinctAllergens =
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var distinctAllergens;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _recipe["default"].aggregate([{
                $unwind: "$allergens"
              }, {
                $group: {
                  _id: "$allergens.name",
                  count: {
                    $sum: 1
                  }
                }
              }, {
                $project: {
                  _id: 0,
                  name: "$_id",
                  count: 1
                }
              }]);

            case 2:
              distinctAllergens = _context3.sent;
              return _context3.abrupt("return", distinctAllergens);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function getDistinctAllergens() {
      return _ref3.apply(this, arguments);
    };
  }();

  var getDistinctCuisine =
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var distinctCuisine;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _recipe["default"].aggregate([{
                $group: {
                  _id: "$cuisine",
                  count: {
                    $sum: 1
                  }
                }
              }, {
                $project: {
                  _id: 0,
                  name: "$_id",
                  count: 1
                }
              }]);

            case 2:
              distinctCuisine = _context4.sent;
              return _context4.abrupt("return", distinctCuisine);

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function getDistinctCuisine() {
      return _ref4.apply(this, arguments);
    };
  }();

  Promise.all([getDistinctAllergens(), getDistinctCuisine()]).then(function (result) {
    res.send({
      allergens: result[0],
      cuisine: result[1]
    });
  });
}

function postRecipe(_x3, _x4) {
  return _postRecipe.apply(this, arguments);
}

function _postRecipe() {
  _postRecipe = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(req, res) {
    var recipe;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            console.log(req.body.recipe);
            recipe = new _recipe["default"](req.body.recipe);
            recipe.save(function (err) {
              if (err) {
                console.log(err);
                return res.status(400).send({
                  err: err
                });
              }

              res.send({});
            });

          case 3:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _postRecipe.apply(this, arguments);
}
//# sourceMappingURL=recipe.js.map