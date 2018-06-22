import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
    pagination  :{
        page : 1,
        page_size : 25,
        total_pages : 100,
    },

    pageObserver : Ember.observer('pagination.page',function(){

    }),
    actions :{ 
        navigatePage(){
            
        }
    }
});
