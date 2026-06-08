import { AiFeedback, Assignment, ChartPoint, Submission, User } from '../types';

export const users: User[] = [
  { id: 'u1', name: 'Paydalanıwshı', email: 'paydalaniwshi@gmail.com', role: 'student', group: 'PI-23-01' },
  { id: 'u2', name: 'Parwaz Kuanishbaeva', email: 'oqitiwshi@gmail.com', role: 'teacher', subject: 'Programmalastırıw tiykarları' },
  { id: 'u3', name: 'Parwaz Kuanishbaeva', email: 'admin@gmail.com', role: 'admin' },
];

export const assignments: Assignment[] = [
  {
    id: 'a1',
    title: 'Eki sannıń úlkenin tabıw',
    subject: 'Python algoritmleri',
    description: 'Eki pútin san berilgen. Solardıń ishindegi úlken sanı ekranǵa shıǵarıń.',
    language: 'Python',
    deadline: '2026-05-24',
    maxScore: 100,
    status: 'checking',
    difficulty: 'Ańsat',
    testCases: [
      { id: 't1', input: '5 8', expectedOutput: '8', actualOutput: '8', passed: true, timeMs: 42 },
      { id: 't2', input: '12 3', expectedOutput: '12', actualOutput: '12', passed: true, timeMs: 39 },
      { id: 't3', input: '-4 -9', expectedOutput: '-4', actualOutput: '-9', passed: false, timeMs: 45 },
    ],
  },
  {
    id: 'a2',
    title: 'Massiv elementleriniń qosındısı',
    subject: 'Maǵlıwmat strukturaları',
    description: 'N san hám massiv berilgen. Barlıq elementler qosındısın tabıń.',
    language: 'JavaScript',
    deadline: '2026-05-29',
    maxScore: 100,
    status: 'submitted',
    score: 94,
    difficulty: 'Orta',
    testCases: [],
  },
  {
    id: 'a3',
    title: 'Jup sanlardı sanaw',
    subject: 'C++ praktikum',
    description: 'Berilgen aralıqtaǵı jup sanlar sanın esaplań.',
    language: 'C++',
    deadline: '2026-06-02',
    maxScore: 100,
    status: 'revision',
    score: 68,
    difficulty: 'Orta',
    testCases: [],
  },
  {
    id: 'a4',
    title: 'Rekursiya menen faktorial',
    subject: 'Algoritmler analizi',
    description: 'N sanı ushın faktorialdı rekursiv funksiya járdeminde esaplań.',
    language: 'Python',
    deadline: '2026-06-10',
    maxScore: 100,
    status: 'error',
    score: 32,
    difficulty: 'Qıyın',
    testCases: [],
  },
];

export const submissions: Submission[] = [
  { id: 's1', assignmentId: 'a1', studentName: 'Aydana Qaljanova', score: 67, status: 'revision', submittedAt: '11.05.2026 10:35', aiSummary: 'Teris sanlar ushın salıstırıw shártin qayta tekseriń.' },
  { id: 's2', assignmentId: 'a2', studentName: 'Rustem Bekmuratov', score: 91, status: 'submitted', submittedAt: '10.05.2026 18:12', aiSummary: 'Sheshim durıs, waqıt quramalılıǵı O(n).' },
  { id: 's3', assignmentId: 'a3', studentName: 'Gúlnaz Saparova', score: 74, status: 'revision', submittedAt: '10.05.2026 15:04', aiSummary: 'Shegara mánislerinde bitta qáte bar.' },
  { id: 's4', assignmentId: 'a4', studentName: 'Bekzat Toqtasınov', score: 45, status: 'error', submittedAt: '09.05.2026 12:50', aiSummary: 'Rekursiya toqtaw shárti kórsetilmegen.' },
];

export const progressData: ChartPoint[] = [
  { name: 'Qañtar', ball: 62, tapsırma: 4 },
  { name: 'Fevral', ball: 71, tapsırma: 5 },
  { name: 'Mart', ball: 78, tapsırma: 6 },
  { name: 'Aprel', ball: 84, tapsırma: 7 },
  { name: 'May', ball: 88, tapsırma: 8 },
];

export const errorStats = [
  { name: 'Sintaksis', value: 28 },
  { name: 'Logika', value: 36 },
  { name: 'Algoritm', value: 22 },
  { name: 'Output', value: 14 },
];

export const aiFeedback: AiFeedback = {
  syntax: 'Kod sintaksisi tiykarınan durıs, biraq inputtı bóliwden keyin sanǵa aylandırıw anıq jazılıwı kerek.',
  logic: 'Teris sanlar salıstırılǵanda shárt natıyjesi nadurıs qaytıp tur. max(a, b) yamasa tolıq if/else paydalanıń.',
  algorithm: 'Bul tapsırma ushın O(1) sheshim jetkilikli. Artiqsha cikl yamasa massiv kerek emes.',
  suggestion: 'Shegara testlerdi aldın qol menen tekserip, keyin kodtı tapsırıń: eki san teń, biri teris, ekewi de teris bolǵan jaǵdaylar.',
};

export const studentRanking = [
  { name: 'Aydana', ball: 88 },
  { name: 'Rustem', ball: 91 },
  { name: 'Gúlnaz', ball: 79 },
  { name: 'Bekzat', ball: 72 },
  { name: 'Sábiná', ball: 86 },
];
