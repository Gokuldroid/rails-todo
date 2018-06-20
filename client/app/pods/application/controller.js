import Controller from '@ember/controller';
import Ember, {
    isBlank
} from 'ember';
import EmberObject, {
    computed,
    observer
} from '@ember/object';

export default Controller.extend({
    session: Ember.inject.service('session'),
    actions: {
        logout() {
            this.get('session').invalidate();
            this.transitionToRoute('/login');
        }
    }
});
