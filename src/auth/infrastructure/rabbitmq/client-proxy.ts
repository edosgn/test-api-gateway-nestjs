import { QUEUES } from '@core/domain/enums/queues.enum';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class ClientProxyMyAPI {
  constructor(private readonly configService: ConfigService) {}

  clientProxyUsers(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: this.configService.get('QUEUES_URL'),
        queue: QUEUES.USER_QUEUE,
        queueOptions: {
          durable: false,
        },
      },
    });
  }
}
