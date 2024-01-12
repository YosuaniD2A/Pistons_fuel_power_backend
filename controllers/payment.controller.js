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
            success_url: `http://localhost:65024/shop/checkout/success/{CHECKOUT_SESSION_ID}`,
            cancel_url: 'http://localhost:65024/shop/cart',
        });

        return res.json(session);

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

module.exports = {
    createSession
};