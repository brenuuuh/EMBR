/**
 * Created by breno on 03/11/15.
 */
Ext.define('Admin.view.lista.ListaEventos', {
    extend:'Ext.container.Container',
    xtype: 'lista',

    height: 300,
    requires: [
        'Admin.view.lista.ListaController',
        'Admin.view.lista.ListaModel',
        'Ext.layout.container.Border',
        'Ext.grid.column.Action'
    ],
    controller: 'lista',
    viewModel: {
        type: 'lista'
    },
    layout: 'border',
    defaults: {
        scrollable: 'y',
        bodyPadding: 10
    },
    items: [
        {
            region: 'center',
            title: 'Eventos',
            responsiveCls: 'big-100',
            xtype: 'grid',
            itemId: 'GridLista',
            columnLines: true,
            reference: 'GridLista',
            publishes: 'selection',
            bind: {
                store: '{lista}'
            },
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {

                    text: 'Nome',
                    dataIndex: 'nome',
                    flex: 1,
                    editable:false
                },
                {

                    text: 'Descrição',
                    dataIndex: 'descricao',
                    flex: 1,
                    editable:false
                },
                {
                    text: 'Data do Evento',
                    dataIndex: 'dataEvento',
                    xtype: 'datecolumn',
                    renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                    flex: 1,
                    editable:false
                },
                {
                    text: 'Hora do Evento',
                    dataIndex: 'horaEvento',
                    flex:1
                },
                {
                    text: 'Tipo',
                    xtype: 'widgetcolumn',
                    dataIndex: 'tipo',
                    flex: 1,
                    widget:{
                        xtype: 'combo',
                        bind:{
                            store:'{lista}'
                        },
                        queryMode: 'local',
                        valueField: 'tipo',
                        displayField: 'tipo',
                        editable: false,
                        disabled: true
                    },
                    editable:false
                },
                {
                    text: 'Classificação',
                    xtype: 'widgetcolumn',
                    dataIndex: 'faixa',
                    flex: 1,
                    widget:{
                        xtype: 'combo',
                        bind:{
                            store:'{lista}'
                        },
                        queryMode: 'local',
                        valueField: 'faixa',
                        displayField: 'faixa',
                        editable: false,
                        disabled: true

                    },
                    editable:false
                },
                {
                    text: 'Cidade',
                    dataIndex: 'cidade',
                    flex:1
                },
                {
                    text: 'Estado',
                    dataIndex: 'estado',
                    flex:1
                },
                {
                    text: 'Local',
                    dataIndex: 'local',
                    flex:1
                }

            ],
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    bind: {
                        store: '{lista}'
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
                            text: 'Confirmar Presença',
                            ui: 'soft-blue',
                            handler: 'OnConfirmaPresenca'
                        }


                    ]
                }
            ]

        }

    ]



});