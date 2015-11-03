/**
 * Created by lorena on 29/09/15.
 */
Ext.define('Admin.view.dashboard.Grid', {
    extend: 'Ext.grid.Panel',
    xtype: 'gridfilial',

    bodyPadding: 10,


    cls: 'share-panel shadow-panel',
    region: 'center',
    style: 'width:  81.25%; margin-left: 5%; margin-right: 5%;',

    requires: [
        'Ext.ux.layout.ResponsiveColumn',
        'Admin.view.dashboard.DashboardController'

    ],

    id: 'dashboard',

    controller: 'dashboard',
    viewModel: {
        type: 'dashboard'
    },

    layout: 'responsivecolumn',

    listeners: {
        hide: 'onHideView'
    },


    columns: [

        {
            text: 'Filial',
            dataIndex: '._id',
            flex: 1
        },
        {
            text: 'Razão Social',
            dataIndex: 'RazaoSocial',
            flex: 4
        },
        {
            text: 'Nome Fantasia',
            dataIndex: 'NomeFantasia',
            flex: 4

        },
        {
            text: 'CNPJ',
            dataIndex: 'cnpjFilial',
            flex: 2
        }
    ],
    tbar:[
        {
            text:' teste',
            listeners: {

                click: 'clicarClick'
            }

        }

    ]

});
