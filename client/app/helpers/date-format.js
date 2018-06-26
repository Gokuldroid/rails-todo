import { helper } from '@ember/component/helper';

export function dateFormat(params) {
  return params && params[0] && (params[0].toLocaleDateString() + ' ' + params[0].toLocaleTimeString());
}

export default helper(dateFormat);
