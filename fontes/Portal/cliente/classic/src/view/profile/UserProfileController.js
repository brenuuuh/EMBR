Ext.define('Admin.view.profile.UserProfileController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.userprofile',
    onEnviarMensagemFaleConosco: function (btn) {

        var viewModel = this.getViewModel(),
            vmData = viewModel.getData(),
            me = this;
    //    var box = Ext.MessageBox.wait('Enviando email..', 'Envio de email');


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

                        Ext.Msg.alert('Email enviado com sucesso', result.message);

                    }
                    else {
                        Ext.Msg.alert('Failed', result.message);
                    }
                },
                failure: function (response, opts) {
                    var result = Ext.decode(response.responseText);
                    Ext.Msg.alert('Failed');

                }
            });

        }



});