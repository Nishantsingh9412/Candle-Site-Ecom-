import { BrowserRouter as Router, useLocation } from 'react-router-dom';

import AllRoutes from "./AllRoutes";
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import CartModal from './components/cart/CartModal';
import ToastContainer from './components/miscellaneous/ToastContainer';

function ScrollToTop() {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Toaster />
        <AllRoutes />
        <CartModal />
        <ToastContainer />
      </Router>
    </>
  )
}

export default App;
