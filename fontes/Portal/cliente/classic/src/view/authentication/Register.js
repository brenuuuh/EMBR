Ext.define('Admin.view.authentication.Register', {
    extend: 'Admin.view.authentication.LockingWindow',
    xtype: 'authregister',

    requires: [
        'Admin.view.authentication.Dialog',
        'Ext.form.Label',
        'Ext.form.field.Text',
        'Ext.form.field.Checkbox',
        'Ext.button.Button'
    ],

    title: 'Cadastro de Usuário',
    defaultFocus: 'authdialog',  // Focus the Auth Form to force field focus as well

        items: [

        {
            xtype: 'authdialog',
            bodyPadding: '20 20',
            width: 455,
            reference : 'authDialog',

            defaultButton : 'submitButton',
            autoComplete: true,
            cls: 'auth-dialog-register',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            defaults : {
                margin: '10 0',
                selectOnFocus : true
            },
            items: [
                {
                    xtype: 'label',
                    cls: 'lock-screen-top-label',
                    text: 'Cadastrar uma nova conta'
                },
                {
                    xtype: 'textfield',
                    itemId: 'nomeUsrReg',
                    cls: 'auth-textbox',
                    height: 55,
                    hideLabel: true,
                    allowBlank : false,
                    name: 'nome',
                    emptyText: 'nome',
                    bind: '{nome}',
                    //plugins: 'textmask',
                    triggers: {
                        glyphed: {
                            cls: 'trigger-glyph-noop auth-email-trigger'
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    itemId: 'cpfUsrReg',
                    cls: 'auth-textbox',
                    height: 55,
                    hideLabel: true,
                    allowBlank : false,
                    name: 'cpf',
                    emptyText: 'CPF',
                    bind: '{cpf}',
                    minLength:11,
                    maxLength:11,
                    triggers: {
                        glyphed: {
                            cls: 'trigger-glyph-noop auth-email-trigger'
                        }
                    }
                },
                {
                    xtype: 'datefield',
                    itemId: 'dataNascUsr',
                    cls: 'auth-textbox',
                    type: 'date',
                    height: 55,
                    hideLabel: true,
                    allowBlank : false,
                    name: 'dataNasc',
                    emptyText: 'Data de Nascimento',
                    bind: '{dataNasc}',
                    //plugins: 'textmask',
                    triggers: {
                        glyphed: {
                            cls: 'trigger-glyph-noop auth-email-trigger'
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    cls: 'auth-textbox',
                    itemId: 'emailUsrReg',
                    height: 55,
                    hideLabel: true,
                    allowBlank : false,
                    name: 'email',
                    emptyText: 'user@example.com',
                    vtype: 'email',
                    bind: '{email}',
                    triggers: {
                        glyphed: {
                            cls: 'trigger-glyph-noop auth-envelope-trigger'
                        }
                    }
                },
                {
                    xtype: 'checkbox',
                    flex: 1,
                    name: 'agrees',
                    cls: 'form-panel-font-color rememberMeCheckbox',
                    height: 32,
                    bind: '{agrees}',
                    allowBlank : false,
                    boxLabel: 'Eu aceito os termos e condições de uso',

                    // In this case, the form operation is not VALID unless Terms are agreed upon
                    isValid: function() {
                        var me = this;
                        return me.checked || me.disabled;
                    }
                },
                {
                    xtype: 'button',
                    scale: 'large',
                    ui: 'soft-blue',
                    formBind: true,
                    reference: 'submitButton',
                    bind: false,
                    margin: '5 0',
                    iconAlign: 'right',
                    iconCls: 'x-fa fa-angle-right',
                    text: 'Cadastrar',
                    listeners: {
                        click: 'onRegisterClick'
                    }
                },
                {
                    xtype: 'component',
                    html: '<div style="text-align:right">' +
                        '<a href="#authentication.login" class="link-forgot-password">'+
                            'Voltar para Login</a>' +
                        '</div>'
                }
            ]
        }
    ]
});
