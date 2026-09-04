import { Module } from '@nestjs/common';



import { PrismaModule } from '../prisma/prisma.module';
import { AttendanceController } from './attendances.controller';
import { AttendanceService } from './attendances.service';

@Module({
  imports: [PrismaModule],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule { }