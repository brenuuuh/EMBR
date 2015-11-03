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
                text:   'Eventos',
                view:   'eventos.Eventos',
                leaf:   true,
                iconCls: 'x-fa fa-desktop',
                routeId:'eventos'
            },
            {
                text:   'Usuarios',
                view:   'usuarios.Usuario',
                leaf:   true,
                iconCls: 'x-fa fa-user',
                routeId: 'usuarios'
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
