import { helper } from '@ember/component/helper';
import { isBlank } from '@ember/utils';

export function invisible(params, hash) {
  let condition = hash.condition || 'all';

  if (condition == 'all') {
    for (let index = 0; index < params.length; index++) {
      if (!params[index]) {
        return 'visible';
      }
    }
  } else {
    for (let index = 0; index < params.length; index++) {
      if (params[index]) {
        return 'invisible';
      }
    }
  }
  return !isBlank(params) ? 'invisible' : 'visible';
}

export default helper(invisible);
