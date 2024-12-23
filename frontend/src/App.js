import { ToastContainer } from 'react-toastify';
import './App.css';
import { Router } from './router/Router';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
      <Router />
      <ToastContainer closeOnClick autoClose={2000} />
    </div>
  );
}

export default App;
