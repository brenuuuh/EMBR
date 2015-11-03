Ext.define('Admin.store.NavigationTree', {
    extend: 'Ext.data.TreeStore',

    storeId: 'NavigationTree',
    root: {
        expanded: true,
        children: [
            {
                text:   'Eventos',
                view:   'eventos.Eventos',
                leaf:   true,
                iconCls: 'x-fa fa-desktop',
                routeId:'eventos'
            },
            {
                text:   'Meus Dados',
                view:   'dashboard.Dashboard',
                leaf:   true,
                iconCls: 'x-fa fa-user',
                routeId: 'dashboard'
            },
            {
                text:   'Fale Conosco',
                view:   'profile.UserProfile',
                leaf:   true,
                iconCls: 'x-fa fa-user',
                routeId:'profile'
            },
            {
                        text: 'Sair',
                        view: 'authentication.Login',
                        leaf: true,
                        iconCls: 'x-fa fa-check',
                        routeId:'authentication.login'
            }
        ]
    },
    fields: [
        {
            name: 'text'
        }
    ]
});
