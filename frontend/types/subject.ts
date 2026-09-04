export interface Subject {
  id: string;
  name: string;
  code: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClassSubject {
  id: string;
  classId: string;
  subjectId: string;
  teacherId?: string;
}
