export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT';
  isActive: boolean;
  mustChangePassword?: boolean;
}

export interface StudentProfile {
  id: string;
  userId: string;
  studentCode: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  phoneNumber?: string;
}

export interface TeacherProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface ParentProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  phone?: string;
  email?: string;
}
