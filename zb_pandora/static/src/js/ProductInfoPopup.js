/* global Backbone, waitForWebfonts */
odoo.define('zb_pandora.PosGlobalState', function(require) {
    "use strict";


    // const ProductInfoPopup = require('point_of_sale.ProductInfoPopup');
    // const Registries = require('point_of_sale.Registries');
    // const AbstractAwaitablePopup = require('point_of_sale.AbstractAwaitablePopup');


    // console.log(ProductInfoPopup,'[rrrrrrrrrrr')
    // const PandoraProductInfoPopup = (ProductInfoPopup) =>
    //     class PandoraProductInfoPopup extends ProductInfoPopup {


    //         _hasShowCostMarginUserRights() {
    //             const isACcessible = this.env.pos.config.group_pos_cost_id;
    //             console.log(isACcessible, 'sdsdsdsd')
    //             return isACcessible;
    //         }
    //     }


    // Registries.Component.extend(ProductInfoPopup, PandoraProductInfoPopup);

    // return ProductInfoPopup;
    var { PosGlobalState, Order } = require('point_of_sale.models');
    const Registries = require('point_of_sale.Registries');

    const PandorPosGlobalState = (PosGlobalState) => class PandorPosGlobalState extends PosGlobalState {
        hasShowCostMarginUserRights() {
        	var group_cost_id = JSON.parse(JSON.stringify(this.env.pos.config.group_pos_cost_id));
        	var flag = false
            const user_details = this.env.pos.user.groups_id
            var user_groups = JSON.parse(JSON.stringify(user_details));
            user_groups.some(function(group_id) {
            	if (group_id === group_cost_id[0]) {
                    flag = true;
                }
            });
            return flag
            
        }
    }
    Registries.Model.extend(PosGlobalState, PandorPosGlobalState);



});