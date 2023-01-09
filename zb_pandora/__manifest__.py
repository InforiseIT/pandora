# -*- coding: utf-8 -*-
{
    'name': "PANDORA Module",

    'summary': """
       Base module for PANDORA Project""",

    'description': """
       Base module for PANDORA Project
    """,

    'author': "ZestyBeanz Technologies Pvt Ltd.",
    'website': "http://zbeanztech.com/",
    'assets': {
            'point_of_sale.assets': [
                'zb_pandora/static/src/css/pos.css',
                'zb_pandora/static/src/xml/**/*',
                'zb_pandora/static/src/js/**/*',

            ]
        },


    'category': 'Uncategorized',
    'version': '16.00.02',

    # any module necessary for this one to work correctly
    'depends': ['base', 'point_of_sale', 'pos_discount'],

    # always loaded
    'data': [
        'security/security.xml',
        'reports/barcode_template.xml',
        'reports/reports.xml',
        'views/product_view.xml',
        'views/pos_order_view.xml',


    ],


    # only loaded in demonstration mode
    'demo': [

    ],
    'qweb': [

    ],

    'installable': True,
    'auto_install': False,
}
