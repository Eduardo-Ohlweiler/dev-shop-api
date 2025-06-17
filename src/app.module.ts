import { Module } from '@nestjs/common';
import modules from './modules';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const host     = config.get<string>("DB_HOST")          || 'localhost';
        const port     = Number(config.get<string>("DB_PORT"))  || 5432;
        const username = config.get<string>("DB_USER")          || 'postgres';
        const password = config.get<string>("DB_PASSWORD");
        const database = config.get<string>("DB_NAME")          || 'dev_shop';
        const ambiente = config.get<string>("NODE_ENV");
        return {
          type: "postgres",
          host,
          port,
          username,
          password,
          database,
          autoLoadEntities: true,
          synchronize: ambiente !== 'prod'
        }
      }
    }),
    ...modules
  ],
})
export class AppModule {}
