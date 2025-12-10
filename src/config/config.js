import dotenv from 'dotenv';
dotenv.config();

const config = {
  // Server config
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',

  // Database config
  mongodbUri: process.env.MONGODB_URI,

  // Authentication config
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: '7d',

  // Bcrypt config
  bcryptSaltRounds: 10
};

// Validate required environment variables
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnvVars.join(', ')}\n` +
    'Please check your .env file.'
  );
}

export default config;
