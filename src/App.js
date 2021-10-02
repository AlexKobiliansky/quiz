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
import SigninPage from './pages/SigninPage/SigninPage';
import NoAuthRoute from './components/NoAuthRoute/NoAuthRoute';

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
            <NoAuthRoute path={routes.SIGNUP} component={SignupPage} />
            <NoAuthRoute path={routes.SIGNIN} component={SigninPage} />
            <Route component={NoPage}/>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
