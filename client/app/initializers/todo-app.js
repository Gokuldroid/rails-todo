import Ember from "ember";

export function initialize(application) {
  application.inject('route', 'rails_ajax', 'service:rails-ajax');
  application.inject('route', 'rails_ajax', 'service:session');
  
  application.inject('controller', 'rails_ajax', 'service:rails-ajax');
  application.inject('controller', 'session', 'service:session');
}

export default {
  initialize
};
