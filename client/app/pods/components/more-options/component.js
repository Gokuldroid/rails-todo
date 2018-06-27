import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
    tagName : 'div',
    classNames : 'dropdown-task',
    dropdownOpen: false,
    didInsertElement() {
        this._super(...arguments);
        Ember.run.scheduleOnce('afterRender',this ,function(){
        
        });
    },
    actions :{ 
        toggleDropdown() {
            this.toggleProperty('dropdownOpen');
        }
    }
});
