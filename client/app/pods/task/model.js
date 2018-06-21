import DS from 'ember-data';

export default DS.Model.extend({
    description: DS.attr('string'),
    priority: DS.attr('number'),
    dead_line: DS.attr('date'),
    reminder_date: DS.attr('date'),
    done_state: DS.attr('number'),
    created_at: DS.attr('date'),
    updated_at: DS.attr('date')
});
