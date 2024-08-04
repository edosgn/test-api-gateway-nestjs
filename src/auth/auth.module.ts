import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';

import { AuthController } from './infrastructure/controllers/auth.controller';

import { ClientProxyAlegra } from './infrastructure/rabbitmq/client-proxy';
import { ILoginRepository } from './domain/repositories/login.repository';
import { LoginRepositoryImpl } from './infrastructure/repositories/login.repository.impl';
import { ILoginService } from './domain/services/login.service';
import { LoginServiceImpl } from './infrastructure/services/login.service.impl';
import { ILoginUseCase } from './domain/ports/login.use-case';
import { LoginUseCase } from './application/use-cases/login.use-case';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '8h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    ClientProxyAlegra,
    {
      provide: ILoginRepository,
      useClass: LoginRepositoryImpl,
    },
    {
      provide: ILoginService,
      useClass: LoginServiceImpl,
    },
    {
      provide: ILoginUseCase,
      useClass: LoginUseCase,
    },
  ],
  exports: [JwtModule, ClientProxyAlegra],
})
export class AuthModule {}
