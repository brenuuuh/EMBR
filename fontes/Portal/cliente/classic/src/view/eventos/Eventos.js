/**
 * Created by breno on 07/10/15.
 */
Ext.define('Admin.view.eventos.Eventos', {
    extend: 'Ext.container.Container',
    style: 'margin-bottom: 1%;',
    xtype: 'eventos',
    responsiveCls: 'big-100',
    height: 900,
    requires: [
        'Admin.view.eventos.EventosController',
        'Admin.view.eventos.EventosModel',
        'Ext.layout.container.Border'
    ],

    controller: 'eventos',

    viewModel: {
        type: 'eventos'
    },
    layout: 'border',
    defaults: {
        scrollable: 'y',
        bodyPadding: 10
    },
    items: [
        {
            region: 'north',
            title: 'Eventos',
            overflowY: 'scroll',
            responsiveCls: 'big-100',
            xtype: 'grid',
            itemId: 'GridEventos',
            reference: 'GridEventos',
            columnLines: true,
            height: 300,
            publishes: 'selection',
            bind: {
                store: '{eventos}'
            },
            columns: [

                Ext.create('Ext.grid.RowNumberer'),
                {

                    text: 'Nome',
                    dataIndex: 'nome',
                    flex: 1
                },
                {

                    text: 'Descrição',
                    dataIndex: 'descricao',
                    flex: 1
                },
                {
                    text: 'Data do Evento',
                    dataIndex: 'dataEvento',
                    xtype: 'datecolumn',
                    renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                    flex: 1
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
                            store:'{eventos}'
                        },
                        queryMode: 'local',
                        valueField: 'tipo',
                        displayField: 'tipo',
                        editable:true
                    }

                },
                {
                    text: 'Classificação',
                    xtype: 'widgetcolumn',
                    dataIndex: 'faixa',
                    flex: 1,
                    widget:{
                        xtype: 'combo',
                        bind:{
                            store:'{eventos}'
                        },
                        queryMode: 'local',
                        valueField: 'faixa',
                        displayField: 'faixa',
                        editable:true
                    }

                },
                {

                    text: 'Presença ?',
                    xtype: 'checkcolumn',
                    dataIndex: 'status',
                    flex:1,
                    stopSelection: false,
                    defaultType: 'boolean',
                    disabled: true
                }
                //{
                //    text: 'Status',
                //    dataIndex: 'status',
                //    flex:1
                //}

            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            text: 'Adicionar',
                            ui: 'soft-blue',
                            handler: 'onClickNovoEvento'
                        },
                        {
                            xtype: 'button',
                            text: 'Cancelar',
                            ui: 'soft-blue',
                            handler: 'OnClickRemove'
                        },
                        {
                            xtype: 'button',
                            text: 'Remover',
                            ui: 'soft-blue',
                            handler: 'OnClickDel'
                        }
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    bind: {
                        store: '{eventos}'
                    },
                    displayInfo: true,
                    displayMsg: 'Mostrando {0} - {1} de {2}',
                    emptyMsg: "Nenhum registro."
                }
            ]

        }
    ]

});