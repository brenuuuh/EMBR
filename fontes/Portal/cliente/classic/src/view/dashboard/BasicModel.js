Ext.define('Admin.view.dashboard.BasicModel', {
    extend: 'Ext.data.Model',
    idProperty: '_id',
    fields: [
        {
            name: '_id',
            type: 'string'
        },
        {
            name: 'dataInclusao',
            type: 'date'
        },
        {
            name: 'dataAlteracao',
            type: 'date'
        }
    ]
});