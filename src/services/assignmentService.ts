import { Assignment } from '../types';
import { assignments } from '../data/mockData';

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('ai_tekseriw_token') ?? ''}`,
});

export async function getAssignments(): Promise<Assignment[]> {
  try {
    const response = await fetch('/api/assignments', { headers: authHeaders() });
    if (!response.ok) throw new Error('Tapsırmalar júklenbedi');
    return (await response.json()) as Assignment[];
  } catch {
    await new Promise((resolve) => setTimeout(resolve, 260));
    return assignments;
  }
}

export async function getAssignment(id: string): Promise<Assignment | undefined> {
  try {
    const response = await fetch(`/api/assignments/${id}`, { headers: authHeaders() });
    if (!response.ok) throw new Error('Tapsırma tabılmadı');
    return (await response.json()) as Assignment;
  } catch {
    await new Promise((resolve) => setTimeout(resolve, 180));
    return assignments.find((assignment) => assignment.id === id);
  }
}
