Ext.define('Admin.view.dashboard.Dashboard', {
    extend: 'Ext.container.Container',
    xtype: 'dashboard',

    requires: [
        'Ext.ux.layout.ResponsiveColumn',
        'Admin.view.dashboard.Grid'
    ],

    controller: 'dashboard',

    listeners: {
        render : 'onRender'
    },

    items: [
        {
            xtype: 'gridEnd'

        }
    ]


});
