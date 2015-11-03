/**
 * Created by lorena on 30/09/15.
 */

Ext.define("Admin.view.dashboard.EnvioAlteracoes", {
    extend: 'Ext.window.Window',

    xtype: 'envioalteracoes',

    controller: 'dashboard',
    bodyPadding: 10,
    title: 'Descrição de dados que devem ser alterados',
    autoShow: true,
    width: 500,
    height: 250,
    modal: true,

    items: [
        {
            xtype: 'form',
            reference: 'form',
            items: [
                {


                    xtype: 'textareafield',
                    fieldLabel: 'Label',
                    cls: 'auth-textbox',
                    style: 'height: 50.25% ;width: 85.25%;margin-left: 5%; margin-top: 5%',
                    hideLabel: true,
                    allowBlank: false,
                    emptyText: 'Descreva as alterações aqui.',
                    name: 'alteracao',
                    bind: '{alteracao}'


                },
                {
                    xtype: 'button',
                    style: 'height: 10.25%; width: 45.25%;margin-left: 25%;',

                    ui: 'soft-blue',


                    text: 'Enviar email de alteração',
                    listeners: {
                        click: 'enviarEmailAlteracao'
                    }
                }
            ]
        }
    ]

});