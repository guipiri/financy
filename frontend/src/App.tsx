import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { useAuth } from './contexts/AuthContext';
import Dashboard from './pages/dashboard';
import Signin from './pages/signin';
import Signup from './pages/signup';

export const routes = {
  signin: {
    isPrivate: false,
    name: 'Login',
    path: '/login',
    component: Signin,
  },
  signup: {
    isPrivate: false,
    name: 'Cadastro',
    path: '/criar-conta',
    component: Signup,
  },
  dashboard: {
    isPrivate: true,
    name: 'Dashboard',
    path: '/',
    component: Dashboard,
  },
};

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <>Carregando...</>;

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to={routes.signin.path} replace />
  );
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <>Carregando...</>;

  return !isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to={routes.dashboard.path} replace />
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {Object.values(routes).map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              route.isPrivate ? (
                <PrivateRoute>
                  <route.component />
                </PrivateRoute>
              ) : (
                <PublicRoute>
                  <route.component />
                </PublicRoute>
              )
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
