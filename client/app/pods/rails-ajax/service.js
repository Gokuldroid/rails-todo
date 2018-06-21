import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';


export default AjaxService.extend({
    session: Ember.inject.service(),
    namespace : '/api',
    headers: Ember.computed('session.authenticated.auth_token', {
        get() {
            let headers = {};
            const authToken = this.get('session.authenticated.auth_token');
            if (authToken) {
                headers['Authorization'] = authToken;
            }
            return headers;
        }
    })
});
