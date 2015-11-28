Ext.define('Admin.view.profile.UserProfileController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.userprofile',

    onEnviarMensagemFaleConosco: function (btn) {

        var viewModel = this.getViewModel(),
            vmData = viewModel.getData(),
            me = this;

            Ext.Ajax.request({
                url: 'perfil/envio',
                params: {
                    tipo: vmData.tipo,
                    evento: vmData.evento,
                    assunto: vmData.assunto,
                    mensagem: vmData.mensagem

                },
                timeout: 5000,
                method: 'POST',

                success: function (response, opts) {

                    var result = Ext.decode(response.responseText);
                    if (result.success === true) {

                        Ext.Msg.alert('Email enviado com sucesso','Agradeçemos por nos enviar suas dúvidas ou reclamações');

                    }
                    else {
                        Ext.Msg.alert('Falha', result.message);
                    }
                },
                failure: function (response, opts) {
                    var result = Ext.decode(response.responseText);
                    Ext.Msg.alert('Failed');

                }
            });

        }



});