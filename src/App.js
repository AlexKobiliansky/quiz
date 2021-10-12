import React, {useEffect, useState} from 'react';

import {Route, Switch} from 'react-router-dom';

import Header from './components/Header/Header';
import Categories from './pages/CategoriesPage/CategoriesPage';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import ResultsPage from './pages/ResultsPage/ResultsPage';
import NoPage from './pages/NoPage/NoPage';
import SignupPage from './pages/SignupPage/SignupPage';
import {routes} from './config/routes';
import SigninPage from './pages/SigninPage/SigninPage';
import NoAuthRoute from './components/NoAuthRoute/NoAuthRoute';
import {useDispatch} from 'react-redux';
import {setCurrentUser} from './redux/actions/user';
import StatisticsPage from './pages/StatisticsPage/StatisticsPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import IndexPage from './pages/IndexPage/IndexPage';

function App() {
  const dispatch = useDispatch();
  const [userData] = useState(JSON.parse(localStorage.getItem("userData")));

  useEffect(() => {
    userData && dispatch(setCurrentUser(userData)); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="App">
      <Header />
      <div className="page-wrapper">
        <div className="container">
          <Switch>
            <Route path={routes.INDEX} component={IndexPage} exact/>
            <Route path={routes.CATEGORIES} component={Categories} exact/>
            <Route path={routes.SINGLE_CATEGORY} component={CategoryPage} exact/>
            <Route path={routes.RESULTS} component={ResultsPage} exact/>
            <Route path={routes.STATISTICS} component={StatisticsPage} exact/>
            <Route path={routes.PROFILE} component={ProfilePage} exact/>
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
