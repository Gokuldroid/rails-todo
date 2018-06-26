import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({

    loginRoute: Ember.on('activate', function(){
        if(this.get('session.isAuthenticated')){
            this.transitionTo('/tasks');
        }
    })
});
