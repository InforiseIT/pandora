from odoo import api, fields, models, _
from odoo.exceptions import UserError
from decimal import localcontext
from datetime import timedelta
from datetime import datetime
from pytz import timezone

import psycopg2
import pytz

class PosDetailsReport(models.TransientModel):
    _name = 'wizard.pos.details'
    _description = 'Open Sales Details Report'

    start_date = fields.Date(required=True, default=lambda self: fields.Date.today())
    end_date = fields.Date(required=True , default=lambda self: fields.Date.today())
    pos_config_ids = fields.Many2many('pos.config', 'pos_detail_config',
        default=lambda s: s.env['pos.config'].search([]))
    report_detail = fields.Selection([('normal', 'Normal'),
                                ('detail', 'Detailed'),], 
                               'Report Type', default='normal')
    is_visible = fields.Boolean(default=False)

    @api.model
    def default_get(self, field_list):
        res = super().default_get(field_list)
        if self.env.user.has_group('point_of_sale.group_pos_manager'):
            res.update({
                'is_visible': True,
            })
        return res

    def print_customer_statement(self):
        datas = {
            'ids': self.ids,
            'form': self.read(),
            
        }
        return self.env.ref('zb_pos_reports.action_report_sales').report_action(self,data=datas)
    
    
    