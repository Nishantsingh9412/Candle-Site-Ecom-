import { BrowserRouter as Router, useLocation } from 'react-router-dom';

import AllRoutes from "./AllRoutes";
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

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
      </Router>
    </>
  )
}

export default App;
