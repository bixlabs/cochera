module.exports = function (app) {

    var config = require('../config/config');
    var chargebee = require('chargebee');
    chargebee.configure(
        {
            site : config.chargebeeSite,
            api_key : config.chargebeeAPIKey
        }
    );

    var subscription = require('../controllers/subscription');
    var events = require('../controllers/events');
    var invoice = require('../controllers/invoice');

    // Dashboard Page
    app.post('/cochera/chargebee/events', events.getEvents);
    app.post('/cochera/chargebee/events/:eventId', events.getEvents);

    //Subscription and Invoice
    app.post('/cochera/authChargebee', subscription.authChargebee);
    //Subscription Page
    app.post('/cochera/subscription/details', subscription.details);
    app.post('/cochera/subscription/card', subscription.card);
    app.post('/cochera/subscription/shipping_address', subscription.shippingAddress);
    app.post('/cochera/subscription/update_cus_info', subscription.updateCusInfo);
    app.post('/cochera/subscription/change_payment_method', subscription.changePaymentMethod);
    app.post('/cochera/subscription/change_billing_info', subscription.changeBillingInfo);
    app.post('/cochera/subscription/change_shipping_address', subscription.changeShippingAddress);
    app.post('/cochera/subscription/reactive', subscription.reactive);
    app.post('/cochera/subscription/cancel', subscription.cancel);
    //Invoice Page
    app.post('/cochera/invoice/for_subscription', invoice.forSubscription);
    app.post('/cochera/invoice/retrive_pdf', invoice.retrivePDF);

};
