import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';
import { Pool } from 'pg';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, '..', 'dist');
const isProduction = process.env.NODE_ENV === 'production';

const app = express();
const PORT = process.env.PORT || process.env.API_PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev-ai-tekseriw-secret';

app.use(cors());
app.use(express.json({ limit: '1mb' }));

const databaseUrl = process.env.DATABASE_URL;
const useDatabaseSsl =
  process.env.DATABASE_SSL === 'true' ||
  (databaseUrl && /render\.com|sslmode=require/i.test(databaseUrl));

export const pool = databaseUrl
  ? new Pool({
      connectionString: databaseUrl,
      ssl: useDatabaseSsl ? { rejectUnauthorized: false } : false,
    })
  : null;

const users = [
  { id: 'u1', name: 'Paydalanıwshı', email: 'paydalaniwshi@gmail.com', role: 'student', group: 'PI-23-01' },
  { id: 'u2', name: 'Parwaz Kuanishbaeva', email: 'oqitiwshi@gmail.com', role: 'teacher', subject: 'Programmalastırıw tiykarları' },
  { id: 'u3', name: 'Parwaz Kuanishbaeva', email: 'admin@gmail.com', role: 'admin' },
];

const assignments = [
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
      { id: 't1', input: '5 8', expectedOutput: '8' },
      { id: 't2', input: '12 3', expectedOutput: '12' },
      { id: 't3', input: '-4 -9', expectedOutput: '-4' },
    ],
  },
];

const submissions = [
  { id: 's1', assignmentId: 'a1', studentId: 'u1', studentName: 'Aydana Qaljanova', score: 67, status: 'revision', submittedAt: '11.05.2026 10:35', aiSummary: 'Teris sanlar ushın salıstırıw shártin qayta tekseriń.' },
];

function signToken(user) {
  return jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
}

function authenticate(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = users.find((item) => item.id === payload.sub);
    if (!user) return res.status(401).json({ message: 'Paydalanıwshı tabılmadı' });
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: 'Avtorizaciya qátesi' });
  }
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Bul ámel ushın ruqsat joq' });
    }
    next();
  };
}

function aiFeedbackFor(code, score) {
  return {
    syntax: code.includes('print') || code.includes('console.log') ? 'Sintaksis tiykarınan durıs.' : 'Shıǵarıw operatorı anıq kórinbey tur.',
    logic: score === 100 ? 'Logikalıq sheshim testlerdiń barlıǵınan ótti.' : 'Shegara jaǵdaylarda salıstırıw shártin qayta tekseriń.',
    algorithm: 'Bul tapsırma ushın O(1) sheshim jetkilikli.',
    suggestion: 'Eki san teń, biri teris, ekewi de teris jaǵdayların ayrıqsha test etip kóriń.',
  };
}

function checkCode(code, testCases) {
  const canCompare = /max\s*\(|if|else|>/.test(code);
  const handlesNegative = code.includes('-') || code.includes('max');
  const results = testCases.map((testCase) => {
    const [a, b] = testCase.input.split(/\s+/).map(Number);
    const expectedOutput = String(Math.max(a, b));
    const actualOutput = canCompare && (handlesNegative || (a >= 0 && b >= 0)) ? expectedOutput : String(Math.min(a, b));
    return {
      ...testCase,
      expectedOutput,
      actualOutput,
      passed: actualOutput.trim() === expectedOutput.trim(),
      timeMs: Math.floor(25 + Math.random() * 35),
    };
  });
  const score = Math.round((results.filter((item) => item.passed).length / results.length) * 100);
  return { results, score, feedback: aiFeedbackFor(code, score) };
}

app.get('/api/health', (_req, res) => res.json({ status: 'islep tur', service: 'AI tekseriw API' }));

app.post('/api/auth/register', (req, res) => {
  const { name, email, role = 'student' } = req.body;
  if (!name || !email) return res.status(400).json({ message: 'Atı hám email kerek' });
  const user = { id: `u${users.length + 1}`, name, email, role };
  users.push(user);
  res.status(201).json({ user, token: signToken(user) });
});

app.post('/api/auth/login', (req, res) => {
  const { email, role } = req.body;
  const user = users.find((item) => item.email === email && item.role === role) || users.find((item) => item.role === role);
  if (!user) return res.status(401).json({ message: 'Email yamasa rol nadurıs' });
  res.json({ user, token: signToken(user) });
});

app.get('/api/auth/me', authenticate, (req, res) => res.json(req.user));

app.get('/api/assignments', authenticate, (_req, res) => res.json(assignments));
app.post('/api/assignments', authenticate, requireRole('teacher', 'admin'), (req, res) => {
  const assignment = { id: `a${assignments.length + 1}`, status: 'checking', testCases: [], ...req.body };
  assignments.push(assignment);
  res.status(201).json(assignment);
});
app.get('/api/assignments/:id', authenticate, (req, res) => {
  const assignment = assignments.find((item) => item.id === req.params.id);
  if (!assignment) return res.status(404).json({ message: 'Tapsırma tabılmadı' });
  res.json(assignment);
});
app.put('/api/assignments/:id', authenticate, requireRole('teacher', 'admin'), (req, res) => {
  const index = assignments.findIndex((item) => item.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Tapsırma tabılmadı' });
  assignments[index] = { ...assignments[index], ...req.body };
  res.json(assignments[index]);
});
app.delete('/api/assignments/:id', authenticate, requireRole('teacher', 'admin'), (req, res) => {
  const index = assignments.findIndex((item) => item.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Tapsırma tabılmadı' });
  assignments.splice(index, 1);
  res.status(204).send();
});

app.post('/api/submissions', authenticate, requireRole('student', 'admin'), (req, res) => {
  const submission = { id: `s${submissions.length + 1}`, studentId: req.user.id, studentName: req.user.name, submittedAt: new Date().toLocaleString('uz-UZ'), ...req.body };
  submissions.push(submission);
  res.status(201).json(submission);
});
app.get('/api/submissions/:id', authenticate, (req, res) => res.json(submissions.find((item) => item.id === req.params.id)));
app.get('/api/submissions/student/:studentId', authenticate, (req, res) => res.json(submissions.filter((item) => item.studentId === req.params.studentId)));
app.get('/api/submissions/assignment/:assignmentId', authenticate, (req, res) => res.json(submissions.filter((item) => item.assignmentId === req.params.assignmentId)));

app.post('/api/check-code', authenticate, (req, res) => {
  const assignment = assignments.find((item) => item.id === req.body.assignmentId) || assignments[0];
  res.json(checkCode(req.body.code || '', req.body.testCases || assignment.testCases));
});

app.post('/api/ai-feedback', authenticate, (req, res) => {
  res.json(aiFeedbackFor(req.body.code || '', req.body.score || 0));
});

app.get('/api/reports/teacher', authenticate, requireRole('teacher', 'admin'), (_req, res) => {
  res.json({ totalStudents: 128, totalAssignments: assignments.length, checkedSubmissions: submissions.length, averageScore: 82 });
});
app.get('/api/reports/student', authenticate, (_req, res) => {
  res.json({ totalAssignments: assignments.length, completed: 1, averageScore: 88, recommendations: 12 });
});

if (isProduction) {
  app.use(express.static(distPath));
  app.get('/{*splat}', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`AI Tekseriw ${isProduction ? 'platforması' : 'API'} http://0.0.0.0:${PORT} adresinde islep tur`);
});
