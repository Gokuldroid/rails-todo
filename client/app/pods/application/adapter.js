import DS from 'ember-data';

export default DS.RESTAdapter.extend({
    session: Ember.inject.service(),
    namespace: '/api',
    headers: Ember.computed('session.data.authenticated.auth_token', function () {
        let headers = {};
        const authToken = this.get('session.data.authenticated.auth_token');
        if (authToken) {
            headers['Authorization'] = authToken;
        }
        console.log(headers);
        console.log(this.get('session'));
        return headers;
    })
});
