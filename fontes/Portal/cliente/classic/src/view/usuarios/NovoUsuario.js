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
    height: 750,
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
                    height: 25,
                    hideLabel: true,
                    allowBlank : false,
                    name: 'nome',
                    emptyText: 'Seu nome'

                },
                {
                    xtype: 'textfield',
                    style: 'height: 5.25%; width: 65.25%;margin-left: 15%;margin-top: 5%;',
                    itemId: 'email',
                    height: 25,
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
                    height: 25,
                    hideLabel: true,
                    allowBlank : false,
                    name: 'cpf',
                    emptyText: '999.999.99-99',
                    plugins: 'textmask',
                    mask: '999.999.999-99',
                    validator: function(value) {

                        if(value) {
                            this.setValue(("00000000000" + value).slice(-11));
                        }

                        return true;

                    }
                },
                {
                    xtype: 'datefield',
                    style: 'height: 5.25%; width: 65.25%;margin-left: 15%;margin-top: 5%;',
                    itemId: 'dataNasc',
                    type: 'date',
                    height: 25,
                    hideLabel: true,
                    allowBlank : false,
                    name: 'dataNasc',
                    emptyText: 'dataNasc',
                    format :'d/m/Y',
                    altFormats:'d,m,Y|d.m.Y'
                },
                {
                    xtype: 'textfield',
                    style: 'height: 5.25%; width: 65.25%;margin-left: 15%;margin-top: 5%;',
                    itemId: 'logradouro',
                    height: 25,
                    hideLabel: true,
                    allowBlank : false,
                    name: 'logradouro',
                    emptyText: 'Rua, Avenida, Alameda'
                },
                {
                    xtype: 'textfield',
                    style: 'height: 5.25%; width: 65.25%;margin-left: 15%;margin-top: 5%;',
                    itemId: 'numero',
                    height: 25,
                    hideLabel: true,
                    allowBlank : false,
                    name: 'numero',
                    emptyText: 'Numero'
                },
                {
                    xtype: 'textfield',
                    style: 'height: 5.25%; width: 65.25%;margin-left: 15%;margin-top: 5%;',
                    itemId: 'cep',
                    height: 25,
                    minLength: 8,
                    maxLength: 8,
                    hideLabel: true,
                    allowBlank : false,
                    name: 'cep',
                    emptyText:'Cep',
                    plugins: 'textmask',
                    mask:'99.999-999'
                },
                {
                    xtype: 'textfield',
                    style: 'height: 5.25%; width: 65.25%;margin-left: 15%;margin-top: 5%;',
                    itemId: 'complemento',
                    height: 25,
                    hideLabel: true,
                    allowBlank : false,
                    name: 'complemento',
                    emptyText: 'Complemento'
                },
                {
                    xtype: 'textfield',
                    style: 'height: 5.25%; width: 65.25%;margin-left: 15%;margin-top: 5%;',
                    itemId: 'bairro',
                    height: 25,
                    hideLabel: true,
                    allowBlank : false,
                    name: 'bairro',
                    emptyText: 'Bairro'
                },
                {
                    xtype: 'textfield',
                    style: 'height: 5.25%; width: 65.25%;margin-left: 15%;margin-top: 5%;',
                    itemId: 'estado',
                    height: 25,
                    hideLabel: true,
                    allowBlank : false,
                    name: 'estado',
                    emptyText: 'Estado'
                },
                {
                    xtype: 'textfield',
                    style: 'height: 5.25%; width: 65.25%;margin-left: 15%;margin-top: 5%;',
                    itemId: 'cidade',
                    height: 25,
                    hideLabel: true,
                    allowBlank : false,
                    name: 'cidade',
                    emptyText: 'Cidade'
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