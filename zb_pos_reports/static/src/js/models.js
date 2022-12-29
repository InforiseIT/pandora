/* global Backbone, waitForWebfonts */
odoo.define('zb_pos_reports.models', function(require) {
    "use strict";
    const { Context } = owl;

    var models = require('point_of_sale.models');
    var utils = require('web.utils');
	var round_di = utils.round_decimals;
	var round_pr = utils.round_precision;

    models.load_fields('res.company', ['mobile','street','street2','city','zip']);


    var _super_orderline = models.Orderline.prototype;

    models.Orderline = models.Orderline.extend({

    	export_for_printing: function() {
            var line = _super_orderline.export_for_printing.apply(this, arguments);
            line.price_display_one_without_tax = this.get_display_price_one_without_tax();
            return line;
        },

    	get_display_price_one_without_tax: function(){
	        var rounding = this.pos.currency.rounding;
	        var price_unit = this.get_unit_price();
	        if (this.pos.config.iface_tax_included !== 'total') {
	            return round_pr(price_unit * (1.0 - (this.get_discount() / 100.0)), rounding);
	        } else {
	            var product =  this.get_product();
	            var taxes_ids = product.taxes_id;
	            var taxes =  this.pos.taxes;
	            var product_taxes = [];

	            _(taxes_ids).each(function(el){
	                product_taxes.push(_.detect(taxes, function(t){
	                    return t.id === el;
	                }));
	            });

	            var all_taxes = this.compute_all(product_taxes, price_unit, 1, this.pos.currency.rounding);

	            return round_pr(all_taxes.total_excluded * (1 - this.get_discount()/100), rounding);
	        }
	    },
    });
    var _super_order = models.Order.prototype;
    models.Order = models.Order.extend({
        export_for_printing: function() {
        	var json = _super_order.export_for_printing.apply(this, arguments);
        	json.shop_name = this.pos.config.name
            json.company.mobile = this.pos.company.mobile
            json.company.street = this.pos.company.street
            json.company.street2 = this.pos.company.street2
            json.company.city = this.pos.company.city
            json.company.state_id = this.pos.company.state_id
            json.company.zip = this.pos.company.zip
            json.company.country_id = this.pos.company.country_id
            json.date.format_date = moment(json.date.validation_date).format('DD/MM/YYYY')
            json.date.format_time = moment(json.date.validation_date).format('LT')
            return json;
        },

    });

});