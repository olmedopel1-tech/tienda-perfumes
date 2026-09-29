const express = require('express');
const router = express.Router();
const { createPreference } = require('../controllers/paymentController');
const { receiveWebhook } = require('../controllers/webhookController');

router.post('/create_preference', createPreference);
router.post('/webhook', receiveWebhook);

module.exports = router;
