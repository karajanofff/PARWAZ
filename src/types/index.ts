export type Role = 'student' | 'teacher' | 'admin';
export type Status = 'submitted' | 'revision' | 'error' | 'checking';
export type Language = 'Python' | 'JavaScript' | 'C++';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  group?: string;
  subject?: string;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  description: string;
  language: Language;
  deadline: string;
  maxScore: number;
  status: Status;
  score?: number;
  difficulty: 'Ańsat' | 'Orta' | 'Qıyın';
  testCases: TestCase[];
}

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  actualOutput?: string;
  passed?: boolean;
  timeMs?: number;
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentName: string;
  score: number;
  status: Status;
  submittedAt: string;
  aiSummary: string;
}

export interface ChartPoint {
  name: string;
  ball: number;
  tapsırma?: number;
}

export interface AiFeedback {
  syntax: string;
  logic: string;
  algorithm: string;
  suggestion: string;
}
