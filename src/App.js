import React from 'react';
import GlobalStyles from './style/GlobalStyles';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppRoutes />
      <GlobalStyles />
    </BrowserRouter>
  );
}

export default App;
