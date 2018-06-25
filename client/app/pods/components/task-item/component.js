import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
    actions :{
        delete(){
            let task = this.get('task');
            task.deleteRecord();
            task.save().then(()=>{
                this.attrs['on-delete']();
            });
        }
    },
    task_border : Ember.computed('task.done_state',function(){
        let done_state = this.get('task.done_state');
        switch (done_state) {
            case 1: return null
            case 2: return 'border border-warning';
            case 3: return 'border border-success bg-light';
        }
    })
});
