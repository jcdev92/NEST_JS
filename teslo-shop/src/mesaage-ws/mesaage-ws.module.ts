import { Module } from '@nestjs/common';
import { MesaageWsService } from './mesaage-ws.service';
import { MesaageWsGateway } from './mesaage-ws.gateway';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [MesaageWsGateway, MesaageWsService],
  imports: [AuthModule],
})
export class MesaageWsModule {}
