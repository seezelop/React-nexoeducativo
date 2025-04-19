require('dotenv').config();
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// URLs base para producción y desarrollo
const PROD_WEB_URL = process.env.PROD_WEB_URL;
const PROD_MOBILE_URL = process.env.PROD_MOBILE_URL || 'exp://tu-expo-url';
const FRONTEND_URL=process.env.FRONTEND_URL

// URLs para entorno local
const DEV_WEB_URL = 'http://localhost:3000';
const DEV_MOBILE_URL = 'exp://192.168.0.160:8081';

// Determinar si estamos en producción (Railway) o desarrollo
const isProduction = process.env.NODE_ENV === 'production';

// Configurar orígenes permitidos basados en el entorno
const allowedOrigins = [
  // URLs de producción
  PROD_WEB_URL,
  PROD_MOBILE_URL,
  process.env.FRONTEND_URL,
  process.env.REACT_APP_BACKEND_URL,
  // URLs de desarrollo
  'http://localhost:3000',
  'http://192.168.0.160:3000',
  'http://localhost:19006',
  'exp://192.168.0.160:8081',
];

// Añade estas líneas después de las URLs permitidas
console.log('URLS permitidas:', allowedOrigins);

app.use(cors({
  origin: function (origin, callback) {
    console.log('Origen de la solicitud:', origin); // Para debugging
  
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('Origen rechazado:', origin);
      callback(null, false); 
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'], 
  allowedHeaders:  ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Access-Control-Allow-Headers', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Methods'], 
  credentials: true,
}));
app.use(bodyParser.json());

app.post('/crear-preferencia', async (req, res) => {
  const { items, platform } = req.body;

  // Determinar las URLs base según el entorno
  const baseMobileUrl = isProduction ? PROD_MOBILE_URL : DEV_MOBILE_URL;
  const frontReact= isProduction ? FRONTEND_URL : DEV_WEB_URL
  // URLs con parámetro status
  const successUrl = platform === 'web'
    ? `${frontReact}/Padre?status=approved`
    : `${baseMobileUrl}/padre?status=approved`;

  const failureUrl = platform === 'web'
    ? `${frontReact}/Padre?status=rejected`
    : `${baseMobileUrl}/padre?status=rejected`;

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

// Ruta de prueba para verificar que el servidor está funcionando
app.get('/', (req, res) => {
  res.send('API de MercadoPago funcionando correctamente');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor listo en el puerto ${PORT}`);
});