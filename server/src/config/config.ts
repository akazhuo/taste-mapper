import dotenv from 'dotenv';
import path from 'node:path'

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  appId: string;
  appSecret: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  appId: process.env.APP_ID || '',
  appSecret: process.env.APP_SECRET || '',
};

export default config;