const { MercadoPagoConfig, Preference } = require('mercadopago');
const Product = require('../models/productModel');
const Order = require('../models/orderModel');

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

const createPreference = async (req, res) => {
    try {
        const { items, customerData } = req.body; 

        let totalAmount = 0;
        const preferenceItems = [];

        for (const item of items) {
            const product = await Product.findById(item.id);
            if (!product || product.stock < item.quantity) {
                return res.status(400).json({ error: `Stock insuficiente para ${product ? product.name : 'un producto'}` });
            }

            preferenceItems.push({
                id: product._id.toString(),
                title: product.name,
                unit_price: Number(product.price),
                quantity: Number(item.quantity),
                currency_id: 'ARS'
            });

            totalAmount += product.price * item.quantity;
        }

        const newOrder = await Order.create({
            customer: customerData,
            items: preferenceItems,
            total: totalAmount,
            status: 'PENDIENTE'
        });

        const preference = new Preference(client);
        const result = await preference.create({
            body: {
                items: preferenceItems,
                payer: {
                    name: customerData.name,
                    surname: customerData.surname,
                    email: customerData.email,
                    phone: { number: customerData.phone },
                    address: { street_name: customerData.address }
                },
                back_urls: {
                    success: `${process.env.FRONTEND_URL}/pago-exitoso`,
                    pending: `${process.env.FRONTEND_URL}/pago-pendiente`,
                    failure: `${process.env.FRONTEND_URL}/pago-fallido`,
                },
                auto_return: 'approved',
                external_reference: newOrder._id.toString()
            }
        });

        res.status(200).json({ preferenceId: result.id });

    } catch (error) {
        console.error("Error al crear preferencia:", error);
        res.status(500).json({ error: 'Error al procesar el pago' });
    }
};

module.exports = { createPreference };
