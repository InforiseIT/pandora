from odoo import api, fields, models, _
from odoo.tools.misc import get_lang
import logging
_logger = logging.getLogger(__name__)


class ProductTemplate(models.Model):
    _inherit = "product.template"
    _description = "Product Template Modification"

    list_price = fields.Float(string='Sales Price', digits=(16, 3))

    def action_barcode(self):
        return self.env.ref('zb_pandora.report_barcode_pdf_qweb').report_action(self)



