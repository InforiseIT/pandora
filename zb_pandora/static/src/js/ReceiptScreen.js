odoo.define('static.ReceiptScreen', function(require) {
    'use strict';


    const ReceiptScreen = require('point_of_sale.ReceiptScreen');
    const Registries = require('point_of_sale.Registries');



    const PosBarcodeReceiptScreen = ReceiptScreen =>
        class extends ReceiptScreen {
            /**
             * @override
             */
            _shouldAutoPrint() {
                const order = this.currentOrder;
                console.log(order,'-->orrrrr')
                const order_id = order.uid
                const barcode_value = order_id.split('Order')
                console.log(barcode_value,'-->barcode_value')
                console.log(barcode_value[0],'-->55')
                $("#bcTarget").barcode(barcode_value[0], "code128", { barWidth: 1.5, fontSize: 14, barHeight: 25})
                return this.env.pos.config.iface_print_auto && !this.currentOrder._printed;
            }
        };

    Registries.Component.extend(ReceiptScreen, PosBarcodeReceiptScreen);
    return ReceiptScreen;


});