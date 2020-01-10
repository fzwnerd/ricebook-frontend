import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/HomeComponent';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import '@fortawesome/fontawesome-free/css/all.css';

const store = ConfigureStore();

function App() {
  return (
    <Provider store={store}>
        <div>
          <Home />
        </div>
    </Provider>
  );
}

export default App;
