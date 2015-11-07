//Ext.define('Admin.view.profile.Social', {
//    extend: 'Ext.form.Panel',
//    xtype: 'formend',
//    style: 'width:  100%;height: 50,25%;',
//
//
//    controller: 'dashboard',
//
//
//    region: 'center',
//    listeners: {
//        afterrender: 'iniciaEnd'
//
//    },
//
//    items: [
//        {
//            region: 'center',
//            xtype: 'panel',
//
//
//            layout: {
//
//                type: 'hbox',
//                align: 'stretch'
//            },
//
//            defaults: {
//                flex: 1
//            },
//
//            items: [
//
//                {
//                    xtype: 'fieldset',
//                    width: 400,
//                    height: 200,
//                    style: 'border: 10px solid  transparent !important;',
//                    items: [
//                        {
//
//                            xtype: 'textfield',
//                            fieldLabel: 'Logradouro',
//                            name: 'Logradouro',
//                            width: 350,
//                            reference: 'logradouro',
//                            style: 'margin-top:10%'
//
//                        },
//                        {
//                            xtype: 'textfield',
//
//                            fieldLabel: 'Número',
//                            name: 'Numero',
//                            reference: 'numero'
//
//
//                        }
//                    ]
//
//                },
//                {
//                    xtype: 'fieldset',
//                    width: 400,
//                    height: 200,
//                    style: 'border: 10px solid  transparent !important;',
//                    items: [
//                        {
//                            xtype: 'label',
//                            cls: 'lock-screen-top-label',
//                            text: 'Endereço',
//                            style: 'font-size: 200.5%; margin-left: 20%; '
//
//                        },
//                        {
//                            xtype: 'textfield',
//                            fieldLabel: 'CEP',
//                            name: 'Cep',
//                            reference: 'cep',
//                            style: 'margin-top:5%'
//                        },
//                        {
//                            xtype: 'textfield',
//                            name: 'Complemento',
//                            fieldLabel: 'Complemento',
//                            reference: 'complemento'
//
//
//                        },
//
//                        {
//                            xtype: 'button',
//                            style: 'margin-top: 1%;margin-left: 7%;',
//
//                            text: ' Salvar Alterações',
//
//                            ui: 'soft-blue',
//
//                            listeners: {
//
//                                click: 'salvarAlteracao'
//                            }
//
//                        }
//                    ]
//
//                },
//                {
//                    xtype: 'fieldset',
//                    width: 400,
//                    height: 200,
//
//                    style: 'border: 10px solid  transparent !important;',
//                    items: [
//                        {
//                            xtype: 'textfield',
//                            name: 'Bairro',
//                            fieldLabel: 'Bairro',
//                            reference: 'bairro',
//                            style: 'margin-top:10%'
//
//                        },
//                        {
//                            xtype: 'textfield',
//                            name: 'Estado'+'|'+'Cidade',
//                            fieldLabel: 'Estado/Cidade',
//                            reference: 'estado',
//                            width: 350
//
//
//
//                        }
//
//                    ]
//
//                }
//            ]
//
//
//        }
//
//
//    ]
//
//
//
//
//
//
//});
