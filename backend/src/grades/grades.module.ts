import { Module } from '@nestjs/common';



import { PrismaModule } from '../prisma/prisma.module';
import { GradeController } from './grades.controller';
import { GradeService } from './grades.service';

@Module({
  imports: [PrismaModule],
  controllers: [GradeController],
  providers: [GradeService],
})
export class GradeModule { }