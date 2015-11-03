/**
 * Created by breno on 07/10/15.
 */
/**
 * Created by lorena on 03/08/15.
 */
Ext.define('Admin.view.eventos.EventosModel',{
    extend: 'Ext.app.ViewModel',
    requires: [
        'Ext.data.Store',
        'Ext.data.field.Integer',
        'Ext.data.field.String',
        'Ext.data.field.Boolean',
        'Admin.view.dashboard.BasicModel'
    ],

    alias: 'viewmodel.eventos',

    stores:{
        eventos: {
            model: 'Admin.view.dashboard.BasicModel',

            proxy: {
                type: 'rest',
                url: '/eventos',
                actionMethods: {
                    create: "POST", read: "GET", update: "PUT", destroy: "DELETE"
                },
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total',
                    idProperty: '_id',
                    successProperty: 'status'
                },
                writer: {
                    writeRecordId: false
                }
            },
            autoLoad: true
        }


    }

});
