import Controller from '@ember/controller';
import dialogBoxModel from '../components/dialog-box/dialog-box-model';
import Ember from 'ember';


export default Controller.extend({
    filter: { priority: -1 },
    pagination: Ember.computed.alias('model.meta.pagination'),
    actions: {
        newTask() {
            this._createNewTask();
        },
        filterByPriority(priority) {
            this.set('filter.priority', priority);
            this._getTasks();
        },
        onTaskPageChange(pagination) {
            this.get('pagination', pagination);
            this._getTasks();
        },
        refreshModel(){
            this._getTasks();
        }
    },
    _createNewTask() {
        let buttons = [{ text: 'Create', style: 'btn-primary', event: 'create' }, { text: 'Cancel', style: 'btn-link', event: 'cancel' }]
        let task = this.get('store').createRecord('task', { priority: 3 })
        let box = dialogBoxModel.create({
            title: 'Create task',
            buttons,
            eventListener: function (event, button) {
                if (event == 'create') {
                    task.save();
                } else {
                    task.rollbackAttributes();
                }
            }
        });
        this.set('createTaskDialog', box);
        this.set('createTaskModal', task);
        box.open();
    },
    _getTasks() {
        let _this = this;
        let filter = this.get('filter');
        let pagination = Ember.getProperties(this.get('pagination'), 'page', 'per_page');
        this.get('store').query('task', {
            filter,
            pagination
        }).then(function (result) {
            _this.set('model', result);
        });
    }
});
