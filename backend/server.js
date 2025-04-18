require('dotenv').config();
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

// URLs configuradas en Railway
const PROD_WEB_URL = process.env.PROD_WEB_URL; // URL de tu backend en producción
const PROD_MOBILE_URL = process.env.PROD_MOBILE_URL || 'exp://tu-expo-url';
const FRONTEND_URL = process.env.FRONTEND_URL; // URL de tu frontend React

// URLs para desarrollo local
const DEV_WEB_URL = 'http://localhost:3000';
const DEV_MOBILE_URL = 'exp://192.168.0.160:8081';

const isProduction = process.env.NODE_ENV === 'production';

// Configuración de CORS
const allowedOrigins = [
  PROD_WEB_URL,
  FRONTEND_URL, // Asegúrate de incluir esta
  PROD_MOBILE_URL,
  'http://localhost:3000',
  'http://192.168.0.160:3000',
  'http://localhost:19006',
  'exp://192.168.0.160:8081'
].filter(Boolean); // Filtra valores undefined

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error('Origen bloqueado:', origin);
      callback(new Error('Origen no permitido por CORS'));
    }
  },
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(bodyParser.json());

app.post('/crear-preferencia', async (req, res) => {
  const { items, platform } = req.body;

  // Usamos FRONTEND_URL para las redirecciones (siempre)
  const successUrl = `${FRONTEND_URL}/Padre?status=approved`;
  const failureUrl = `${FRONTEND_URL}/Padre?status=rejected`;

  const preference = {
    items,
    back_urls: {
      success: successUrl,
      failure: failureUrl,
    },
    auto_return: 'approved',
    // NOTA: Si necesitas notification_url, usa PROD_WEB_URL
    notification_url: isProduction ? `${PROD_WEB_URL}/notificaciones` : undefined
  };

  try {
    const response = await axios.post(
      'https://api.mercadopago.com/checkout/preferences',
      preference,
      {
        headers: {
          'Authorization': `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    res.json({
      preferenceId: response.data.id,
      init_point: response.data.init_point
    });
    
  } catch (error) {
    console.error('Error en MercadoPago:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    res.status(500).json({ 
      error: 'Error al crear la preferencia',
      details: error.response?.data || error.message
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor listo en el puerto ${PORT}`);
  console.log('Configuración:');
  console.log('- PROD_WEB_URL:', PROD_WEB_URL);
  console.log('- FRONTEND_URL:', FRONTEND_URL);
  console.log('- Entorno:', isProduction ? 'PRODUCCIÓN' : 'DESARROLLO');
});