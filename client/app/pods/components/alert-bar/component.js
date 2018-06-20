import Component from '@ember/component';
import Ember from 'ember';
import { later } from '@ember/runloop';

const {
    isBlank,
    observer
} = Ember;

export default Component.extend({
    hide: observer('alertMsg', function () {
        if (!isBlank('alertMsg') && this.get('autoHide')) {
            later(this, () => { this.set('alertMsg', null) }, 3000)
        }
    })
});
