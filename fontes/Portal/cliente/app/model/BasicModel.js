/**
 * Created by breno on 23/09/15.
 */
Ext.define('Padrao.model.BasicModel', {
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