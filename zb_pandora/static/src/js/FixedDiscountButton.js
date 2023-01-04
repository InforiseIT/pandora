odoo.define('pos_discount.FixedDiscountButton', function(require) {
    'use strict';
    var core = require('web.core');
    var _t = core._t;

    const PosComponent = require('point_of_sale.PosComponent');
    const ProductScreen = require('point_of_sale.ProductScreen');
    const { useListener } = require("@web/core/utils/hooks");
    const Registries = require('point_of_sale.Registries');

    class FixedDiscountButton extends PosComponent {
        setup() {
            super.setup();
            useListener('click', this.onClick);

        }
        async onClick() {
            var self = this;
            const { confirmed, payload } = await this.showPopup('DiscountNumberPopup', {
                title: this.env._t('Discount'),
                startingValue: 1,
                isInputSelected: true
            });
            console.log(payload, 'ssssssss')


            if (confirmed) {
                console.log(confirmed,'confirmed')
                const { amount, globalStatus, discountMode } = payload;
                if (discountMode == null || discountMode == "") {
                    self.showPopup('ErrorPopup', { title: this.env._t("Error"), body: this.env._t(" Please Select the Discount Type") });
                    
                }
                console.log(discountMode,'discountMode')
                const val =  amount;
                if (discountMode == 'percent')
                {
                    const val = Math.round(Math.max(0, Math.min(100, parseFloat(amount))));

                }
                
                console.log(val,'ssssssss')
                await self.apply_discount(val, globalStatus);
            }
        }


        async apply_discount(pc, globalStatus) {
            var order = this.env.pos.get_order();
            var discount_type = order.get_pos_discount_type();
            var lines = order.get_orderlines();
            var selected_line = order.get_selected_orderline()
            // var product  = this.env.pos.db.get_product_by_id(this.env.pos.config.discount_product_id[0]);
            // if (product === undefined) {
            //     await this.showPopup('ErrorPopup', {
            //         title : this.env._t("No discount product found"),
            //         body  : this.env._t("The discount product seems misconfigured. Make sure it is flagged as 'Can be Sold' and 'Available in Point of Sale'."),
            //     });
            //     return;
            // }
            console.log(globalStatus, 'globalStatus')
            if (globalStatus == 'order') {
                if (discount_type == 'fixed') {
                    for (var i = 0; i < lines.length; i++) {
                        lines[i].set_discount(0)
                        var disc_amt = parseFloat(pc) * (100 / lines[i].price)
                        lines[i].set_discount(disc_amt)
                        lines[i].set_fixed_disc_amt(parseFloat(pc))
                    }
                }
                if (discount_type == 'percent') {
                    for (var i = 0; i < lines.length; i++) {
                        lines[i].set_discount(pc)
                        lines[i].set_fixed_disc_amt(0)

                    }
                }
            } else {
                if (discount_type == 'fixed') {
                    selected_line.set_discount(0)
                    var disc_amt = parseFloat(pc) * (100 / selected_line.price)
                    selected_line.set_discount(disc_amt)
                    selected_line.set_fixed_disc_amt(parseFloat(pc))

                }
                if (discount_type == 'percent') {
                    selected_line.set_discount(pc)
                    selected_line.set_fixed_disc_amt(0)

                }
            }

            var filter_line = lines.filter(line => line.get_discount() === 0);
            
            if (pc == 0 && lines.length == filter_line.length) {
                order.set_pos_discount_type(null)
            }

            // Remove existing discounts

        }
    }
    FixedDiscountButton.template = 'FixedDiscountButton';

    ProductScreen.addControlButton({
        component: FixedDiscountButton,
        condition: function() {
            return true;
        },
    });

    Registries.Component.add(FixedDiscountButton);

    return FixedDiscountButton;
});