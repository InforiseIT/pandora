# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.
import pytz
import time
import datetime
from odoo import api, fields, models
from datetime import timedelta
import textwrap


class BarcodeReport(models.AbstractModel):
    _name = "report.zb_pandora.barcode_report"

    @api.model
    def _get_report_values(self, docids, data=None):
        product_obj = []
        for product in docids:
            obj = self.env['product.template'].browse(int(product))
            product_name = obj.name
            s_wrapped = '\n'.join(textwrap.wrap(product_name, 20)[0:2])
            vals = {
                'barcode': obj.barcode,
                'default_code':obj.default_code,
                'list_price': obj.list_price,
                'currency_id':obj.currency_id.name,
                'name': s_wrapped,
                'x_studio_net_weight':obj.x_studio_net_weight,
            }
            product_obj.append(vals)

        docargs = {
            'doc_ids': docids,
            'doc_model': 'product.template',
            'data': data,
            'product_obj': product_obj,
        }
        return docargs
