import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentController } from './appointment/appointment.controller';

@Module({
  imports: [],
  controllers: [AppController, AppointmentController],
  providers: [AppService],
})
export class AppModule {}
