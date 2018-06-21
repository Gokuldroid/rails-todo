import Controller from '@ember/controller';
import Ember, {
    isBlank
} from 'ember';
import EmberObject, {
    computed,
    observer
} from '@ember/object';

export default Controller.extend({
    actions: {
        logout() {
            this.get('session').invalidate();
            this.transitionToRoute('/login');
        }
    }
});
