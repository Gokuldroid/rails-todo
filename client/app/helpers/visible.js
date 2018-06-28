import { helper } from '@ember/component/helper';
import { isBlank } from '@ember/utils';

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
  return isBlank(params) ? 'invisible' : 'visible';
}

export default helper(visible);
