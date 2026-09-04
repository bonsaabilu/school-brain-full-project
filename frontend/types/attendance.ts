export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';

export interface Attendance {
  id: string;
  studentId: string;
  classSubjectId: string;
  teacherId: string;
  date: string;
  status: AttendanceStatus;
  createdAt: string;
}
