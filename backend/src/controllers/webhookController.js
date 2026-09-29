const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const { MercadoPagoConfig, Payment } = require('mercadopago');

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

const receiveWebhook = async (req, res) => {
    try {
        const paymentId = req.query.id || req.body.data?.id;

        if (req.query.type === 'payment' || req.body.type === 'payment') {
            const paymentApi = new Payment(client);
            const paymentInfo = await paymentApi.get({ id: paymentId });

            if (paymentInfo.status === 'approved') {
                const orderId = paymentInfo.external_reference;
                const order = await Order.findById(orderId);

                if (order && order.status === 'PENDIENTE') {
                    order.status = 'PAGADO';
                    order.paymentDetails = paymentInfo;
                    await order.save();

                    for (const item of order.items) {
                        await Product.findByIdAndUpdate(item.id, {
                            $inc: { stock: -item.quantity }
                        });
                    }
                }
            }
        }

        res.status(200).send('Webhook OK');
    } catch (error) {
        console.error("Error en webhook:", error);
        res.status(500).send('Error procesando webhook');
    }
};

module.exports = { receiveWebhook };
