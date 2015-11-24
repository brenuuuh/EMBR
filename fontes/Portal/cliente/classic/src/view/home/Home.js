/**
 * Created by breno on 09/11/15.
 */
Ext.define('Admin.view.home.Home', {
    extend: 'Ext.panel.Panel',
    xtype: 'home',
    style: 'width:90%; height:90%;',
    layout: 'fit',

    items:[
        {
            xtype:'component',
            autoEl:{
                frameborder: 0,
                tag: 'iframe',
                src:'http://embr-bh.xyz',
                border:0
            }

        }
    ]

});
