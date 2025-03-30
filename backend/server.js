require('dotenv').config();
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

const allowedOrigins = [
  'http://localhost:3000',
  'http://192.168.0.160:3000',
  'http://localhost:19006',
  'exp://192.168.0.160:8081',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origen no permitido'));
    }
  },
  methods: ['GET', 'POST'],
}));

app.use(bodyParser.json());

app.post('/crear-preferencia', async (req, res) => {
  const { items, platform } = req.body;

  // URLs con parámetro status
  const successUrl = platform === 'web'
    ? 'http://localhost:3000/Padre?status=approved'
    : 'exp://192.168.0.160:8081/padre?status=approved';

  const failureUrl = platform === 'web'
    ? 'http://localhost:3000/Padre?status=rejected'
    : 'exp://192.168.0.160:8081/padre?status=rejected';

  const preference = {
    items,
    back_urls: {
      success: successUrl,
      failure: failureUrl,
    },
    auto_return: 'approved', // Forzar auto-redirección
  };

  try {
    const response = await axios.post(
      'https://api.mercadopago.com/checkout/preferences',
      preference,
      {
        headers: {
          Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
        },
      }
    );
    
    res.json({
      preferenceId: response.data.id,
      init_point: response.data.init_point // Usar init_point real
    });
    
  } catch (error) {
    console.error('Error en MercadoPago:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error al crear la preferencia' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor listo en http://localhost:${PORT}`);
});