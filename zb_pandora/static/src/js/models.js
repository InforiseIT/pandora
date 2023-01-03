/* global Backbone, waitForWebfonts */
odoo.define('zb_pandora.models', function (require) {
"use strict";


var { Orderline,Order } = require('point_of_sale.models');
const Registries = require('point_of_sale.Registries');



const PandaInOrderline = (Orderline) => class PandaInOrderline extends Orderline {
    export_for_printing() {
        var line = super.export_for_printing(...arguments);
        line.default_code = this.get_product().default_code;
        line.barcode = this.get_product().barcode;
        line.tax_name = this.get_all_line_taxes();
        // line.company_vals = this.get_company_details();
        return line;
    }

    get_all_line_taxes(qty = this.get_quantity()){
        var price_unit = this.get_unit_price() * (1.0 - (this.get_discount() / 100.0));
        var taxtotal = 0;
        var tax_name = false;

        var product =  this.get_product();
        var taxes_ids = this.tax_ids || product.taxes_id;
        taxes_ids = _.filter(taxes_ids, t => t in this.pos.taxes_by_id);

        var product_taxes = this.pos.get_taxes_after_fp(taxes_ids, this.order.fiscal_position);
        var all_taxes = this.compute_all(product_taxes, price_unit, qty, this.pos.currency.rounding);
        _(all_taxes.taxes).each(function(tax) {
            tax_name = tax.name;
        });
        return tax_name;
    };

    // get_company_details(){
    //     var company_data = false;
    //     let company = this.pos.company;
    //     console.log("-----", company);
    //     var company_data = {
    //         name : company.name,
    //         mobile : company.mobile,
    //         street : company.street,
    //         street2 : company.street2,
    //         city : company.city,
    //         state_id : company.state_id,
    //         zip : company.zip,
    //         country_id : company.country_id,

    //         };
    //     console.log("-----", company_data);
    //     return company_data;
    // };

    }

Registries.Model.extend(Orderline, PandaInOrderline);

const PandaInOrder = (Order) => class PandaInOrder extends Order {
    export_for_printing() {
        var json = super.export_for_printing(...arguments)
        console.log(this.pos.company)
        json.company.street = this.pos.company.street
        json.company.street2 = this.pos.company.street2
        json.company.city = this.pos.company.city
        json.company.zip = this.pos.company.zip
        json.company.country_id = this.pos.company.country_id[1]
        console.log(json,'ssssssssss')
        return json;
    }

}
Registries.Model.extend(Order, PandaInOrder);





});
