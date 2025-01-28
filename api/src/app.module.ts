import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config'; //process.env
import { Name } from './name.entity';
import typeorm from './config/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config available globally for process.env to work
      load: [typeorm]
    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: process.env.DATABASE_HOST,
    //   port: parseInt(process.env.DATABASE_PORT),
    //   username: process.env.DB_USERNAME,
    //   password: process.env.DB_PASSWORD,
    //   database: process.env.DATABASE_NAME,
    //   entities: [Name],
    //   synchronize: true,
    //   logging: true,
    // }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }),
    TypeOrmModule.forFeature([Name])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // constructor() {
  //   console.log('Database Host:', process.env.DATABASE_HOST);
  //   console.log('Database Port:', process.env.DATABASE_PORT);
  //   console.log('Database Username:', process.env.DB_USERNAME);
  //   console.log('Database Name:', process.env.DATABASE_NAME);
  // }
}
