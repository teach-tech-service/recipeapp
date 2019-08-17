"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.redisClient = exports["default"] = void 0;

var _redis = _interopRequireDefault(require("redis"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var redisClient;
exports.redisClient = redisClient;

var _default = function _default(REDIS_PORT, REDIS_HOST) {
  exports.redisClient = redisClient = _redis["default"].createClient(REDIS_PORT, REDIS_HOST);
};

exports["default"] = _default;
//# sourceMappingURL=redis.js.map