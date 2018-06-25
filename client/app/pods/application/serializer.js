import DS from 'ember-data';

export default DS.RESTSerializer.extend({

    extractMeta(store, typeClass, payload) {
        let meta = payload.meta;
        delete payload.meta;
        return meta;
    }
});
