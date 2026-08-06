import Navbar from '../components/navbar';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-100 text-gray-800 p-4 sm:p-6 md:p-8 lg:p-10">
        {children}
      </main>
    </>
  );
}

export default Layout;
