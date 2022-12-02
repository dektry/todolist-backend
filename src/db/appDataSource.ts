import { DataSource } from 'typeorm';

import dotenv from 'dotenv';

dotenv.config();

export const myDataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST || 'localhost',
  port: +process.env.MYSQL_PORT || 3307,
  username: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DB || 'yourdb',
  entities: [__dirname + '/../**/*.entity.js'],
  migrationsTableName: '__migrations',
  migrations: ['dist/src/**/migration/*.js'],
  logging: true,
  // synchronize: true,
});
