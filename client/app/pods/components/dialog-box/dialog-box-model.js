import Ember from 'ember';

export default Ember.Object.extend({
    title : null,
    buttons : null,
    eventListener : null,
    isOpen : false,
    open(){
        this.set('isOpen',true)
    },
    close(){
        this.set('isOpen',false);
    }
});
