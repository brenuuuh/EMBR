/**
 * Created by breno on 28/10/15.
 */
/**
 * Created by lorena on 13/10/15.
 */
Ext.define("Admin.view.eventos.NovoEvento", {
    extend: 'Ext.window.Window',

    xtype: 'novoevento',

    controller: 'eventos',
    title: 'Cadastro de novo evento',
    autoShow: true,
    width: 500,
    height: 700,
    modal: true,

    items: [
        {
            xtype: 'form',
            reference: 'form',
            items: [
                {
                    xtype: 'textfield',
                    style: 'height: 5.25%; width: 65.25%;margin-left: 15%;margin-top: 5%;',
                    itemId: 'nome',
                    height: 50,
                    hideLabel: true,
                    allowBlank : false,
                    name: 'nome',
                    emptyText: 'Nome'
                },
                {
                    xtype: 'textfield',
                    style: 'height: 5.25%; width: 65.25%;margin-left: 15%;',
                    itemId: 'descricao',
                    height: 100,
                    hideLabel: true,
                    emptyText: 'Descrição',
                    name: 'descricao',
                    allowBlank : false
                },
                {
                    xtype: 'datefield',
                    style: 'height: 5.25%; width: 65.25%;margin-left: 15%;',
                    itemId: 'dataEvento',
                    type: 'date',
                    height: 50,
                    hideLabel: true,
                    allowBlank : false,
                    name: 'dataEvento',
                    emptyText: 'Data do Evento',
                    format :'d/m/Y'
                    //altFormats:'d,m,Y|d.m.Y'
                },
                {
                    xtype: 'timefield',
                    style: 'height: 5.25%; width: 65.25%;margin-left: 15%;',
                    itemId: 'horaEvento',
                    height: 50,
                    hideLabel: true,
                    type: 'time',
                    emptyText: 'Hora do Evento',
                    name: 'horaEvento',
                    format: 'H:i',
                    altFormats:'H:i',
                    increment: 30,
                    allowBlank : false
                },
                {
                    xtype: 'textfield',
                    style: 'height: 5.25%; width: 65.25%;margin-left: 15%;',
                    itemId: 'tipo',
                    height: 50,
                    hideLabel: true,
                    emptyText: 'Tipo de Evento',
                    name: 'tipo',
                    allowBlank : false
                },
                {
                    xtype: 'textfield',
                    style: 'height: 5.25%; width: 65.25%;margin-left: 15%;',
                    itemId: 'faixa',
                    height: 50,
                    hideLabel: true,
                    emptyText: 'Classificação',
                    name: 'faixa',
                    allowBlank : false
                },
                {
                    xtype: 'textfield',
                    style: 'height: 5.25%; width: 65.25%;margin-left: 15%;',
                    itemId: 'cidade',
                    height: 50,
                    hideLabel: true,
                    emptyText: 'Cidade',
                    name: 'cidade',
                    allowBlank : false
                },
                {
                    xtype: 'textfield',
                    style: 'height: 5.25%; width: 65.25%;margin-left: 15%;',
                    itemId: 'estado',
                    height: 50,
                    hideLabel: true,
                    emptyText: 'Estado',
                    name: 'estado',
                    allowBlank : false
                },
                {
                    xtype: 'textfield',
                    style: 'height: 5.25%; width: 65.25%;margin-left: 15%;',
                    itemId: 'local',
                    height: 50,
                    hideLabel: true,
                    emptyText: 'Local do Evento',
                    name: 'local',
                    allowBlank : false
                },
                {
                    xtype: 'button',
                    style: 'height: 20.25%; width: 45.25%;margin-left: 25%;',
                    ui: 'soft-blue',
                    text: 'Cadastrar',
                    listeners: {
                        click: 'cadastrarEvento'
                    }

                }
            ]
        }
    ]

});