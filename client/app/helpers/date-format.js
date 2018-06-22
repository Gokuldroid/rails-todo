import { helper } from '@ember/component/helper';

export function dateFormat(params) {
  return params && params[0] && params[0].toLocaleDateString("en-US");
}

export default helper(dateFormat);
