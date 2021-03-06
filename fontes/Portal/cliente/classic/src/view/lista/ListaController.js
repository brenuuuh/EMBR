/**
 * Created by breno on 07/10/15.
 */
/**
 * Created by lorena on 03/08/15.
 */
Ext.define('Admin.view.lista.ListaController',{
    extend: 'Ext.app.ViewController',
    alias:'controller.lista',

    OnConfirmaPresenca: function(botao) {
        var grid = botao.up('grid'),
            record = grid.getSelectionModel().getSelection()[0],
            store = grid.getStore();


        if (record) {
            Ext.MessageBox.show({
                title: 'Confirma presença?',
                msg: 'Deseja confirmar sua presença nesse evento?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                fn: function (btn) {

                    if (btn === 'yes') {

    
                        Ext.Ajax.request({
                            url: '/eventos/confirma',
                            method: 'POST',
                            params:{
                                _id: record.get('_id'),
                                nome: record.get('nome'),
                                descricao: record.get('descricao'),
                                tipo: record.get('tipo'),
                                faixa: record.get('faixa'),
                                dataEvento: record.get('dataEvento'),
                                horaEvento: record.get('horaEvento'),
                                cidade: record.get('cidade'),
                                estado: record.get('estado'),
                                local: record.get('local')
                            },

                            success: function (response, opts) {

                                var result = Ext.decode(response.responseText);
                                if (result.success === true) {

                                    Ext.Msg.alert('Confirmado com sucesso.', 'Verifique a caixa de entrada.');
                                    Ext.ComponentQuery.query('#GridLista')[0].getStore().load();
                                }
                                else {
                                    Ext.Msg.alert('Falha ao confirmar', result.message);
                                }
                            },
                            failure: function (response, opts) {
                                var result = Ext.decode(response.responseText);
                                Ext.Msg.alert('Falha');

                            }
                        });


                    }
                },
                animateTarget: botao,
                icon: Ext.MessageBox.QUESTION
            });
        } else {
            Ext.Msg.alert('Erro ao confirmar', 'Favor Selecionar um Registro.');
        }
    }

    //OnCheckSta: function(check, rowIdx, checking) {
    //
    //    var record = check.up('grid').getStore().getAt(rowIdx);
    //
    //
    //    Ext.Ajax.request({
    //        url: '/eventos/' + record.get('_id'),
    //        method: 'PUT',
    //        params: {
    //            nome: record.get('nome'),
    //            descricao: record.get('descricao'),
    //            tipo: record.get('tipo'),
    //            faixa: record.get('faixa'),
    //            status: checking,
    //            dataEvento: record.get('dataEvento'),
    //            horaEvento: record.get('horaEvento')
    //        },
    //        success: function (response, opts) {
    //
    //            var result = Ext.decode(response.responseText);
    //            Ext.Msg.alert('Confirmado com sucesso.', 'Verifique a caixa de entrada.');
    //            Ext.ComponentQuery.query('#GridLista')[0].getStore().load();
    //        },
    //        failure: function (response, opts) {
    //            var result = Ext.decode(response.responseText);
    //            Ext.Msg.alert('Falha');
    //
    //        }
    //
    //    });
    //
    //}
});


