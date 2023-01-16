import { registerAs } from '@nestjs/config';
import { env } from 'process';

export default registerAs('database', () => ({
  type: 'postgres',
  host: process.env.DB_HOST || '',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || '',
  synchronize: false,
}));