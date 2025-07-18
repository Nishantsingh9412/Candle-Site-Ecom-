import { Outlet } from 'react-router-dom';
import Header from './layouts/Header';
import Footer from './layouts/Footer';

const Layout = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen p-4">
        <Outlet /> 
      </main>
      <Footer />
    </>
  );
};

export default Layout;
