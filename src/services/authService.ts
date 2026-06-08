import { Role, User } from '../types';
import { users } from '../data/mockData';

export async function login(email: string, role: Role): Promise<User> {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, role }),
    });
    if (!response.ok) throw new Error('Login qátesi');
    const data = (await response.json()) as { user: User; token: string };
    localStorage.setItem('ai_tekseriw_token', data.token);
    return data.user;
  } catch {
    await new Promise((resolve) => setTimeout(resolve, 450));
    return users.find((user) => user.role === role && user.email === email) ?? users.find((user) => user.role === role)!;
  }
}

export async function getMe(role: Role): Promise<User> {
  const token = localStorage.getItem('ai_tekseriw_token');
  if (token) {
    try {
      const response = await fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } });
      if (response.ok) return (await response.json()) as User;
    } catch {
      localStorage.removeItem('ai_tekseriw_token');
    }
  }
  await new Promise((resolve) => setTimeout(resolve, 180));
  return users.find((user) => user.role === role)!;
}
