import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PrismaService } from '../prisma/prisma.service';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly AI_SERVICE_URL = 'http://localhost:8001/predict';

  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
  ) {}

  async evaluateStudentRisk(studentId: string) {
    try {
      // Fetch student data, including attendance and grades
      const student = await this.prisma.student.findUnique({
        where: { id: studentId },
        include: {
          attendances: true,
          grades: true,
        },
      });

      if (!student) throw new Error('Student not found');

      // Calculate absences
      const absences = student.attendances.filter(a => a.status === 'ABSENT').length;
      
      // Calculate failures based on grades
      const failures = student.grades.filter(g => (g.score / g.maxScore) < 0.5).length;

      // Prepare payload for the AI model
      const payload = {
        sex: student.gender === 'Female' ? 'F' : 'M',
        age: this.calculateAge(student.dateOfBirth),
        address: student.address?.includes('Urban') ? 'U' : 'R',
        absences: absences,
        failures: failures,
      };

      // Call the Python AI Service
      const response = await firstValueFrom(
        this.httpService.post(this.AI_SERVICE_URL, payload)
      );

      const { needs_support, risk_probability } = response.data;

      // Update the database flag
      await this.prisma.student.update({
        where: { id: student.id },
        data: { 
          needsSupport: needs_support,
          riskScore: risk_probability
        },
      });

      this.logger.log(`Evaluated student ${student.firstName}: Risk=${risk_probability.toFixed(2)} Support=${needs_support}`);
      
      return response.data;

    } catch (error) {
      this.logger.error('Failed to evaluate student risk', error);
      throw error;
    }
  }

  private calculateAge(dob: Date | null): number {
    if (!dob) return 15; // default fallback
    const diff_ms = Date.now() - dob.getTime();
    const age_dt = new Date(diff_ms); 
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }
}
