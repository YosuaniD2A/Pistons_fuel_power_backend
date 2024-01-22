// import Stripe from "stripe";
const Stripe = require('stripe')

const stripe = new Stripe(process.env.STRIPE_SK)

const createSession = async (req, res) => {
    try {
        const orderData = req.body;
        let productsList = [];

        for (let i = 0; i < orderData.products.length; i++) {
            const element = {
                price_data: {
                    product_data: {
                        name: orderData.products[i].title,
                        description: orderData.products[i].sku,
                    },
                    currency: 'usd',
                    unit_amount: orderData.products[i].price * 100,
                },
                quantity: orderData.products[i].quantity
            };

            productsList.push(element);
        }

        const session = await stripe.checkout.sessions.create({
            line_items: productsList,
            mode: 'payment',
            payment_method_types: ["card"],
            phone_number_collection: {
                enabled: true,
              },
            billing_address_collection: 'required',
            payment_intent_data:{
                shipping:{
                    address: {
                        line1: orderData.shippingDetails.address,
                        city: orderData.shippingDetails.town,
                        country: orderData.shippingDetails.country,
                        state: orderData.shippingDetails.state,
                        postal_code: orderData.shippingDetails.postalcode
                    } ,
                    name: orderData.shippingDetails.firstname +' '+orderData.shippingDetails.lastname,
                    phone: orderData.shippingDetails.phone
                }
            },
            // success_url: `${process.env.URL_ECOMMERCE}shop/checkout/success/{CHECKOUT_SESSION_ID}`,
            success_url: `${process.env.URL_ECOMMERCE_LOCAL}shop/checkout/success/{CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.URL_ECOMMERCE}shop/cart`,
        });

        return res.json(session);

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const retrieveSession = async (req, res) => {
    try {
        const retrieve = await stripe.checkout.sessions.retrieve(req.params.id);

        return res.json(retrieve);

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

module.exports = {
    createSession,
    retrieveSession
};