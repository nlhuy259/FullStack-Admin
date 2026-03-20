import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { InventoryModule } from './modules/inventories/inventory.module';
import { InvoicesModule } from './modules/invoices/invoices.module';
import { UserStoreModule } from './modules/user-store/user-store.module';
import { ProductsModule } from './modules/products/products.module';
import { StoresModule } from './modules/stores/stores.module';
import { CategoryModule } from './modules/categories/category.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/passport/jwt-auth.guard';
@Module({
  imports: [
    CategoryModule,
    InventoryModule,
    InvoicesModule,
    UserStoreModule,
    ProductsModule,
    StoresModule,
    UsersModule,
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
