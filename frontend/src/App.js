import { ToastContainer } from 'react-toastify';
import './App.css';
import { Router } from './router/Router';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from './components/ErrorBoundary';
function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Router />
      </ErrorBoundary>
      <ToastContainer closeOnClick autoClose={2000} />
    </div>
  );
}

export default App;
