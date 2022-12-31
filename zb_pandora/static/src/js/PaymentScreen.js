odoo.define('zb_pandora.PaymentScreen', function(require) {
    "use strict";

    const PaymentScreen = require('point_of_sale.PaymentScreen');
    const Registries = require('point_of_sale.Registries');
    const { onMounted } = owl;

    const PandoraPaymentScreen = PaymentScreen => class extends PaymentScreen {
        async _isOrderValid(isForceValidate) {
            const CreditPayments = this.paymentLines.filter(payment => payment.payment_method.is_credit_sale)
            console.log("----44",CreditPayments);

            if (CreditPayments.length && !this.currentOrder.get_partner()) {
            	const paymentMethod = CreditPayments[0].payment_method
            	console.log("-----paymentMethod", paymentMethod);
                const { confirmed } = await this.showPopup('ConfirmPopup', {
                    title: this.env._t('Customer Required'),
                    body: _.str.sprintf(this.env._t('Customer is required for %s payment method.'), paymentMethod.name),
                });
                if (confirmed) {
                    this.selectPartner();
                }
                return false;
            }
            else
            console.log("-----else");
            {
                return super._isOrderValid(...arguments);
            }
            console.log("-----6");



        }

    };

    Registries.Component.extend(PaymentScreen, PandoraPaymentScreen);
    console.log("-----8");
    return PaymentScreen;
});