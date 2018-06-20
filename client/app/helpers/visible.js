import { helper } from '@ember/component/helper';
import Ember from 'ember';

export function visible(params, hash) {
  let condition = hash.condition || 'all';
  if (condition == 'all') {
    for (let index = 0; index < params.length; index++) {
      if (!params[index]) {
        return 'invisible';
      }
    }
  } else {
    for (let index = 0; index < params.length; index++) {
      if (params[index]) {
        return 'visible';
      }
    }
  }
  return Ember.isBlank(params) ? 'invisible' : 'visible';
}

export default helper(visible);
