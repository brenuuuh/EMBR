Ext.define('Admin.view.usuarios.Usuario', {
    extend:'Ext.container.Container',
    xtype: 'usuarios',

    height: 300,
    requires: [
        'Admin.view.usuarios.UsuarioController',
        'Admin.view.usuarios.UsuarioModel',
        'Admin.view.usuarios.UsuarioSenhaForm',
        'Ext.layout.container.Border',
        'Ext.grid.column.Action'
    ],
    controller: 'usuarios',
    viewModel: {
        type: 'usuarios'
    },
    layout: 'border',
    defaults: {
        scrollable: 'y',
        bodyPadding: 10
    },
    items: [
        {
            region: 'center',
            title: 'Usuários',
            responsiveCls: 'big-100',
            xtype: 'grid',
            itemId: 'gridUsuarios',
            columnLines: true,
            reference: 'gridUsuario',
            publishes: 'selection',
            viewConfig: {
                stripeRows: true,
                enableTextSelection: false,
                markDirty: false
            },
            trackMouseOver: false,
            disableSelection: true,
            bind: {
                store: '{usuarios}'
            },
            columns: [
                {
                    text: 'Email',
                    dataIndex: 'email',
                    flex: 1
                },
                {
                    text: 'Login',
                    dataIndex: 'login',
                    flex: 1
                },
                {
                    text: 'Senha',
                    xtype: 'widgetcolumn',
                    widget: {
                        xtype: 'button',
                        text: 'Alterar', //TODO COLOCAR UM ICONE BONITO AQUI
                        handler: function(btn) {
                            var record = btn.getWidgetRecord();

                            var view = Ext.create('Admin.view.usuarios.UsuarioSenhaForm'),
                                form = view.down('form');

                            view.setTitle('Alterando senha de ' + record.get('email'));

                            form.loadRecord(record);

                            view.show();

                        }
                    }
                },
                {
                    xtype: 'checkcolumn',
                    header: 'Admin',
                    flex: 1,
                    dataIndex: 'admin',
                    //xtype: 'checkcolumn',
                    //    text: 'Admin',
                        stopSelection: false,
                        listeners: {
                            checkchange : 'onCheckAdm'
                        },
                        defaultType: 'boolean'
                    //}

                }

            ],
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    bind: {
                        store: '{usuarios}'
                    },
                    displayInfo: true,
                    displayMsg: 'Mostrando {0} - {1} of {2}',
                    emptyMsg: "Nenhum registro."
                },

                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            text: 'Adicionar novo usuário',
                            ui: 'soft-blue',
                            handler: 'onClickNovoUsuario'


                        },
                        {
                            xtype: 'label',
                            cls: 'lock-screen-top-label',
                            text: 'Pesquisar usuário por: ',
                            style: 'font-size: 170.5%;margin-left:2%;'

                        }


                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [

                        {
                            xtype: 'textfield',
                            flex:1,
                            fieldLabel: 'Email',
                            reference: 'emailfilter',
                            publishes: 'value'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Login',
                            flex:1,
                            reference: 'loginfilter',
                            publishes: 'value'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Cpf',
                            flex:1,
                            reference: 'cpffilter',
                            publishes: 'value'
                        }


                    ]
                }
            ]

        }

    ]



});