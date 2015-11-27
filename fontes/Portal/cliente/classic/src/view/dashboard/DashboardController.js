Ext.define('Admin.view.dashboard.DashboardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboard',

    requires: [
        'Ext.util.TaskRunner'
    ],

    onRender: function () {
        //alert('render');
    },

    clicarClick: function (button, e, eOpts) {


            Ext.create('Admin.view.dashboard.EnvioAlteracoes');



    },
    gridDblClick: function (grid, record) {
        this.showEdit(record);

    },
    showEdit: function (record) {
        var view = Ext.create(this.formClass),
            form = view.down('form'),
            self = this;

        //Vincula o viewmodel atual como parent do viewmodel da window.
        view.setViewModel(new Ext.app.ViewModel({
            parent: this.getViewModel(),
            formulas: self.formFormulas
        }));

        if (record) { //Edicao

            view.setTitle((this.podeEditar ? 'Editando ' : 'Visualizando ') + this.formTitulo + ': ');

            form.loadRecord(record);

            self.depoisDeCarregarRecord && self.depoisDeCarregarRecord(record);

            if (!this.podeEditar) {
                //desabilita botao salvar.
                view.query('button')[0].setVisible(false);
                form.query('combobox').forEach(function (c) {
                    c.setDisabled(true);
                });
                form.query('field').forEach(function (c) {
                    try {
                        c.setEditable(false);
                    } catch (err) {
                    }

                });
            }

        } else {
            view.setTitle('Novo ' + this.formTitulo + ': ');
        }

        if (this.antesShowEdit) {
            this.antesShowEdit(form, record);
        }

        view.show();

    },
    gridDblClick: function (grid, record) {

        var form = Ext.ComponentQuery.query('#formend')[0];
        form.loadRecord(record);
    },

    AlterarSenhaUsuario: function (botao) {

        var grid = botao.up('grid'),
            record = grid.getSelectionModel().getSelection()[0],
            store = grid.getStore();

        if (record) {
        var view = Ext.create('Admin.view.usuarios.UsuarioSenhaForm'),
            form = view.down('form');

        view.setTitle('Alterando senha de ' + record.get('email'));

        form.loadRecord(record);

        view.show();
    }
        else{
        }
    },

    EditarEnderecoUsuario: function (botao, e, eOpts) {

        var grid = botao.up('grid'),
            record = grid.getSelectionModel().getSelection()[0],
            store = grid.getStore();

        if (record) {
            var edit = Ext.create('Admin.view.dashboard.EditarEndereco').show();

            if (record) {
                edit.down('form').loadRecord(record);
            }
        }else{
            Ext.Msg.alert('Erro ao editar', 'Favor Selecionar um Registro.');
        }


    },
    salvarAlteracao: function (btn) {

        var win = btn.up('window'),
            form = win.down('form'),
            record = form.getRecord(),
            grid = btn.up('grid');

        if (form.getForm().isValid()) {
            Ext.Ajax.request({
                url: '/usuario/alteracao/' + record.get('_id'),
                method: 'PUT',
                params: form.getValues(),
                success: function (result, request) {
                    Ext.Msg.alert('Salvo', 'Registro salvo com sucesso.');
                    Ext.ComponentQuery.query('#GridEndereco')[0].getStore().load();
                    btn.up('window').close();


                },
                failure: function (result, request) {
                    Ext.Msg.alert('Erro ao editar', 'Dados já existentes.');

                }


            });
        }

    },
    iniciaEnd: function () {
        // Atualiza os dados da Toolbar
        var logradouro = this.lookupReference('logradouro');
        var numero = this.lookupReference('numero');
        var bairro = this.lookupReference('bairro');

        var estado = this.lookupReference('estado');

        var cep = this.lookupReference('cep');
        var complemento = this.lookupReference('complemento');


        Ext.Ajax.request({
            url: '/userEnd',
            method: 'GET',
            success: function (response, opts) {
                var result = Ext.decode(response.responseText);


                logradouro.setValue(result.logradouro);
                numero.setValue(result.numero);
                bairro.setValue(result.bairro);
                var estcid =result.estado + " | " +result.cidade;
                estado.setValue(estcid);
                cep.setValue(result.cep);
                complemento.setValue(result.complemento);
            },
            failure: function (response, opts) {
            }
        });

    }
});
