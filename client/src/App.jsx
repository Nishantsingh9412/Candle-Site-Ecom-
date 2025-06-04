import { BrowserRouter as Router } from 'react-router-dom';

import AllRoutes from "./AllRoutes";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Router>
        <Toaster />
        <AllRoutes />
      </Router>
    </>
  )
}

export default App;
