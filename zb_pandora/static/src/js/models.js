/* global Backbone, waitForWebfonts */
odoo.define('zb_pandora.models', function (require) {
"use strict";


var { Orderline } = require('point_of_sale.models');
const Registries = require('point_of_sale.Registries');



const PandaInOrderline = (Orderline) => class PandaInOrderline extends Orderline {
    export_for_printing() {
        var line = super.export_for_printing(...arguments);
        line.default_code = this.get_product().default_code;
        line.barcode = this.get_product().barcode;
        return line;

    }
}
Registries.Model.extend(Orderline, PandaInOrderline);

});
