

import { Injectable, Logger } from '@nestjs/common';
import { EventsGateway } from './events.gateway';

@Injectable()
export class EventsService {
    private readonly logger = new Logger(EventsService.name);

    constructor(private readonly eventsGateway: EventsGateway) { }

    emitEvent({ id, data }): boolean {
        this.logger.log(`Event - Room: ${id} | Data: ${JSON.stringify(data)}`);
        return this.eventsGateway.server.to(id).emit('events', data);
    }
}
