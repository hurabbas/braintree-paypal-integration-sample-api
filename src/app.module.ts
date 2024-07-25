import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from '@algoan/nestjs-logging-interceptor';
import { appConfigSchema } from './app-config.schema';
import { PrismaModule } from './prisma/prisma.module';
import { EncryptionModule } from './encryption/encryption.module';
import { PaymentGatewayModule } from './payment-gateway/payment-gateway.module';
import { PaypalModule } from './paypal/paypal.module';
import { BraintreeModule } from './braintree/braintree.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.APP_ENV}`],
      validationSchema: appConfigSchema,
    }),
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          pinoHttp: {
            level: config.get<string>('LOG_LEVEL') || 'info',
            customProps: (req, res) => ({
              context: 'HTTP',
            }),
            transport:
              config.get<string>('APP_ENV') === 'dev'
                ? {
                    target: 'pino-pretty',
                    options: {
                      singleLine: true,
                    },
                  }
                : undefined,
          },
        };
      },
    }),
    PrismaModule,
    EncryptionModule,
    PaymentGatewayModule,
    PaypalModule,
    BraintreeModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useFactory: () =>
        new LoggingInterceptor({
          userPrefix: 'Braintree Paypal Integration - API',
        }),
    },
  ],
})
export class AppModule {}
