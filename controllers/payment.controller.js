// import Stripe from "stripe";
const Stripe = require('stripe')

const stripe = new Stripe(process.env.STRIPE_SK)

const createSession = async (req, res) => {
    try {
        const params = req.body.orderData;
        console.log(params);
        
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        product_data: {
                            name: 'T-shirt',
                            description: 'Muscle car ',
                        },
                        currency: 'usd',
                        unit_amount: 2499
                    },
                    quantity: 1
                }
            ],
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