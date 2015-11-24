Ext.define('Admin.view.main.ViewportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainviewport',

    listen: {
        controller: {
            '#': {
                unmatchedroute: 'onRouteChange'
            }
        }
    },

    routes: {
        ':node': 'onRouteChange'
    },

    atualizaNomeToolbar: function () {
        // Atualiza os dados da Toolbar
        var toolbar = this.lookupReference('nome');

        Ext.Ajax.request({
            url: '/userEnd',
            method: 'GET',
            success: function (response, opts) {
                var result = Ext.decode(response.responseText);
                toolbar.setValue(result.nome);
            },
            failure: function (response, opts) {
            }
        });

    },
    mostraMenuCorreto: function (callback) {
        //debugger;
        // Executa um refresh na página atualizando o menu
        var navTree = this.lookupReference('navigationTreeList');
        Ext.Ajax.request({
            url: '/user',
            method: 'GET',

            success: function (response) {

                var result = Ext.decode(response.responseText);
                if (result.data.tipo == '1') {
                    navTree.setStore(Ext.create('Admin.store.Admin'));
                } else {
                    navTree.setStore(Ext.create('Admin.store.NavigationTree'));
                }

                callback();

            },
            failure: function (response) {
                var result = Ext.decode(response.responseText);
                callback();
            }
        });


    },
    setCurrentView: function (hashTag) {

        var me = this;
        var hashTag = (hashTag || '').toLowerCase();

        var refs = me.getReferences(),
            mainCard = refs.mainCardPanel,
            mainLayout = mainCard.getLayout(),
            navigationList = refs.navigationTreeList,
            viewModel = me.getViewModel(),
            vmData = viewModel.getData(),
            store = navigationList.getStore(),
            node = store.findNode('routeId', hashTag),
            view = node ? node.get('view') : null,
            lastView = vmData.currentView,
            existingItem = mainCard.child('component[routeId=' + hashTag + ']'),
            newView;

        // Kill any previously routed window
        if (lastView && lastView.isWindow) {
            lastView.destroy();
        }

        if (hashTag === 'logout') {

            this.logout();
            return;
        }


        if (hashTag === 'authentication.register') {
            Ext.suspendLayouts();
            mainLayout.setActiveItem(mainCard.add(Ext.create('Admin.view.authentication.Register', {
                hideMode: 'offsets',
                routeId: 'authentication.Register'
            })));
            Ext.resumeLayouts(true);
            return;
        }

        if (hashTag === 'authentication.passwordreset') {
            //debugger;
            Ext.suspendLayouts();
            mainLayout.setActiveItem(mainCard.add(Ext.create('Admin.view.authentication.PasswordReset', {
                hideMode: 'offsets',
                routeId: 'authentication.PasswordReset'
            })));
            Ext.resumeLayouts(true);
            return;
        }

        Ext.Ajax.request({
            url: '/authenticated',
            success: function (response) {

                if (response.responseText !== 'true') {
                    Ext.suspendLayouts();
                    mainLayout.setActiveItem(mainCard.add(Ext.create('Admin.view.authentication.Login', {
                        hideMode: 'offsets',
                        routeId: 'authentication.Login'
                    })));
                    Ext.resumeLayouts(true);
                    return;
                }

                me.mostraMenuCorreto(function () {

                    lastView = mainLayout.getActiveItem();

                    if (hashTag === 'eventos') {
                        Ext.suspendLayouts();
                        mainLayout.setActiveItem(mainCard.add(Ext.create('Admin.view.eventos.Eventos', {
                            hideMode: 'offsets',
                            routeId: 'eventos'
                        })));
                        Ext.resumeLayouts(true);
                        return;
                    }

                    if (hashTag === 'usuarios') {
                        Ext.suspendLayouts();
                        mainLayout.setActiveItem(mainCard.add(Ext.create('Admin.view.usuarios.Usuario', {
                            hideMode: 'offsets',
                            routeId: 'usuarios'
                        })));
                        Ext.resumeLayouts(true);
                        return;
                    }

                    if (!existingItem) {
                        newView = Ext.create('Admin.view.' + (view || 'pages.Error404Window'), {
                            hideMode: 'offsets',
                            routeId: hashTag
                        });
                    }

                    if (!newView || !newView.isWindow) {
                        // !newView means we have an existing view, but if the newView isWindow
                        // we don't add it to the card layout.
                        if (existingItem) {
                            // We don't have a newView, so activate the existing view.
                            if (existingItem !== lastView) {
                                mainLayout.setActiveItem(existingItem);
                            }
                            newView = existingItem;
                        }
                        else {
                            // newView is set (did not exist already), so add it and make it the
                            // activeItem.
                            Ext.suspendLayouts();
                            mainLayout.setActiveItem(mainCard.add(newView));
                            Ext.resumeLayouts(true);
                        }
                    }

                    navigationList.setSelection(node);

                    if (newView.isFocusable(true)) {
                        newView.focus();
                    }

                    vmData.currentView = newView;

                    me.atualizaNomeToolbar();

                });


            },
            failure: function () {

                Ext.suspendLayouts();
                mainLayout.setActiveItem(mainCard.add(Ext.create('Admin.view.authentication.Login', {
                    hideMode: 'offsets',
                    routeId: 'authentication.Login'
                })));
                Ext.resumeLayouts(true);
            }


        });


    },

    onNavigationTreeSelectionChange: function (tree, node) {
        if (node && node.get('view')) {
            this.redirectTo(node.get("routeId"));
        }
    },
    onToggleNavigationSize: function () {

        var me = this,
            refs = me.getReferences(),
            navigationList = refs.navigationTreeList,
            wrapContainer = refs.mainContainerWrap,
            collapsing = !navigationList.getMicro(),
            new_width = collapsing ? 64 : 250;

        if (Ext.isIE9m || !Ext.os.is.Desktop) {
            Ext.suspendLayouts();

            refs.senchaLogo.setWidth(new_width);

            navigationList.setWidth(new_width);
            navigationList.setMicro(collapsing);

            Ext.resumeLayouts(); // do not flush the layout here...

            // No animation for IE9 or lower...
            wrapContainer.layout.animatePolicy = wrapContainer.layout.animate = null;
            wrapContainer.updateLayout();  // ... since this will flush them
        }
        else {
            if (!collapsing) {
                // If we are leaving micro mode (expanding), we do that first so that the
                // text of the items in the navlist will be revealed by the animation.
                navigationList.setMicro(false);
            }

            // Start this layout first since it does not require a layout
            refs.senchaLogo.animate({dynamic: true, to: {width: new_width}});

            // Directly adjust the width config and then run the main wrap container layout
            // as the root layout (it and its chidren). This will cause the adjusted size to
            // be flushed to the element and animate to that new size.
            navigationList.width = new_width;
            wrapContainer.updateLayout({isRoot: true});

            // We need to switch to micro mode on the navlist *after* the animation (this
            // allows the "sweep" to leave the item text in place until it is no longer
            // visible.
            if (collapsing) {
                navigationList.on({
                    afterlayoutanimation: function () {
                        navigationList.setMicro(true);
                    },
                    single: true
                });
            }
        }
    },
    onMainViewRender: function () {

        if (!window.location.hash) {
            this.redirectTo("home");
        }

    },
    onRouteChange: function (id) {
        this.setCurrentView(id);
    },
    logout: function (button) {
        var self = this;
        Ext.Ajax.request({
            url: 'logout',
            success: function (response) {

                window.location.href = window.location.href.split('#')[0];

            }
        });
    }

});
