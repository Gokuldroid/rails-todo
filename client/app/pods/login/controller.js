import Controller from '@ember/controller';
import Ember from 'ember';
import {
    computed,
    observer
} from '@ember/object';

const {
    isBlank 
} = Ember;

export default Controller.extend({
    session: Ember.inject.service('session'),
    actions : {
        login(){
            this.set('login_clicked',true);
            if(this.get('valid_username') && this.get('valid_password')){
                let { username, password } = this.getProperties('username', 'password');
                this.get('session').authenticate('authenticator:rails-auth', username, password)
                .then(()=>{
                    console.log('success')
                })
                .catch((reason) => {
                    console.log('failed')
                    this.set('login_error_msg', 'Invalid credentails');
                });
            }
        }
    },
    login_error : computed('username','password','login_clicked',function(){
        if(!this.get('login_clicked')) return null;
        if(!this.get('valid_username')) return "Username can't be empty";
        if(!this.get('valid_password')) return "Password can't be empty";
    }),
    valid_username : computed('username',function() {
        return !isBlank(this.get('username'));
    }),
    valid_password : computed('password',function(){
        return !isBlank(this.get('password'));
    })
});
