odoo.define('zb_pandor.DiscountNumberPopup', function(require) {
    'use strict';
    var core = require('web.core');
    var _t = core._t;

    const AbstractAwaitablePopup = require('point_of_sale.AbstractAwaitablePopup');
    const NumberBuffer = require('point_of_sale.NumberBuffer');
    const { useListener } = require("@web/core/utils/hooks");
    const Registries = require('point_of_sale.Registries');

    
    const { parse } = require('web.field_utils');

    const { useRef, useState } = owl;

    // formerly NumberPopupWidget
    class DiscountNumberPopup extends AbstractAwaitablePopup {
        /**
         * @param {Object} props
         * @param {Boolean} props.isPassword Show password popup.
         * @param {number|null} props.startingValue Starting value of the popup.
         * @param {Boolean} props.isInputSelected Input is highlighted and will reset upon a change.
         *
         * Resolve to { confirmed, payload } when used with showPopup method.
         * @confirmed {Boolean}
         * @payload {String}
         */
        setup() {
            super.setup();
            useListener('accept-input', this.confirm);
            useListener('close-this-popup', this.cancel);
            

            let startingBuffer = '';
            if (typeof this.props.startingValue === 'number' && this.props.startingValue > 0) {
                startingBuffer = this.props.startingValue.toString().replace('.', this.decimalSeparator);
            }
            this.state = useState({ buffer: startingBuffer, toStartOver: this.props.isInputSelected,globalStatus:'line',discountMode:'' });
            NumberBuffer.use({
                nonKeyboardInputEvent: 'numpad-click-input',
                triggerAtEnter: 'accept-input',
                triggerAtEscape: 'close-this-popup',
                state: this.state,
                
            });
           

        }
        

        get decimalSeparator() {
            return this.env._t.database.parameters.decimal_point;
        }
        get inputBuffer() {
            if (this.state.buffer === null) {
                return '';
            }
            if (this.props.isPassword) {
                return this.state.buffer.replace(/./g, '•');
            } else {
                return this.state.buffer;
            }
        }
        confirm(event) {
            if (NumberBuffer.get()) {
                super.confirm();
            }
        }
        _onAmountKeypress(event) {
            this.state.globalStatus = event.target.value
        }
        sendInput(key) {
            this.trigger('numpad-click-input', { key });
        }
        changeDiscountMode(type) {
            var order    = this.env.pos.get_order();
            if (order)
            {
                order.set_pos_discount_type(type)
                this.state.discountMode = type
            }
            
            
        }
        get_discount_type()
        {
            var order  = this.env.pos.get_order();
            return order.get_pos_discount_type();
        }
        // getType(key) {
        //  this.trigger('numpad-click-input', { key });
        
        getPayload() {
            var order    = this.env.pos.get_order();
            return {
                amount:  NumberBuffer.get(),
                globalStatus: this.state.globalStatus,
                discountMode:this.state.discountMode ? this.state.discountMode : order.get_pos_discount_type(),
            };
        
        }
    }
    DiscountNumberPopup.template = 'DiscountNumberPopup';
    DiscountNumberPopup.defaultProps = {
        confirmText: _t('Ok'),
        cancelText: _t('Cancel'),
        title: _t('Confirm ?'),
        body: '',
        cheap: false,
        startingValue: null,
        isPassword: false,
        PasswordType:null,
    };

    Registries.Component.add(DiscountNumberPopup);

    return DiscountNumberPopup;
});
