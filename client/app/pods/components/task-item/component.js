import Component from '@ember/component';

export default Component.extend({
    actions :{
        delete(){
            let task = this.get('task');
            task.deleteRecord();
            task.save().then(()=>{
                this.attrs['on-delete']();
            });
        }
    }
});
