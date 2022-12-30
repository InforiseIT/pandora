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
                'zb_pandora/static/src/xml/pos_receipt.xml',
                'zb_pandora/static/src/js/models.js',
                'zb_pandora/static/src/js/ReceiptScreen.js',
                'zb_pandora/static/src/js/jquery-barcode.js',
                'zb_pandora/static/src/js/ReprintReceiptScreen.js',

            ]
        },

    'category': 'Uncategorized',
    'version': '16.00.01',

    # any module necessary for this one to work correctly
    'depends': ['base', 'point_of_sale',
                ],

    # always loaded
    'data': [
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
