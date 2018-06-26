import { helper } from '@ember/component/helper';

export function dateFormat(params) {
  return params && params[0] && moment(params[0]).format('MMMM Do YYYY, h:mm:ss a');
}

export default helper(dateFormat);
