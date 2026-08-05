import Navbar from '../components/navbar';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-100 text-gray-800 p-4 sm:p-8 md:p-10 lg:p-12">
        {children}
      </main>
    </>
  );
}

export default Layout;
