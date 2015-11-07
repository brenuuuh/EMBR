Ext.define('Admin.view.dashboard.DashboardModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Ext.data.Store',
        'Ext.data.field.Integer',
        'Ext.data.field.String',
        'Ext.data.field.Boolean',
        'Admin.view.dashboard.BasicModel'
    ],


    alias: 'viewmodel.dashboard',


    stores: {

        endereco: {

            model: 'Admin.view.dashboard.BasicModel',

            proxy: {
                type: 'rest',
                url: '/usuario/userLogado',
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
        },
        autoLoad: true

    }


});
