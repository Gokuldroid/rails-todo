import Controller from '@ember/controller';
import dialogBoxModel from '../components/dialog-box/dialog-box-model';


export default Controller.extend({
    actions: {
        newTask() {
            this._createNewTask();
        }
    },
    _createNewTask() {
        let buttons = [{ text: 'Create', style: 'btn-primary', event: 'create' }, { text: 'Cancel', style: 'btn-link', event: 'cancel' }]
        let box = dialogBoxModel.create({
            title: 'Create task',
            buttons,
            eventListener: function (event, button) {
                console.log('event' + event + button);
            }
        });
        this.set('newTaskModel',box);
        box.open();
    }
});
