import cors from 'cors';
import config from '../config/environment';

const allowedOrigins = [
  config.frontendUrl,
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173',
];

const vercelSuffixes = ['.vercel.app', '.vercel.com'];

const corsOptions: cors.CorsOptions = {
  origin: function (origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    if (config.nodeEnv === 'production') {
      try {
        const hostname = new URL(origin).hostname;
        if (vercelSuffixes.some((suffix) => hostname.endsWith(suffix))) {
          return callback(null, true);
        }
      } catch {}
    }

    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
  ],
  exposedHeaders: ['X-RateLimit-Limit', 'X-RateLimit-Remaining'],
  maxAge: 86400,
};

export default cors(corsOptions);
