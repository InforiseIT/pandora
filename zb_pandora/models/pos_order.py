from odoo import api, fields, models, _
from odoo.tools.misc import get_lang
import logging

_logger = logging.getLogger(__name__)


class PosOrder(models.Model):
    _inherit = "pos.order"
    _description = "POS Order"


class PosPaymentMethod(models.Model):
    _inherit = "pos.payment.method"
    _description = "POS Payment Method"

    is_credit_sale = fields.Boolean(string='Credit Sale',default=False, copy=False,
                                    help='This field is to check Customer is Selected or not for credit Sales Process')