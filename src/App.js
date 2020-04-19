import React from 'react';
import './themes/commonThemes.css';
import Header from './Components/Header';
import MainContainer from './Containers/MainContainer';
import CartContainer from './Containers/CartContainer';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="displayInRow">
      <Header />
      <Switch>
        <Route exact path="/">
          <MainContainer />
        </Route>
        <Route exact path="/Cart">
          <CartContainer />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
