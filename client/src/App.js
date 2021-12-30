import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import React from 'react';
import Home from './components/pages/Home';
import About from './components/pages/About';
import ContactsState from './context/contact/ContactsState';

const App = () => {
  return (
    <ContactsState>
      <BrowserRouter>
        <React.Fragment>
          <NavBar />

          <div className='container'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
            </Switch>
          </div>

        </React.Fragment>
      </BrowserRouter>
    </ContactsState>
  );
}

export default App;
