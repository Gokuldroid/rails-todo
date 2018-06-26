import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
    didInsertElement() {
        this._super(...arguments);
        let _this = this;
        
        if (Ember.isEmpty(this.get('startdate'))) {
            this.set('startdate', new Date());
        }

        if (Ember.isEmpty(this.get('enddate'))) {
            this.set('enddate', new Date());
        }

        this.$().find('.form-control').daterangepicker({
            singleDatePicker: this.get('singleDatePicker'),
            timePicker: this.get('timePicker'),
            showDropdowns: true,
            locale: {
                format: 'MM/DD/YYYY hh:mm a'
            }
        }, function (startdate, enddate, label) {
            _this.set('startdate', new Date(startdate));
            _this.set('enddate', new Date(enddate));
            console.log(startdate);
        });
    }
});
