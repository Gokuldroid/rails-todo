import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import Ember from 'ember';


export default Route.extend(ApplicationRouteMixin,{
    loginRoute: Ember.on('activate', function(){
        if(!this.get('session.isAuthenticated')){
            this.transitionTo('/login');
        }else{
            this.transitionTo('/tasks');
        }
    })
});
