"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchRecipe = searchRecipe;

var _recipe = _interopRequireDefault(require("../models/recipe"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function searchRecipe(_x, _x2) {
  return _searchRecipe.apply(this, arguments);
}

function _searchRecipe() {
  _searchRecipe = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var allowParameters, matchObj, i, countRows, filter;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            allowParameters = ["cuisine", "term", "allergens", "difficulty"];
            matchObj = {};

            if (!req.query.page) {
              req.query.page = 1;
            }

            for (i = 0; i < allowParameters.length; i++) {
              if (req.query[allowParameters[i]] && req.query[allowParameters[i]] !== "") {
                if (allowParameters[i] === "allergens") {
                  matchObj[allowParameters[i]] = {
                    $elemMatch: {
                      name: req.query[allowParameters[i]]
                    }
                  };
                } else if (allowParameters[i] === "term") {
                  matchObj = _objectSpread({}, matchObj, {
                    $or: [{
                      name: new RegExp(req.query["term"], "igm")
                    }, {
                      description: new RegExp(req.query["term"], "igm")
                    }, {
                      cuisine: new RegExp(req.query["term"], "igm")
                    }]
                  });
                } else {
                  matchObj[allowParameters[i]] = req.query[allowParameters[i]];
                }
              }
            }

            countRows =
            /*#__PURE__*/
            function () {
              var _ref = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee() {
                var count;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _recipe["default"].countDocuments(matchObj);

                      case 2:
                        count = _context.sent;
                        return _context.abrupt("return", count);

                      case 4:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function countRows() {
                return _ref.apply(this, arguments);
              };
            }();

            filter =
            /*#__PURE__*/
            function () {
              var _ref2 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee2() {
                var filteredRecipes;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return _recipe["default"].aggregate([{
                          $match: matchObj
                        }, {
                          $sort: {
                            createdAt: -1
                          }
                        }, {
                          $skip: (Number(req.query.page) - 1) * 10
                        }, {
                          $limit: 10
                        }]);

                      case 2:
                        filteredRecipes = _context2.sent;
                        return _context2.abrupt("return", filteredRecipes);

                      case 4:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function filter() {
                return _ref2.apply(this, arguments);
              };
            }();

            Promise.all([countRows(), filter()]).then(function (result) {
              res.send({
                numberOfRows: result[0],
                filteredRecipes: result[1]
              });
            });

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _searchRecipe.apply(this, arguments);
}
//# sourceMappingURL=search.js.map