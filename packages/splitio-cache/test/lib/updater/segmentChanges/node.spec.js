'use strict';

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
Copyright 2016 Split Software

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
**/

// Minimal settings required
require('@splitsoftware/splitio-utils/lib/settings').configure({
  core: {
    authorizationKey: 'asd'
  }
});

var storage = require('../../../../lib/storage');

// mock list of segments to be fetched
storage.splits.getSegments = function () {
  return new _set2.default(['segment_1', 'segment_2', 'segment_3']);
};

var segmentChangesUpdater = require('../../../../lib/updater/segmentChanges');

var tape = require('tape');

tape('UPDATER SEGMENT CHANGES / without backend it should not fail', function (assert) {
  segmentChangesUpdater().then(function (storage) {
    assert.equal([].concat((0, _toConsumableArray3.default)(storage.segments.segmentNames())).length, 0);
    assert.end();
  });
});