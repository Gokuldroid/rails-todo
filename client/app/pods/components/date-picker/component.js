import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
    didInsertElement() {
        this._super(...arguments);
        let _this = this;
        
        let isSingleDatePicker = this.get('singleDatePicker');

        if (Ember.isEmpty(this.get('startdate'))) {
            this.set('startdate', new Date());
        }

        if (!isSingleDatePicker && Ember.isEmpty(this.get('enddate'))) {
            this.set('enddate', new Date());
        }

        let options = {
            singleDatePicker: isSingleDatePicker,
            timePicker: this.get('timePicker'),
            showDropdowns: true,
            startDate : moment(this.get('startdate')), 
            locale: {
                format: 'MM/DD/YYYY hh:mm a'
            }
        };

        if(!isSingleDatePicker){
            options.endDate = moment(this.get('enddate'))
        }

        this.$().find('.form-control').daterangepicker(options, function (startdate, enddate, label) {
            _this.set('startdate', new Date(startdate));
            _this.set('enddate', new Date(enddate));
        });
    }
});
