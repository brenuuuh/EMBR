

Ext.define('Admin.view.profile.ShareUpdate', {
    extend: 'Ext.panel.Panel',
    xtype: 'faleconosco',

    bodyPadding: 10,


    cls: 'share-panel shadow-panel',
    region: 'center',
    style: 'width:  31.25%;height: 80,25%; margin-left: 30% ',

    items: [

        {
            xtype: 'label',
            cls: 'lock-screen-top-label',
            text: 'Fale Conosco',
            style: 'font-size: 170.5%; margin-left: 35%;'

        },

        {
            xtype: 'combobox',
            emptyText: 'Duvida / Reclamação',
            name: 'tipo',
            bind: '{tipo}',
            style: 'height: 5.25% ;width: 47.25%;margin-left: 27%;',
            store: new Ext.data.Store({
                data: [
                    [1, 'Duvida'],
                    [2, 'Reclamação']
                ],
                id: 0,
                fields: ['value', 'text']
            }),

            valueField: 'value',
            displayField: 'text',
            triggerAction: 'all',
            editable: false

        },

        {
            xtype: 'combobox',
            emptyText: 'Evento',
            name: 'evento',
            bind: '{evento}',
            style: 'height: 5.25% ;width: 47.25%;margin-left: 27%;',
            store: new Ext.data.Store({
                data: [
                    [1, 'Evento1'],
                    [2, 'Evento2']
                ],
                id: 0,
                fields: ['value', 'text']
            }),

            valueField: 'value',
            displayField: 'text',
            triggerAction: 'all',
            editable: false
            //hideLabel: true,
            //allowBlank: true,

        },


        {
            xtype: 'textfield',
            cls: 'auth-textbox',
            style: 'height: 5.25% ;width: 47.25%;margin-left: 27%;',
            hideLabel: true,
            allowBlank: true,
            emptyText: 'Assunto',
            name: 'assunto',
            bind: '{assunto}'

        },

        {

            xtype: 'textareafield',
            fieldLabel: 'Label',
            cls: 'auth-textbox',
            style: 'height: 30.25% ;width: 47.25%;margin-left: 27%;',
            hideLabel: true,
            allowBlank: false,
            emptyText: 'Mensagem',
            name: 'mensagem',
            bind: '{mensagem}'

        },
        {
            xtype: 'button',
            style: 'height: 10.25%; width: 47.25%;margin-left: 27%;',

            ui: 'soft-blue',


            text: 'Enviar',
            listeners: {
                click: 'onEnviarMensagemFaleConosco'
            }
        }

    ]


});
