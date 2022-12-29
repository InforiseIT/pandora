# -*- coding: utf-8 -*-

from odoo import api, fields, models


class PosSession(models.Model):
	_inherit = 'pos.session'

	@api.depends('order_ids')
	def _compute_sale_total(self):
		for rec in self:
			rec.total_sale_amt = total = 0.0
			for order in rec.order_ids:
				total = total + order.amount_total
			rec.total_sale_amt = total

	@api.depends('payment_method_ids')
	def get_payment_amount(self, journal_id):
		total_cash_payment = sum(self.order_ids.mapped('payment_ids').filtered(lambda payment: payment.payment_method_id == journal_id).mapped('amount'))
		return total_cash_payment

	total_sale_amt = fields.Monetary(compute='_compute_sale_total', string='Total Sales Amount', digits='Account')
