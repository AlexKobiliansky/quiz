import React from 'react';

import {Route, Switch} from 'react-router-dom';

import Header from './components/Header/Header';
import Main from './components/Main/Main'
import Categories from './pages/CategoriesPage/CategoriesPage';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import ResultsPage from './pages/ResultsPage/ResultsPage';
import NoPage from './pages/NoPage/NoPage';
import SignupPage from './pages/SignupPage/SignupPage';
import {routes} from './config/routes';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="page-wrapper">
        <div className="container">
          <Switch>
            <Route path={routes.INDEX} component={Main} exact/>
            <Route path={routes.CATEGORIES} component={Categories} exact/>
            <Route path={routes.SINGLE_CATEGORY} component={CategoryPage} exact/>
            <Route path={routes.RESULTS} component={ResultsPage} exact/>
            <Route path={routes.SIGNUP} component={SignupPage} exact/>
            <Route component={NoPage}/>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
