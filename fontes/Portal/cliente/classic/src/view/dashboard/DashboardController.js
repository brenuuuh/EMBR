Ext.define('Admin.view.dashboard.DashboardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboard',

    requires: [
        'Ext.util.TaskRunner'
    ],


    clicarClick: function (button, e, eOpts) {


            Ext.create('Admin.view.dashboard.EnvioAlteracoes');



    },
    enviarEmailAlteracao: function (btn) {

        var viewModel = this.getViewModel(),
            vmData = viewModel.getData(),
            me = this;
        //    var box = Ext.MessageBox.wait('Enviando email..', 'Envio de email');


        Ext.Ajax.request({
            url: 'perfil/alteracao',
            params: {
                alteracao: vmData.alteracao,


            },
            timeout: 1000000,
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

    },
    onRefreshToggle: function (tool, e, owner) {
        var me = this,
            store = this.getViewModel().getStore('dashboardfulllinechartstore'),
            items = Ext.Array.from(store && store.getData().items),
            num_items = items.length;

        if (tool.toggleValue) {
            me.clearChartUpdates(owner);
        } else {
            if (num_items) {
                me.chartTaskRunner = me.chartTaskRunner || Ext.create('Ext.util.TaskRunner');
                me.chartTaskRunner.start({
                    run: function () {
                        this.last_x += this.last_x - this.second_last_x;
                        var first = this.items[0].data;
                        this.store.removeAt(0);
                        this.store.add({xvalue: first.xvalue, y1value: first.y1value, y2value: first.y2value});
                        this.count++;
                    },
                    store: store,
                    count: 0,
                    items: items,
                    last_x: items[num_items - 1].data.xvalue,
                    second_last_x: items[num_items - 2].data.xvalue,
                    interval: 200
                });
            }
        }

        // change the toggle value
        tool.toggleValue = !tool.toggleValue;
    },

    clearChartUpdates: function () {
        this.chartTaskRunner = Ext.destroy(this.chartTaskRunner);
    },

    onDestroy: function () {
        this.clearChartUpdates();
        this.callParent();
    },

    onHideView: function () {
        this.clearChartUpdates();
    }
});
