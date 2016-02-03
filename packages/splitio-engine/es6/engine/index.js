/* @flow */ 'use strict';

let bucket = require('./utils').bucket;
let log = require('debug')('splitio-engine');

let engine = {
  /**
   * Get the treatment name given a key, a seed, and the percentage of each treatment.
   */
  getTreatment(key /*: string */, seed /*: number */, treatments /*: Treatments */) /*: string */ {
    let b = bucket(key, seed);
    let treatment = treatments.getTreatmentFor(b);

    log(`[engine] bucket ${b} for ${key} using seed ${seed} - treatment ${treatment}`);

    return treatment;
  }
};

module.exports = engine;