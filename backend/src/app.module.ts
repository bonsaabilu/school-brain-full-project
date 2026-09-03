import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { StudentsModule } from './students/students.module';
import { GradesModule } from './grades/grades.module';
import { AttendancesModule } from './attendances/attendances.module';
import { SubjectsModule } from './subjects/subjects.module';
import { ClassesModule } from './classes/classes.module';
import { ParentsModule } from './parents/parents.module';
import { TeachersModule } from './teachers/teachers.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, StudentsModule, TeachersModule, ParentsModule, ClassesModule, SubjectsModule, AttendancesModule, GradesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
