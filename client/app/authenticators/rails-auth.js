import Base from 'ember-simple-auth/authenticators/base';
import RSVP from 'rsvp';
import Ember from 'ember';

export default Base.extend({
    restore(data) {
        return RSVP.resolve({ access_token: 'asdasdao2o3o12o' });
    },
    authenticate(username, password) {
        return new Promise((resolve, reject) => {
            if (username == 'gokul') {
                Ember.run(null, resolve, { access_token: 'asdasdao2o3o12o' });
            } else {
                Ember.run(null, reject, { error: 'invalid credentails' });
            }
        });
    },
    invalidate(data) {
        return RSVP.resolve();
    }
});