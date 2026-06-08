import { Submission } from '../types';
import { submissions } from '../data/mockData';

export async function getSubmissions(): Promise<Submission[]> {
  try {
    const token = localStorage.getItem('ai_tekseriw_token') ?? '';
    const response = await fetch('/api/submissions/assignment/a1', { headers: { Authorization: `Bearer ${token}` } });
    if (!response.ok) throw new Error('Nátiyjeler júklenbedi');
    return (await response.json()) as Submission[];
  } catch {
    await new Promise((resolve) => setTimeout(resolve, 240));
    return submissions;
  }
}
