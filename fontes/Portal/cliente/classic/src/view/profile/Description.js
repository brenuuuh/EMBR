Ext.define('Admin.view.profile.Description', {
    extend:'Ext.grid.Panel',
    overflowY: 'scroll',

    height: 300,
    style: 'margin-top: 1%;',
    title: 'Usuários',
    itemId: 'formUsuario',
    xtype: 'gridusuario',

    requires: [
        'Admin.view.usuarios.UsuarioController',
        'Ext.PagingToolbar'

    ],

    //id: 'dashboard',

    controller: 'dashboard',

    viewModel: {
        type: 'dashboard'
    },

    bind: {

        store: '{gridUS}'
    },


    columns: [

        {

            text: 'Login',
            dataIndex: 'login',
            itemId: 'login',
            reference: 'login',
            flex: 1
        },
        {

            text: 'Email',
            dataIndex: 'email',
            reference: 'email',
            flex: 4
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'button',
                    text: 'Adicionar novo usuário',
                    ui: 'soft-blue',
                    handler: 'onClickNovo'


                },
                {
                    xtype: 'button',
                    text: "Remover",
                    ui: 'soft-blue',
                    listeners: {
                        click: 'PegarDados'
                    }
                }
            ]
        },
        {
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            bind: {
                store: '{gridUS}'
            },
            displayInfo: true,
            displayMsg: 'Mostrando {0} - {1} de {2}',
            emptyMsg: "Nenhum registro."
        }
    ]


});


