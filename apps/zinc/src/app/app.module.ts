import { Module } from '@nestjs/common';
import { CoreModule } from '@zinc/core';
import { AdminUiModule } from '@zinc/admin-ui';
import { DatabaseModule } from '@zinc/database';

@Module({
  imports: [
    CoreModule,
    AdminUiModule,
    DatabaseModule.register({
      engine: 'mysql2',
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'root',
      database: 'zinc',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
