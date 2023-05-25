import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserProvider } from './context/user_context';
import { AppProvider } from './context/app_context';
import { ClassProvider } from './context/class_context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <ClassProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </ClassProvider>
    </UserProvider>
  </React.StrictMode>
);
