/**
 * Created by breno on 07/11/15.
 */
Ext.define("Admin.view.dashboard.EditarEndereco", {
    extend: 'Ext.window.Window',

    xtype: 'editarEndereco',

    controller: 'dashboard',
    title: 'Edição de Endereço',
    autoShow: true,
    width: 520,
    height: 450,
    modal: true,

    items: [
        {
            xtype: 'form',
            reference: 'form',
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Logradouro',
                    name: 'logradouro',
                    height: 30,
                    maskRe: /[A-Z,a-z ]/,
                    allowBlank : false
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Número',
                    name: 'numero',
                    height: 30,
                    maskRe: /[0-9]/,
                    allowBlank : false
                },
                {
                    xtype: 'label',
                    name: 'endereco',
                    fieldLabel: 'Endereco',
                    height: 30,
                    maskRe: /[A-Z,a-z ]/,
                    allowBlank : false
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'CEP',
                    name: 'cep',
                    height: 30,
                    maskRe: /[0-9 -]/,
                    allowBlank : false
                },
                {
                    xtype: 'textfield',
                    name: 'complemento',
                    fieldLabel: 'Complemento',
                    height: 30,
                    maskRe: /[A-Z,a-z ]/,
                    allowBlank : true
                },
                {
                    xtype: 'textfield',
                    name: 'bairro',
                    fieldLabel: 'Bairro',
                    height: 30,
                    maskRe: /[A-Z,a-z ]/,
                    allowBlank : false

                },
                {
                    xtype: 'textfield',
                    name: 'estado',
                    fieldLabel: 'Estado',
                    height: 30,
                    maskRe: /[A-Z,a-z ]/,
                    allowBlank : false
                },
                {
                    xtype: 'textfield',
                    name: 'cidade',
                    fieldLabel: 'Cidade',
                    height: 30,
                    maskRe: /[A-Z,a-z ]/,
                    allowBlank : false
                },


                {
                    xtype: 'button',
                    style: 'height: 20.25%; width: 45.25%;margin-left: 25%;margin-top: 5%;',
                    ui: 'soft-blue',
                    text: 'Salvar alterações',
                    listeners: {
                        click: 'salvarAlteracao'
                    }

                }
            ]
        }
    ]

});