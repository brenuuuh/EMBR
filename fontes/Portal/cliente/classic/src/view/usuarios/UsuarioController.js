/**
 * Created by breno on 06/10/15.
 */
Ext.define('Admin.view.usuarios.UsuarioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.usuarios',

    onCheckAdm: function(check, rowIdx, checked){

        var record = check.up('grid').getStore().getAt(rowIdx);


        if(checked === true) {

            Ext.Ajax.request({
                url: '/usuario/' + record.get('_id'),
                method: 'PUT',
                params: {
                    tipo: 1
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
        else{
            Ext.Ajax.request({
                url: '/usuario/' + record.get('_id'),
                method: 'PUT',
                params: {
                    tipo: 2
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
    }

});