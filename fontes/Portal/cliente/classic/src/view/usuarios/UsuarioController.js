/**
 * Created by breno on 06/10/15.
 */
Ext.define('Admin.view.usuarios.UsuarioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.usuarios',

    onCheckAdm: function(check, rowIdx, checked){

        var record = check.up('grid').getStore().getAt(rowIdx);



        Ext.Ajax.request({
            url: '/usuario/' + record.get('_id'),
            method: 'PUT',
            params: {
                admin: checked
            },
            success: function (response) {
                var result = Ext.decode(response.responseText);
                console.log(result)
            },
            failure: function (response) {
                var result = Ext.decode(response.responseText);
                console.log(result)
            }
        });


    },
    onClickNovoUsuario: function (button, e, eOpts) {


        Ext.create('Admin.view.usuarios.NovoUsuario');


    },
    cadastrarUsuario: function (btn, e, eOpts) {

        var me = this;

        var form = btn.up('form');

        if (form.getForm().isValid()) {
            Ext.Ajax.request({
                url: '/usuario/novo',
                method: 'POST',
                params: form.getValues(),
                success: function (response) {
                    Ext.Msg.alert('Salvo', 'Usuário salvo com sucesso.');
                    btn.up('window').close();
                    Ext.ComponentQuery.query('#gridUsuarios')[0].getStore().load();

                },
                failure: function (response) {

                    var objRes = JSON.parse(response.responseText);

                    if (objRes.tipo == 0) {
                        Ext.Msg.alert('Usuário já cadastrado', 'Caso esqueceu sua senha, favor entrar em esqueceu sua senha.');
                    } else {
                        Ext.Msg.alert('Erro ao cadastrar', 'Favor verificar seus dados.');

                    }
                }
            });
        }
    },
    onTipoSelect: function (combo) {
        //Fazer o q tem q fazer.
        var record = combo.getWidgetRecord();




        Ext.Ajax.request({
            url: '/usuario/' + record.get('_id'),
            method: 'PUT',
            params: {
                tipo: combo.getSelection().id
            },
            success: function (response) {
                var result = Ext.decode(response.responseText);
                console.log(result)
            },
            failure: function (response) {
                var result = Ext.decode(response.responseText);
                console.log(result)
            }
        });


    }


});