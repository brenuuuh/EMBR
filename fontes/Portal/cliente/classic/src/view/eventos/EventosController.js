/**
 * Created by breno on 07/10/15.
 */
/**
 * Created by lorena on 03/08/15.
 */
Ext.define('Admin.view.eventos.EventosController',{
    extend: 'Ext.app.ViewController',
    alias:'controller.eventos',


    funcao : function( grid, td, cellIndex, record, tr, rowIndex, e, eOpts ){

        alert("FUNFOU!!!!!!!");
    },
    onClickNovoEvento: function (button, e, eOpts) {


        Ext.create('Admin.view.eventos.NovoEvento');


    },
    cadastrarEvento: function (btn, e, eOpts) {
    
        var me = this;

        var form = btn.up('form');

        if (form.getForm().isValid()) {
            Ext.Ajax.request({
                url: '/eventos/novo',
                method: 'POST',
                params: form.getValues(),
                success: function (response) {
                    Ext.Msg.alert('Salvo', 'Evento salvo com sucesso.');
                    btn.up('window').close();
                    Ext.ComponentQuery.query('#GridEventos')[0].getStore().load();

                },
                failure: function (response) {

                    var objRes = JSON.parse(response.responseText);

                    if (objRes.tipo == 0) {
                        Ext.Msg.alert('Falha', 'Evento já cadastrado.','');
                    } else {
                        Ext.Msg.alert('Evento já cadastrado', 'Favor cadastrar um novo evento');

                    }
                }
            });
        }
    },
    OnClickRemove : function(botao) {

        //debugger;

        var grid = botao.up('grid');

        var store = grid.getStore();

        var record = grid.getSelectionModel().getSelection()[0];

        if(record){
            Ext.MessageBox.show({
                title:'Deseja Cancelar?',
                msg: 'Tem certeza que deseja cancelar este evento ?',
                buttons:  Ext.MessageBox.YESNO,
                scope: this,
                fn: function(btn) {

                    if(btn === 'yes'){
                        Ext.Ajax.request({
                            url: '/eventos/' + record.get('_id'),
                            method: 'PUT',
                            params: {
                                status: 'Cancelado'
                            },
                            success: function (response) {
                                Ext.ComponentQuery.query('#GridEventos')[0].getStore().load();
                                Ext.Msg.alert('Salvo', 'Evento cancelado com sucesso.');

                            },
                            failure: function (response) {
                                Ext.Msg.alert('Erro ao cancelar evento', JSON.parse(response.responseText).error);
                            }
                        });


                    }
                },
                animateTarget: botao,
                icon:  Ext.MessageBox.QUESTION
            });
        }else{
            Ext.Msg.alert('Erro ao cancelar','Favor Selecionar um Registro.');
        }

    },
    OnClickAdd: function(){
        //Instanciamos a classe do form
        var win = Ext.create('App.view.eventos.Add');
        //Colocamos um titulo
        win.setTitle('Incluir novo Evento');
        //Mostramos a janela.
        win.show();

    },
    OnClickCancel : function(button){

        button.up('window').close();
    },
    OnClickSave: function (button) {
        var win = button.up('window'), //Pegamos a janela que está acima do botao que foi clicado.
            form = win.down('form'), //Pegamos o form desta janela.
            store,
            record = form.getRecord(),  //Pegamos o registro vinculado ao formulario
            values = form.getValues(); //Valores atuais no formulario.


        try {
            store = this.getViewModel().getParent().getStore(this.nomeStore)//Pegamos a store do viewmodel parent.
        }
        catch (err) {
            store = this.getViewModel().getStore(this.nomeStore)//Pegamos a store do viewmodel.
        }

        var self = this;

        if (form.getForm().isValid()) {

            this.transformValues(values);

            //Se record eh undefined (nao e edicao) adcionamos os valores ao store
            //Se nao atualizamos o record atual com os valores modificados no form.


            !record ? store.add(values) : record.set(values)

            store.sync({
                success: function () {
                    //Notificamos o usuario e fechamos a janela.
                    Cotacao.util.Utils.showToast('Salvo com Sucesso!');
                    store.load();

                    win.close();


                },
                failure: function (response) {
                    if (response.hasException) {
                        for (var i in response.exceptions) {

                            try {

                                var response = response.exceptions[i].getError().response,
                                    json = JSON.parse(response.responseText);

                                Ext.Msg.alert(response.status + " " + response.statusText, "Erro ao realizar operação, motivo: <br>" + json.error);
                                store.load();

                            } catch (error) {
                                Ext.Msg.alert('Erro!', 'Erro não especificado!');
                                store.load();
                            }

                        }
                    }
                }
            });
        }
    },
    transformValues: function(values){},
    onTipoSelect: function (combo) {
        //Fazer o q tem q fazer.
        var record = combo.getWidgetRecord();




        Ext.Ajax.request({
            url: '/eventos/' + record.get('_id'),
            method: 'PUT',
            params: {
                tipo: combo.getSelection().id
            },
            success: function (response) {
                var result = Ext.decode(response.responseText);
                console.log(result)
            },
            failure: function (response) {
                var result = Ext.decode(response.responseText);
                console.log(result)
            }
        });


    },

    OnClickDel: function (botao){
        var grid = botao.up('grid'),
            record = grid.getSelectionModel().getSelection()[0],
            store = grid.getStore();


        if (record) {
            Ext.MessageBox.show({
                title: 'Deseja Excluír?',
                msg: 'Tem certeza que deseja excluir este registro?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                fn: function (btn) {

                    if (btn === 'yes') {


                        Ext.Ajax.request({
                            url: '/eventos/' + record.get('nome'),
                            method: 'DELETE',

                            success: function (response) {
                                store.remove(record);
                                Ext.Msg.alert('Salvo', 'Registro excluído com sucesso.');
                            },
                            failure: function (response) {
                                Ext.Msg.alert('Erro ao excluir', JSON.parse(response.responseText).error);
                            }
                        });


                    }
                },
                animateTarget: botao,
                icon: Ext.MessageBox.QUESTION
            });
        } else {
            Ext.Msg.alert('Erro ao excluir', 'Favor Selecionar um Registro.');
        }

    }
});


