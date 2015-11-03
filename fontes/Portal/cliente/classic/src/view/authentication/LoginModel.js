/**
 * Created by breno on 23/09/15.
 */
Ext.define('Admin.view.authentication.LoginModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.authentication',
    requires: ['Padrao.model.BasicModel'],
    stores: {
        login: {
            model: 'Padrao.model.BasicModel',
            pageSize: 30,
            remoteSort: true,
            proxy: {
                type: 'rest',
                url: 'usuario',
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
    },
    data: {
        nome: '',
        dataNasc: '',
        dataInclusao: '',
        dataAlteracao: '',
        senha: '',
        cpf : '',
        email    : '',
        login: '',
        persist: false,
        agrees : false
    }

});