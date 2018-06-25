import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
    navArray: [],
    pageObserver: Ember.observer('pagination.page', function () {
        this._setNavigation();
    }),
    actions: {
        navigatePage(page) {
            this.set('pagination.page', page);
            this.attrs['on-page-change'](this.get('pagination'));
        }
    },
    _setNavigation(){
        let pagination = this.get('pagination');
        let newNavArray = [];
        if (pagination.page != 1) {
            newNavArray.push({ name: 'First', page: 1 });
        }
        let low = Math.max(pagination.page - 2, 1);
        let high = Math.min(pagination.page + 2, pagination.total_pages);
        for (let itr = low; itr <= high; itr++) {
            newNavArray.push({name : itr , page : itr});
        }
        if (pagination.page != pagination.total_pages) {
            newNavArray.push({name : 'Last',page: pagination.total_pages});
        }
        this.set('navArray',newNavArray);
    },
    didInsertElement() {
        this._super(...arguments);
        this._setNavigation();
    }
});
