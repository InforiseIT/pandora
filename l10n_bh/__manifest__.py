# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.
{
    'name': 'Bahrain - Accounting',
    'version': '0.1',
    'author': 'Zesty Beanz Technology (P) Ltd.',
    'category': 'Accounting/Localizations/Account Charts',
    'description': """
Bahrain accounting chart and localization.
=======================================================
    """,
    'depends': ['base', 'account'],
    'data': [
        'data/l10n_bh_data.xml',
        'data/l10n_bh_chart_data.xml',
        'data/account.account.template.csv',
        'data/account_tax_group_data.xml',
        'data/l10n_bh_chart_post_data.xml',
        'data/account_tax_report_data.xml',
        'data/account_tax_template_data.xml',
        'data/fiscal_templates_data.xml',
        'data/account_chart_template_data.xml',
        # 'views/report_invoice_templates.xml',
        'views/account_move.xml',
    ],
    'demo': [
        # 'demo/demo_company.xml',
    ],
    'license': 'LGPL-3',
}
