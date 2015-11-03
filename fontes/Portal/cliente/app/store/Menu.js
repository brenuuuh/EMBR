Ext.define('Padrao.store.Menu', {
    extend: 'Ext.data.TreeStore',
    storeId: 'menuStore',
    root: {
        text: 'Menu',
        expanded: true,
        children: [
            {
                text: 'Usuário',
                children: [
                    {leaf: true, text: 'Cadastro de Usuários', xtype: 'usuario'},
                    {leaf: true, text: 'Perfis', xtype: 'perfil'}
                ]
            },
            {
                text: 'Pessoa',
                children: [
                    {
                        text: 'Tabelas',
                        children: [
                            {leaf: true, text: 'Cadastro Ramo de Atividade', xtype: 'atividade'},
                            {leaf: true, text: 'Cadastro Situação', xtype: 'situacao'}
                        ]
                    },
                    {leaf: true, text: 'Cadastro Vendedor', xtype: 'vendedor'},
                    {leaf: true, text: 'Cadastro Cliente', xtype: 'cliente'},
                    {leaf: true, text: 'Cadastro Fornecedor', xtype: 'fornecedor'}
                ]
            },
            {
                text: 'Relatórios'
            },
            {
                text: 'Gráficos'
            }
        ]
    }
});