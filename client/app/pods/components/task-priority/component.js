import Component from '@ember/component';
import Ember from 'ember';
import dialogBoxModel from '../dialog-box/dialog-box-model';


export default Component.extend({
    tagName: 'span',
    codeVsColor: {
        1: 'bg-success',
        2: 'bg-primary',
        3: 'bg-secondary',
        4: 'bg-warning',
        5: 'bg-danger'
    },
    priorityColor: Ember.computed('task.priority', function () {
        return this.get('codeVsColor')[this.get('task.priority')];
    }),

    actions: {
        openPriorityDialog() {
            let box = dialogBoxModel.create({
                title: 'Priority',
                eventListener: function (event, button) {
                    
                }
            });
            this.set('priorityDialog', box);
            box.open();
        },
        changePriority(priority){
            let task = this.get('task')
            task.set('priority',priority);
            this.get('saveOnChange') && task.save();
            this.get('priorityDialog').close();
        }
    }

});
