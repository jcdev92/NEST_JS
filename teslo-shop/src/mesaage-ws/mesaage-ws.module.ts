import { Module } from '@nestjs/common';
import { MesaageWsService } from './mesaage-ws.service';
import { MesaageWsGateway } from './mesaage-ws.gateway';

@Module({
  providers: [MesaageWsGateway, MesaageWsService],
})
export class MesaageWsModule {}
