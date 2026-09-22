import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ToastContainer from '../components/ToastContainer';

export default function MainLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname]);

  return (
    <div className="gv-app">
      <Navbar />
      <main className="gv-main page-transition" key={location.pathname}>
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}
