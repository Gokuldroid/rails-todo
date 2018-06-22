import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
    actions :{
        buttonEvent(event,button){
            this.get('dialogBoxModel.eventListener')(event,button);
        }
    },
    openObserver : Ember.observer('dialogBoxModel.isOpen',function(){
        if(this.get('dialogBoxModel.isOpen')){
            console.log(this);
            this.$().find('.modal').modal();
        }
    })
});