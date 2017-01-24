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

// @flow

'use strict';

const TaskFactory = require('../task');
const FromFeaturesUpdater = require('../updater/SplitChangesFromFeatures');

const OfflineFeatureProducer = (settings: Object, readiness: ReadinessGate, storage: SplitStorage): Startable => {
  const updater = FromFeaturesUpdater(settings, readiness, storage);
  const updaterTask = TaskFactory(updater, settings.scheduler.offlineRefreshRate);

  return updaterTask;
};

module.exports = OfflineFeatureProducer;
