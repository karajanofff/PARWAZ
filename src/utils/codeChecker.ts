import { AiFeedback, TestCase } from '../types';
import { aiFeedback } from '../data/mockData';

const normalize = (value: string) => value.trim().replace(/\s+/g, ' ');

export function mockCheckCode(code: string, testCases: TestCase[]): { cases: TestCase[]; score: number; feedback: AiFeedback } {
  const mentionsMax = /max\s*\(|if|else|>/.test(code);
  const handlesNegative = code.includes('-') || code.includes('max');

  const cases = testCases.map((testCase) => {
    const [a, b] = testCase.input.split(/\s+/).map(Number);
    const expected = String(Math.max(a, b));
    const willPass = mentionsMax && (handlesNegative || (a >= 0 && b >= 0));
    return {
      ...testCase,
      actualOutput: willPass ? expected : String(Math.min(a, b)),
      expectedOutput: expected,
      passed: normalize(willPass ? expected : String(Math.min(a, b))) === normalize(expected),
      timeMs: Math.floor(28 + Math.random() * 31),
    };
  });

  const passed = cases.filter((item) => item.passed).length;
  const score = Math.round((passed / Math.max(cases.length, 1)) * 100);
  return { cases, score, feedback: aiFeedback };
}
