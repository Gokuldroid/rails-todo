import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
    actions: {
        buttonEvent(event, button) {
            this.get('dialogBoxModel.eventListener')(event, button);
        }
    },
    openObserver: Ember.observer('dialogBoxModel.isOpen', function () {
        if (this.get('dialogBoxModel.isOpen')) {
            this.$().find('> .modal').modal();
        } else {
            this.$().find('> .modal').modal('hide');
        }
    })
});