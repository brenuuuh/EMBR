Ext.define('Admin.view.authentication.AuthenticationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authentication',

    //TODO: implement central Facebook OATH handling here


    onLoginButton: function (button, e, eOpts) {

        var viewModel = this.getViewModel(),
            vmData = viewModel.getData(),
            me = this;

        Ext.Ajax.request({
            url: '/login',
            method: 'POST',
            params: {
                login: vmData.userid,
                senha: vmData.password
            },
            success: function (response) {
                me.redirectTo("home", true);
            },
            failure: function (response) {
                Ext.Msg.alert('Acesso Negado', 'Acesso Negado');
            }
        });


    },


    onLoginAsButton: function (button, e, eOpts) {
        this.redirectTo("authentication.login");
    },

    onNewAccount: function (button, e, eOpts) {
        this.redirectTo("authentication.register");
    },

    onRegisterClick: function (button, e, eOpts) {

        var viewModel = this.getViewModel(),
            vmData = viewModel.getData(),
            me = this;
        Ext.Ajax.request({
            url: '/usuario',
            method: 'POST',
            params: {
                cpf: vmData.cpf,
                login: vmData.email,
                email: vmData.email,
                nome: vmData.nome,
                dataNasc: vmData.dataNasc,
                dataAlteracao: vmData.dataAlteracao,
                dataInclusao: vmData.dataInclusao,
                cidade: vmData.cidade,
                estado: vmData.estado,
                logradouro: vmData.logradouro,
                bairro: vmData.bairro,
                numero: vmData.numero,
                cep: vmData.cep,
                complemento: vmData.complemento
            },
            success: function (response) {
                Ext.Msg.alert('Salvo', 'Registro salvo com sucesso.');
            },
            failure: function (response) {

                var objRes = JSON.parse(response.responseText);

                if (objRes.tipo == 0) {
                    Ext.Msg.alert('Usuário já cadastrado', 'Caso esqueceu sua senha, favor entrar em esqueceu sua senha.');
                } else {
                    Ext.Msg.alert('Erro ao cadastrar', 'Favor verificar os dados informados.');

                }
            }
        });
    },

    onResetClick: function (button, e, eOpts) {
//debugger;
        var win     = button.up('window'), //Pegamos a janela que está acima do botao que foi clicado.
            form    = win.down('form'), //Pegamos o form desta janela.
            values  = form.getValues(); //Valores atuais no formulario.
//debugger;
        Ext.Ajax.request({
            url: 'usuario/resetPasswd',
            method: 'POST',
            params: {
                email: values
            },
            timeout: 1000000,


            success: function (response, opts) {

                var result = Ext.decode(response.responseText);
                if (result.success === true) {

                    Ext.Msg.alert('Email enviado com sucesso', 'Favor verificar sua caixa de entrada.');

                }
                else {
                    Ext.Msg.alert('Falha', 'E-mail não cadastrado.');
                }
            },
            failure: function (response, opts) {

                var result = Ext.decode(response.responseText);
                Ext.Msg.alert('Falha', 'E-mail não consta na base de dados');


            }


        });

    }
});

