import { DynamicModule, Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { EventsService } from './events.service';

@Module({})
export class EventsModule {
  static forRoot(): DynamicModule {
    return {
      module: EventsModule,
      providers: [EventsGateway, EventsService],
      exports: [EventsService]
    }
  }
}
