/**
 * Created by breno on 07/11/15.
 */
Ext.define('Admin.view.dashboard.GridEnd', {
    extend: 'Ext.container.Container',
    style: 'margin-bottom: 1%;',
    xtype: 'dashboard',
    responsiveCls: 'big-100',
    height: 600,
    requires: [
        'Admin.view.dashboard.DashboardController',
        'Admin.view.dashboard.DashboardModel',
        'Ext.layout.container.Border'
    ],

    controller: 'dashboard',

    xtype: 'gridEnd',

    viewModel: {
        type: 'dashboard'
    },
    layout: 'border',
    defaults: {
        scrollable: 'y',
        bodyPadding: 10
    },
    items: [
        {
            region: 'north',
            title: 'Endereco',
            overflowY: 'scroll',
            responsiveCls: 'big-100',
            xtype: 'grid',
            itemId: 'GridEndereco',
            reference: 'GridEndereco',
            columnLines: true,
            height: 300,
            publishes: 'selection',
            bind: {
                store: '{endereco}'
            },
            columns: [

                {
                    text: 'Logradouro',
                    dataIndex: 'logradouro',
                    flex: 2
                },
                {
                    text: 'Número',
                    dataIndex: 'numero',
                    flex: 1
                },
                {
                    text: 'Cep',
                    dataIndex: 'cep',
                    flex: 1
                },
                {
                    text: 'Complemento',
                    dataIndex: 'complemento',
                    flex: 1
                },
                {
                    text: 'Bairro',
                    dataIndex: 'bairro',
                    flex: 1
                },
                {
                    text: 'Cidade',
                    dataIndex: 'cidade',
                    flex: 1,
                    editable: true
                },
                {
                    text: 'Estado',
                    dataIndex: 'estado',
                    flex: 1,
                    editable: true
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'button',
                            text: 'Alterar dados',
                            ui: 'soft-blue',
                            handler: 'EditarEnderecoUsuario'
                        }
                    ]
                }
            ]
        }
    ]

});