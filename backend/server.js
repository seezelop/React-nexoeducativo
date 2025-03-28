require('dotenv').config();
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Configuración de CORS para aceptar múltiples orígenes (React web + React Native)
const allowedOrigins = [
  'http://localhost:3000',
  'http://192.168.0.160:3000',        // React web (desarrollo)
  'http://localhost:19006',     // Expo (React Native)
  'exp://192.168.0.160:8081',    // Expo en Android fisico
];

app.use(cors({
  origin: function (origin, callback) {
    // Permitir solicitudes sin origen (como apps móviles o Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origen no permitido por CORS'));
    }
  },
  methods: ['GET', 'POST'],
}));

app.use(bodyParser.json());

// Ruta para crear preferencia de pago (compatible con web y mobile)
app.post('/crear-preferencia', async (req, res) => {
  const { items, platform } = req.body;

  const successUrl = platform === 'web'
    ? 'http://localhost:3000/padre'          // React web
    : 'exp://192.168.0.160:8081/padre';      // React Native (Expo)
console.log('lo que esta en successurl: '+successUrl)
  const failureUrl = platform === 'web'
    ? 'http://localhost:3000/padre'
    : 'exp://192.168.0.160:8081/pago-fallido';

  const preference = {
    items,
    back_urls: {
      success: successUrl,
      failure: failureUrl,
    },
    auto_return: platform === 'web' ? 'approved' : undefined,
  };

  console.log('la prefernecias XD '+preference)

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
      init_point: response.data.sandbox_init_point // Usa sandbox para desarrollo
    });
  } catch (error) {
    console.error('Error en MercadoPago:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error al crear la preferencia' });
  }
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor listo en http://localhost:${PORT}`);
});