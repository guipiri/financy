import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/layouts';
import Dashboard from './dashboard';
import Signin from './signin';

function Home() {
  const { isAuthenticated, loading } = useAuth();
  console.log(loading);

  if (loading) return null;

  if (!isAuthenticated) return <Signin />;

  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
}

export default Home;
