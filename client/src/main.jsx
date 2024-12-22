//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './state/store';
import 'dropzone/dist/dropzone.css';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  //<StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <ToastContainer position='top-right' autoClose={5000} stacked />
    </BrowserRouter>
  </Provider>
  //</StrictMode>,
)
