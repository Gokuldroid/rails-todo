import Base from 'ember-simple-auth/authenticators/base';
import { inject } from '@ember/service';

export default Base.extend({
    rails_ajax: inject(),
    session: inject(),
    restore(data) {
        return new Promise(function (resolve, reject) {
            resolve(data);
        });
    },
    authenticate(username, password) {
        return this.get('rails_ajax').post('/login', { data: { username, password } });
    },
    invalidate(data) {
        return new Promise(function (resolve, reject) {
            resolve(data);
        });
        // return this.get('rails_ajax').post('/logout', { data: { data } });
    }
});