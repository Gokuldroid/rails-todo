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
        return headers;
    }),
    normalizeQueryResponse(store, clazz, payload) {
        const result = this._super(...arguments);
        console.log(pagination);
        result.pagination = result.pagination || payload.pagination || {};
        console.log(result);
        return result;
    }

});
