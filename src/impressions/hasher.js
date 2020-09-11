import murmur from '../engine/engine/murmur3';

const UNKNOWN = 'UNKNOWN';

function _buildKey(impression) {
  return `${_unknownIfNull(impression.keyName)}
    :${_unknownIfNull(impression.feature)}
    :${_unknownIfNull(impression.treatment)}
    :${_unknownIfNull(impression.label)}
    :${_zeroIfNull(impression.changeNumber)}`;
}

function _unknownIfNull(s) {
  return s ? s : UNKNOWN;
}

function  _zeroIfNull(l) {
  return l ? l : 0;
}

function hashImpression32(impression) {
  return impression ? murmur.hash(_buildKey(impression)).toString() : null;
}

function hashImpression128(impression) {
  return impression ? murmur.hash128(_buildKey(impression)).substring(0, 16) : null;
}

export default {
  hashImpression32,
  hashImpression128,
};