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

const log = require('../../../utils/logger')('splitio-settings');
const isLocalStorageAvailable = require('../../../utils/localstorage/isAvailable');
const {
  LOCALHOST_MODE,
  STORAGE_MEMORY,
  STORAGE_LOCALSTORAGE
} = require('../../../utils/constants');

const ParseStorageSettings = settings => {
  let {
    mode,
    storage: {
      type = STORAGE_MEMORY,
      options = {},
      prefix
    },
  } = settings;

  if (prefix) {
    prefix += '.SPLITIO';
  } else {
    prefix = 'SPLITIO';
  }

  if (mode === LOCALHOST_MODE) return {
    type: STORAGE_MEMORY,
    prefix
  };

  // If an invalid storage type is provided OR we want to use LOCALSTORAGE and
  // it's not available, fallback into MEMORY
  if (type !== STORAGE_MEMORY && type !== STORAGE_LOCALSTORAGE ||
      type === STORAGE_LOCALSTORAGE && !isLocalStorageAvailable()) {
    type = STORAGE_MEMORY;
    log.warn('Invalid or unavailable storage. Fallbacking into MEMORY storage');
  }

  return {
    type,
    options,
    prefix
  };
};

module.exports = ParseStorageSettings;
