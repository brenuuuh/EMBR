Ext.define('Admin.store.NavigationTree', {
    extend: 'Ext.data.TreeStore',

    storeId: 'NavigationTree',
    root: {
        expanded: true,
        children: [
            {
                text:   'Home',
                view:   'home.Home',
                leaf:   true,
                iconCls: 'x-fa fa-home',
                routeId: 'home'
            },
            {
                text:   'Eventos',
                view:   'lista.ListaEventos',
                leaf:   true,
                iconCls: 'x-fa fa-desktop',
                routeId:'lista'
            },
            {
                text:   'Meus Dados',
                view:   'dashboard.Dashboard',
                leaf:   true,
                iconCls: 'x-fa fa-list-alt',
                routeId: 'dashboard'
            },
            {
                text:   'Fale Conosco',
                view:   'profile.UserProfile',
                leaf:   true,
                iconCls: 'x-fa fa-question',
                routeId:'profile'
            },
            {
                        text: 'Sair',
                        view: 'logout',
                        leaf: true,
                        iconCls: 'x-fa fa-power-off',
                        routeId:'logout'
            }
        ]
    },
    fields: [
        {
            name: 'text'
        }
    ]
});
