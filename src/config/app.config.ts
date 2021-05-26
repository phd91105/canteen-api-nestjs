import 'dotenv/config';

const AppConfiguration = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 8080,
  jwt: {
    secret: process.env.JWT_SECRET || 'sAmPlEsEcReT',
    expiration: '3d',
  },
  redis: {
    master: {
      host: process.env.REDIS_MASTER_HOST || 'localhost',
      port: Number(process.env.REDIS_MASTER_PORT) || 6379,
    },
    slave: {
      host: process.env.REDIS_SLAVE_HOST || 'localhost',
      port: Number(process.env.REDIS_SLAVE_PORT) || 6379,
    },
  },
  payment: {
    momo: {
      partnerCode: process.env.PARTNER_CODE,
      accessKey: process.env.ACCESS_KEY,
      secret: process.env.MOMO_SECRET,
      returnUrl: process.env.MOMO_RETURN_URL,
    },
    vnpay: {
      secret: process.env.SECURE_SECRET,
      merchant: process.env.MERCHANT,
      returnUrl: process.env.VNP_RETURN_URL,
    },
  },
};

export default AppConfiguration;
