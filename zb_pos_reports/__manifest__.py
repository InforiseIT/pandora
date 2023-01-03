# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.
{
    'name': 'POS Reports',
    'author': "Zesty Beanz Technologies Pvt LTD",
    'website': "http://www.zbeanztech.com",
    'summary': 'POS Reports',
    'category': 'Sales/Point of Sale',
    'description': """
    	POS Reports
	""",
    'version': '16.0.00',
    'depends': ['base','point_of_sale'],
    'data' : [
        'security/ir.model.access.csv',
        'wizard/pos_details.xml',
        'wizard/wizard_periodic_report.xml',
        # 'report/layouts.xml',
        'views/report_details_view.xml',
        'report/salesdetails_report.xml',
        'report/pos_receipt_report.xml',
        'report/pos_session_report.xml',
        'views/session_view.xml',
        'views/pos_report_menu.xml',
        'report/periodic_sales_details_report.xml',
    ],
    'test': [
    ],
    'demo': [
    ],
    'assets': {
        'point_of_sale.assets': [
            'zb_pos_reports/static/src/js/**/*',
            'zb_pos_reports/static/src/css/pos.css',
        ],
        'web.assets_qweb': [
            'zb_pos_reports/static/src/xml/**/*',
        ],
    },
    'installable': True,
    'auto_install': False,
    'application': True,
    'license': 'LGPL-3',
}
