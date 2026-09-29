const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: {
        name: { type: String, required: true },
        surname: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true }
    },
    items: [
        {
            id: { type: String, required: true },
            title: { type: String, required: true },
            unit_price: { type: Number, required: true },
            quantity: { type: Number, required: true }
        }
    ],
    total: { type: Number, required: true },
    status: { 
        type: String, 
        enum: ['PENDIENTE', 'PAGADO', 'PREPARANDO', 'ENVIADO', 'ENTREGADO', 'CANCELADO'], 
        default: 'PENDIENTE' 
    },
    paymentDetails: { type: Object }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
