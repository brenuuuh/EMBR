/**
 * Created by breno on 03/11/15.
 */
Ext.define('Admin.store.Admin', {
    extend: 'Ext.data.TreeStore',

    storeId: 'Admin',
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
                view:   'eventos.Eventos',
                leaf:   true,
                iconCls: 'x-fa fa-database',
                routeId:'eventos'
            },
            {
                text:   'Usuarios',
                view:   'usuarios.Usuario',
                leaf:   true,
                iconCls: 'x-fa fa-users',
                routeId: 'usuarios'
            },
            {
                text: 'Sair',
                view: 'authentication.Login',
                leaf: true,
                iconCls: 'x-fa fa-power-off',
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
