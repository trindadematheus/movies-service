import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import databaseConfig from './config/database';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TestService } from './test/test.service';
import { ExampleService } from './example/example.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    TypeOrmModule.forRoot(databaseConfig()),
    UserModule,
    AuthModule,
  ],
  providers: [TestService, ExampleService],
})
export class AppModule {}
