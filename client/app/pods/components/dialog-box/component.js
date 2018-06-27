import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
    actions: {
        buttonEvent(event, button) {
            this.set('dialogBoxModel.isOpen',!this.get('dialogBoxModel.eventListener')(event, button));
        },
        close() {
            this.set('dialogBoxModel.isOpen', false);
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