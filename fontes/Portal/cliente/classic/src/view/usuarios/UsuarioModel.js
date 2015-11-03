/**
 * Created by breno on 06/10/15.
 */
Ext.define('Admin.view.usuarios.UsuarioModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Ext.data.Store',
        'Ext.data.field.Integer',
        'Ext.data.field.String',
        'Ext.data.field.Boolean',
        'Admin.view.dashboard.BasicModel'
    ],

    alias: 'viewmodel.usuarios',

    stores: {
        usuarios: {

            model: 'Admin.view.dashboard.BasicModel',
            page: 30,
            remoteFilter: true,
            proxy: {
                type: 'rest',
                url: '/usuario',
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
            autoLoad: true,
            filters: [
                {
                    property: 'email',
                    operator: 'like',
                    value: '{emailfilter.value}'
                },
                {
                    property: 'login',
                    operator: 'like',
                    value: '{loginfilter.value}'
                },
                {
                    property: 'cpf',
                    operator: 'like',
                    value: '{cpffilter.value}'
                }
            ]
        }
    }
});