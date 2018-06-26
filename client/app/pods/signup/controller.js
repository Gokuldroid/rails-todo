import Controller from '@ember/controller';
import { isValidEmail, minLength } from '../../utils/validation';
import { isBlank } from '@ember/utils';
import Ember from 'ember';

const {
    computed
} = Ember;
export default Controller.extend({
    signup_details: {},
    actions: {
        signup() {
            let _this = this;
            this.set('signup_clicked', true);
            let signup_details = this.get('signup_details');
            if (isBlank(this.get('input_error'))|| true) {
                this.get('rails_ajax').post('/signup', { data: signup_details })
                    .then((response) => {
                        this.get('session').authenticate('authenticator:rails-auth', signup_details.username, signup_details.password)
                        .then(()=>{
                            _this.transitionToRoute('/tasks');
                        })
                        .catch((reason) => {
                            _this.set('login_error_msg', 'Invalid credentails');
                        });
                    })
                    .catch((error) =>{
                        console.log(error);
                    });
            }
        }
    },

    input_error: computed('signup_details.username', 'signup_details.email', 'signup_details.password', 'signup_details.confirm_password', 'signup_clicked', function () {
        if (!this.get('signup_clicked')) return null;
        let signup_details = this.get('signup_details');
        if (!isValidEmail(signup_details.email)) return "Invalid email";
        if (!minLength(signup_details.username, 5)) return "Username should have atleast 5 chars";
        if (!minLength(signup_details.password, 5)) return "Password should have atleast 5 chars";
        if (signup_details.password != signup_details.confirm_password) return "Passwords should match";
        return null;
    })
});
