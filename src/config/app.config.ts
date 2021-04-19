type AppConfigurationType = {
  nodeEnv: string;
  port: number;
  jwt: {
    secret: string;
    expiration: number;
  };
  redis: {
    master: {
      host: string;
      port: number;
    };
    slave: {
      host: string;
      port: number;
    };
  };
  payment: {
    momo: {
      partnerCode: string;
      accessKey: string;
      secret: string;
      returnUrl: string;
    };
    vnpay: {
      secret: string;
      merchant: string;
      returnUrl: string;
    };
  };
};

const AppConfiguration: AppConfigurationType = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 8080,
  jwt: {
    secret: process.env.JWT_SECRET || 'sAmPlEsEcReT',
    expiration: 3600,
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
