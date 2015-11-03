Ext.define('Admin.view.dashboard.Dashboard', {
    extend: 'Ext.grid.Panel',
    region: 'center',
    style: 'width:  81.25%; height: 20%;margin-left: 5%; margin-right: 5%;font-size: 170.5%;',

    requires: [
        'Ext.ux.layout.ResponsiveColumn',
        'Admin.view.dashboard.DashboardController'

    ],

    id: 'dashboard',

    controller: 'dashboard',
    viewModel: {
        type: 'dashboard'
    },
    xtype: 'empresa',
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
    bbar: [
        {

            style: 'margin-left: 3%;',
            text: ' Enviar correção de dados incoerentes',

            ui: 'soft-blue',

            listeners: {

                click: 'clicarClick'
            }

        }

    ]


});
