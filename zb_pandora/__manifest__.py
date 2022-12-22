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
            ]
        },

    'category': 'Uncategorized',
    'version': '16.00.01',

    # any module necessary for this one to work correctly
    'depends': ['base', 'account', 'point_of_sale', 'website', 'purchase', 'sale', 'web',
                ],

    # always loaded
    'data': [




    ],


    # only loaded in demonstration mode
    'demo': [

    ],
    'qweb': [

    ],
}
