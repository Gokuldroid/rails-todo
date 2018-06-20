import Base from 'ember-simple-auth/authenticators/base';
import RSVP from 'rsvp';

export default Base.extend({
  restore(data) {
    console.log(data);
  },
  authenticate(username,password) {
    if(username == 'gokul'){
        return RSVP.resolve();
    }else{
        return RSVP.reject();
    }
  },
  invalidate(data) {
    console.log(data);
  }
});