import Controller from '@ember/controller';
import dialogBoxModel from '../components/dialog-box/dialog-box-model';
import Ember from 'ember';


export default Controller.extend({
    filter: { priority: -1 },
    pagination: Ember.computed.alias('model.meta.pagination'),
    sort_by: 'dead_line',
    done_state: [1],

    hasTodoTasks: Ember.computed('done_state.[]', {
        get(key) {
            return this.get('done_state').includes(1);
        },
        set(key, value) {
            if (this.get('done_state').includes(1)) {
                this.get('done_state').removeObject(1);
            } else {
                this.get('done_state').pushObject(1);
            }
            return this.get('done_state').includes(1);
        }
    }),
    hasDoneTasks: Ember.computed('done_state.[]', {
        get(key) {
            return this.get('done_state').includes(2);
        },
        set(key, value) {
            if (this.get('done_state').includes(2)) {
                this.get('done_state').removeObject(2);
            } else {
                this.get('done_state').pushObject(2);
            }
            return this.get('done_state').includes(2);
        }
    }),
    hasArchieveTasks: Ember.computed('done_state.[]', {
        get(key) {
            return this.get('done_state').includes(3);
        },
        set(key, value) {
            if (this.get('done_state').includes(3)) {
                this.get('done_state').removeObject(3);
            } else {
                this.get('done_state').pushObject(3);
            }
            return this.get('done_state').includes(3);
        }
    }),
    emptyObserver: Ember.observer('done_state.[]', function () {
        if (Ember.isEmpty(this.get('done_state'))) {
            this.send('toggleParam', 'hasTodoTasks');
        }
    }),
    createTaskError : Ember.computed('saveClicked','createTaskModal.description',function(){
        if(this.get('saveClicked') && Ember.isEmpty(this.get('createTaskModal.description'))){
            return 'Description can\'t be empty';
        }
    }),
    actions: {
        newTask() {
            this._createNewTask();
        },
        filterByPriority(priority) {
            this.set('filter.priority', priority);
            this.set('pagination.page', 1);
            this._getTasks();
        },
        onTaskPageChange(pagination) {
            this.get('pagination', pagination);
            this._getTasks();
        },
        refreshModel() {
            this._getTasks();
        },
        toggleParam(param) {
            this.toggleProperty(param);
            this._getTasks();
            this.set('pagination.page', 1);
        },
        toggleSort(sort) {
            this.set('sort_by', sort);
            this._getTasks();
        },
        editTask(task) {
            this.set('saveClicked',true);
            this._openTaskModel(task);
        }
    },
    _createNewTask() {
        this.set('saveClicked',false);
        let task = this.get('store').createRecord('task', { priority: 3, done_state: 1,reminder_date : moment().add(1,'days'),dead_line : moment().add(2,'days')});
        this._openTaskModel(task);
    },
    _openTaskModel(task) {
        let _this = this;
        let title = task.get('isNew') ? 'Create' : 'Edit';
        let buttons = [{ text: task.get('isNew') ? 'Create' : 'Save', style: 'btn-primary', event: 'create' }, { text: 'Cancel', style: 'btn-link', event: 'cancel' }]
        let box = dialogBoxModel.create({
            title: `${title} task`,
            buttons,
            eventListener: function (event, button) {
                _this.set('saveClicked',true);
                if(!Ember.isEmpty(_this.get('createTaskError'))){
                    return false;
                }
                if (event == 'create') {
                    task.save().then(() => { _this._getTasks() });
                    return true;
                } else {
                    task.rollbackAttributes();
                    return true;
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
        let sort_by = this.get('sort_by');
        let done_state = JSON.stringify(this.get('done_state'));
        this.get('store').query('task', {
            filter,
            pagination,
            sort_by,
            done_state
        }).then(function (result) {
            _this.set('model', result);
        });
    }
});
