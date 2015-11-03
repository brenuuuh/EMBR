/**
 * Created by lorena on 13/10/15.
 */
Ext.define("Admin.view.usuarios.NovoUsuario", {
    extend: 'Ext.window.Window',

    xtype: 'novousuario',

    controller: 'usuarios',
    bodyPadding: 10,
    title: 'Cadastro de novo usuário',
    autoShow: true,
    width: 500,
    height: 600,
    modal: true,

    items: [
        {
            xtype: 'form',
            reference: 'form',
            items: [
                {
                    xtype: 'textfield',
                    style: 'height: 5.25%; width: 65.25%;margin-left: 15%;margin-top: 5%;',
                    itemId: 'nome',
                    height: 55,
                    hideLabel: true,
                    allowBlank : false,
                    name: 'nome',
                    emptyText: 'Seu nome'

                },
                {
                    xtype: 'textfield',
                    style: 'height: 5.25%; width: 65.25%;margin-left: 15%;margin-top: 5%;',
                    itemId: 'email',
                    height: 55,
                    hideLabel: true,
                    allowBlank : false,
                    name: 'email',
                    emptyText: 'user@example.com',
                    vtype: 'email'
                },
                {
                    xtype: 'textfield',
                    style: 'height: 5.25%; width: 65.25%;margin-left: 15%;margin-top: 5%;',
                    itemId: 'cpf',
                    height: 55,
                    hideLabel: true,
                    allowBlank : false,
                    name: 'cpf',
                    emptyText: '999.999.99-99'
                },
                {
                    xtype: 'textfield',
                    style: 'height: 5.25%; width: 65.25%;margin-left: 15%;',
                    cls: 'auth-textbox',
                    height: 55,
                    hideLabel: true,
                    emptyText: 'Senha',
                    inputType: 'password',
                    name: 'senha',
                    allowBlank : false

                },
                {
                    xtype: 'datefield',
                    style: 'height: 5.25%; width: 65.25%;margin-left: 15%;margin-top: 5%;',
                    itemId: 'dataNasc',
                    type: 'date',
                    height: 55,
                    hideLabel: true,
                    allowBlank : false,
                    name: 'dataNasc',
                    emptyText: 'dataNasc'
                },
                {
                    xtype: 'button',
                    style: 'height: 20.25%; width: 45.25%;margin-left: 25%;',
                    ui: 'soft-blue',
                    text: 'Cadastrar',
                    listeners: {
                        click: 'cadastrarUsuario'
                    }

                }
            ]
        }
    ]

});