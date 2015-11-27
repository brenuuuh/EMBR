/**
 * Created by breno on 27/11/15.
 */
Ext.define('Admin.view.dashboard.AlterarSenhaUsuario', {
    extend: 'Ext.window.Window',
    width: 400,
    layout: 'fit',
    items: [
        {
            xtype: 'form',
            bodyPadding: 5,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },

            defaults: {
                anchor: '100%',
                xtype: 'textfield',
                allowBlank: false,
                labelWidth: 100,
                margin: '3 0 3 0',
                msgTarget: 'under'
            },

            items: [
                {
                    xtype: 'hiddenfield',
                    name: '_id'
                },
                {
                    xtype: 'textfield',
                    name: 'usuSen',
                    itemId: 'usuSen',
                    fieldLabel: 'Nova Senha',
                    inputType: 'password',
                    allowBlank: false,
                    minLength: 6
                },
                {
                    xtype: 'textfield',
                    name: 'password2',
                    itemId: 'password2',
                    fieldLabel: 'Repetir a senha',
                    inputType: 'password',
                    allowBlank: false,
                    /**
                     * Custom validator implementation - checks that the value matches what was entered into
                     * the password1 field.
                     */
                    validator: function(value) {
                        var password1 = this.previousSibling('[name=usuSen]');
                        return (value === password1.getValue()) ? true : 'Senhas não são iguais.';
                    }
                }

            ]
        }
    ],
    bbar: [
        {
            xtype: 'button',
            text: 'Salvar',
            handler: function(button){

                var win    = button.up('panel'), //Pegamos a janela que está acima do botao que foi clicado.
                    form   = win.down('form'), //Pegamos o form desta janela.
                    values = form.getValues(); //Valores atuais no formulario.

                form.getForm().submit({
                    clientValidation: true,
                    url: '/usuario/senha',
                    success: function(form, action) {

                        Ext.Msg.alert('Success', action.result.msg);
                        win.close();
                    },
                    failure: function(form, action) {
                        switch (action.failureType) {
                            case Ext.form.action.Action.CLIENT_INVALID:
                                Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
                                break;
                            case Ext.form.action.Action.CONNECT_FAILURE:
                                Ext.Msg.alert('Failure', 'Ajax communication failed');
                                break;
                            case Ext.form.action.Action.SERVER_INVALID:
                                Ext.Msg.alert('Failure', action.result.msg);
                                break;
                        }
                    }
                });

            },
        },
        {
            xtype: 'button',
            text: 'Cancelar',
            handler: function (button) {
                button.up('window').close();
            }
        }
    ]


});