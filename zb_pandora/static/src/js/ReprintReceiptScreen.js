odoo.define('zb_pandora.ReprintReceiptScreen', function(require) {
    'use strict';

    const ReprintReceiptScreen = require('point_of_sale.ReprintReceiptScreen');
    const Registries = require('point_of_sale.Registries');


    const BarcodeReprintReceiptScreen = ReprintReceiptScreen =>
        class extends ReprintReceiptScreen {
            mounted() {
                super.mounted();
                const order = this.props.order;
                const order_id = order.uid
                const barcode_value = order_id.split('Order')
                $("#bcTarget").barcode(barcode_value[0], "code128",{barWidth:1,fontSize: 14,barHeight:50})
                this.printReceipt();
            }
        };

    Registries.Component.extend(ReprintReceiptScreen, BarcodeReprintReceiptScreen);

    return ReprintReceiptScreen;



});