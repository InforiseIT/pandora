# -*- coding: utf-8 -*-
from odoo import api, fields, models, _


class PosSession(models.Model):
    _inherit = 'pos.session'

    def _loader_params_res_company(self):
        result = super()._loader_params_res_company()
        result['search_params']['fields'].extend(('street','street2','zip','city'))
        return result

    def _get_pos_ui_res_users(self, params):
        user = self.env['res.users'].search_read(**params['search_params'])[0]
        user['role'] = 'manager' if any(id == self.config_id.group_pos_manager_id.id for id in user['groups_id']) else 'cashier'
        # del user['groups_id']
        return user

    def _loader_params_pos_payment_method(self):
        result = super()._loader_params_pos_payment_method()
        result['search_params']['fields'].append('is_credit_sale')
        return result


class PosConfig(models.Model):
    _inherit = 'pos.config'

    group_pos_cost_id = fields.Many2one('res.groups', string='show Cost Price Group', default=lambda self: self.env.ref('zb_pandora.group_product_cost'),
        help='This field is there to pass the id of the pos margin group to the point of sale client.')
