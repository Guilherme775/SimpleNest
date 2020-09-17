import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const options: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'src/database/db.sqlite',
  synchronize: false,
  logging: true,
  entities: [path.resolve(__dirname, '..', 'database', 'models', '*')],
  migrations: [path.resolve(__dirname, '..', 'database', 'migrations', '*')],
};

module.exports = options;
