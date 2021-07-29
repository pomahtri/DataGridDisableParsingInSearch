/**
* DevExtreme (cjs/ui/scheduler/timezones/utils.timezones_data.js)
* Version: 21.2.0
* Build date: Thu Jul 29 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;

var _query = _interopRequireDefault(require("../../../data/query"));

var _errors = _interopRequireDefault(require("../../../core/errors"));

var _timezones_data = _interopRequireDefault(require("./timezones_data"));

var _math = require("../../../core/utils/math");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getConvertedUntils = function getConvertedUntils(value) {
  return value.split('|').map(function (until) {
    if (until === 'Infinity') {
      return null;
    }

    return parseInt(until, 36) * 1000;
  });
};

var parseTimezone = function parseTimezone(timeZoneConfig) {
  var offsets = timeZoneConfig.offsets;
  var offsetIndices = timeZoneConfig.offsetIndices;
  var untils = timeZoneConfig.untils;
  var offsetList = offsets.split('|').map(function (value) {
    return parseInt(value);
  });
  var offsetIndexList = offsetIndices.split('').map(function (value) {
    return parseInt(value);
  });
  var dateList = getConvertedUntils(untils).map(function (accumulator) {
    return function (value) {
      return accumulator += value;
    };
  }(0));
  return {
    offsetList: offsetList,
    offsetIndexList: offsetIndexList,
    dateList: dateList
  };
};

var TimeZoneCache = /*#__PURE__*/function () {
  function TimeZoneCache() {
    this.map = new Map();
  }

  var _proto = TimeZoneCache.prototype;

  _proto.tryGet = function tryGet(id) {
    if (!this.map.get(id)) {
      var config = timeZoneDataUtils.getTimezoneById(id);

      if (!config) {
        return false;
      }

      var timeZoneInfo = parseTimezone(config);
      this.map.set(id, timeZoneInfo);
    }

    return this.map.get(id);
  };

  return TimeZoneCache;
}();

var tzCache = new TimeZoneCache();
var timeZoneDataUtils = {
  _tzCache: tzCache,
  _timeZones: _timezones_data.default.zones,
  getDisplayedTimeZones: function getDisplayedTimeZones(timestamp) {
    var _this = this;

    var timeZones = this._timeZones.map(function (timezone) {
      var timeZoneInfo = parseTimezone(timezone);

      var offset = _this.getUtcOffset(timeZoneInfo, timestamp);

      var title = "(GMT ".concat(_this.formatOffset(offset), ") ").concat(_this.formatId(timezone.id));
      return {
        offset: offset,
        title: title,
        id: timezone.id
      };
    });

    return (0, _query.default)(timeZones).sortBy('offset').toArray();
  },
  formatOffset: function formatOffset(offset) {
    var hours = Math.floor(offset);
    var minutesInDecimal = offset - hours;
    var signString = (0, _math.sign)(offset) >= 0 ? '+' : '-';
    var hoursString = "0".concat(Math.abs(hours)).slice(-2);
    var minutesString = minutesInDecimal > 0 ? ":".concat(minutesInDecimal * 60) : ':00';
    return signString + hoursString + minutesString;
  },
  formatId: function formatId(id) {
    return id.split('/').join(' - ').split('_').join(' ');
  },
  getTimezoneById: function getTimezoneById(id) {
    if (!id) {
      return;
    }

    var tzList = this._timeZones;

    for (var i = 0; i < tzList.length; i++) {
      var currentId = tzList[i]['id'];

      if (currentId === id) {
        return tzList[i];
      }
    }

    _errors.default.log('W0009', id);

    return;
  },
  getTimeZoneOffsetById: function getTimeZoneOffsetById(id, timestamp) {
    var timeZoneInfo = tzCache.tryGet(id);
    return timeZoneInfo ? this.getUtcOffset(timeZoneInfo, timestamp) : undefined;
  },
  getTimeZoneDeclarationTuple: function getTimeZoneDeclarationTuple(id, year) {
    var timeZoneInfo = tzCache.tryGet(id);
    return timeZoneInfo ? this.getTimeZoneDeclarationTupleCore(timeZoneInfo, year) : [];
  },
  getTimeZoneDeclarationTupleCore: function getTimeZoneDeclarationTupleCore(timeZoneInfo, year) {
    var offsetList = timeZoneInfo.offsetList;
    var offsetIndexList = timeZoneInfo.offsetIndexList;
    var dateList = timeZoneInfo.dateList;
    var tupleResult = [];

    for (var i = 0; i < dateList.length; i++) {
      var currentDate = dateList[i];
      var currentYear = new Date(currentDate).getFullYear();

      if (currentYear === year) {
        var offset = offsetList[offsetIndexList[i + 1]];
        tupleResult.push({
          date: currentDate,
          offset: -offset / 60
        });
      }

      if (currentYear > year) {
        break;
      }
    }

    return tupleResult;
  },
  getUtcOffset: function getUtcOffset(timeZoneInfo, dateTimeStamp) {
    var offsetList = timeZoneInfo.offsetList;
    var offsetIndexList = timeZoneInfo.offsetIndexList;
    var dateList = timeZoneInfo.dateList;
    var infinityUntilCorrection = 1;
    var lastIntervalStartIndex = dateList.length - 1 - infinityUntilCorrection;
    var index = lastIntervalStartIndex;

    while (index >= 0 && dateTimeStamp < dateList[index]) {
      index--;
    }

    var offset = offsetList[offsetIndexList[index + 1]];
    return -offset / 60 || offset;
  }
};
var _default = timeZoneDataUtils;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
