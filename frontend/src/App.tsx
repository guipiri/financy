import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { useAuth } from './contexts/AuthContext';
import Layout from './layouts';
import CategoriesPage from './pages/categories';
import Home from './pages/home';
import Profile from './pages/profile';
import Signup from './pages/signup';
import TransactionsPage from './pages/transactions';

export const routes = {
  signup: {
    isPrivate: false,
    name: 'Cadastro',
    path: '/criar-conta',
    component: Signup,
  },
  home: {
    isPrivate: false,
    name: 'Home',
    path: '/',
    component: Home,
  },
  transactions: {
    isPrivate: true,
    name: 'Transações',
    path: '/transacoes',
    component: TransactionsPage,
  },
  categories: {
    isPrivate: true,
    name: 'Categorias',
    path: '/categorias',
    component: CategoriesPage,
  },
  profile: {
    isPrivate: true,
    name: 'Perfil',
    path: '/perfil',
    component: Profile,
  },
};

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <>Carregando...</>;

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to={routes.home.path} replace />
  );
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <>Carregando...</>;

  return !isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to={routes.home.path} replace />
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
                  <Layout>
                    <route.component />
                  </Layout>
                </PrivateRoute>
              ) : (
                // <PublicRoute>
                <route.component />
                // </PublicRoute>
              )
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
