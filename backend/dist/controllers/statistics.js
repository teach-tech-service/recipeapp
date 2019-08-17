"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNumberOfRecipes = getNumberOfRecipes;
exports.getCuisines = getCuisines;
exports.getDifficulty = getDifficulty;

var _recipe = _interopRequireDefault(require("../models/recipe"));

var _groupBy = require("../helpers/groupBy");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getNumberOfRecipes(_x, _x2) {
  return _getNumberOfRecipes.apply(this, arguments);
}

function _getNumberOfRecipes() {
  _getNumberOfRecipes = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var recipes, recipeWithDates, i, count, k, isInside, _k, weekBehind, arr, _i;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _recipe["default"].find({}).sort({
              createdAt: 1
            });

          case 2:
            recipes = _context.sent;
            recipeWithDates = [];

            for (i = 0; i < recipes.length; i++) {
              count = 1;

              for (k = 0; k < recipes.length; k++) {
                if (k !== i && recipes[i].createdAt >= recipes[k].createdAt) {
                  count++;
                }
              }

              isInside = false;

              for (_k = 0; _k < recipeWithDates.length; _k++) {
                if (recipes[i].createdAt.getDate() == recipeWithDates[_k].date.getDate() && recipes[i].createdAt.getMonth() == recipeWithDates[_k].date.getMonth() && recipes[i].createdAt.getFullYear() == recipeWithDates[_k].date.getFullYear()) {
                  isInside = true;
                }
              }

              if (!isInside) {
                recipeWithDates.push({
                  date: recipes[i].createdAt,
                  count: count
                });
              }
            }

            weekBehind = new Date();
            weekBehind.setDate(weekBehind.getDate() - Number(req.params.numberOfDays));
            arr = [];

            for (_i = recipeWithDates.length - 1; _i >= 0; _i--) {
              if (recipeWithDates[_i].date.getMonth() == weekBehind.getMonth() && recipeWithDates[_i].date.getFullYear() == weekBehind.getFullYear() && recipeWithDates[_i].date.getDate() < weekBehind.getDate() || recipeWithDates[_i].date.getMonth() < weekBehind.getMonth() && recipeWithDates[_i].date.getFullYear() <= weekBehind.getFullYear()) {
                recipeWithDates.splice(_i, 1);
              }
            }

            res.send({
              recipes: recipeWithDates
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getNumberOfRecipes.apply(this, arguments);
}

function getCuisines(_x3, _x4) {
  return _getCuisines.apply(this, arguments);
}

function _getCuisines() {
  _getCuisines = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var recipes;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _groupBy.groupByWithCount)("cuisine");

          case 2:
            recipes = _context2.sent;
            res.send({
              recipes: recipes
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getCuisines.apply(this, arguments);
}

function getDifficulty(_x5, _x6) {
  return _getDifficulty.apply(this, arguments);
}

function _getDifficulty() {
  _getDifficulty = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var recipes;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _groupBy.groupByWithCount)("difficulty");

          case 2:
            recipes = _context3.sent;
            res.send({
              recipes: recipes
            });

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getDifficulty.apply(this, arguments);
}
//# sourceMappingURL=statistics.js.map