import { useMemo, useState } from 'react';
import { AppShell } from './components/layout/AppShell';
import { ViewKey } from './components/layout/Sidebar';
import { users } from './data/mockData';
import { AdminDashboard } from './pages/AdminDashboard';
import { AssignmentDetail } from './pages/AssignmentDetail';
import { CheckResult } from './pages/CheckResult';
import { CreateAssignment } from './pages/CreateAssignment';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { StudentDashboard } from './pages/StudentDashboard';
import { TeacherDashboard } from './pages/TeacherDashboard';
import { Role, User } from './types';

export default function App() {
  const [view, setView] = useState<ViewKey>('landing');
  const [role, setRole] = useState<Role>('student');
  const [user, setUser] = useState<User | null>(null);
  const [assignmentId, setAssignmentId] = useState('a1');

  const activeUser = useMemo(() => user ?? users.find((item) => item.role === role)!, [role, user]);

  const openAssignment = (id: string) => {
    setAssignmentId(id);
    setView('assignment');
  };

  const login = (nextUser: User, nextRole: Role) => {
    setUser(nextUser);
    setRole(nextRole);
    setView(nextRole);
  };

  const logout = () => {
    setUser(null);
    setRole('student');
    setView('landing');
  };

  if (view === 'landing') {
    return <LandingPage onLogin={() => setView('login')} />;
  }

  if (view === 'login') {
    return <LoginPage onLogin={login} />;
  }

  const content = () => {
    switch (view) {
      case 'teacher':
        return <TeacherDashboard onCreate={() => setView('create')} />;
      case 'admin':
        return <AdminDashboard />;
      case 'assignment':
        return <AssignmentDetail assignmentId={assignmentId} onBack={() => setView(role)} onResult={() => setView('result')} />;
      case 'create':
        return <CreateAssignment onSaved={() => setView('teacher')} />;
      case 'result':
        return <CheckResult onRetry={() => setView('assignment')} />;
      case 'student':
      default:
        return <StudentDashboard onOpenAssignment={openAssignment} onOpenResult={() => setView('result')} />;
    }
  };

  return (
    <AppShell user={activeUser} role={role} activeView={view} onNavigate={setView} onLogout={logout}>
      {content()}
    </AppShell>
  );
}
