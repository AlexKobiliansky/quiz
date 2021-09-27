import React from 'react';

import {Route, Switch} from 'react-router-dom';

import Header from './components/Header/Header';
import Main from './components/Main/Main'
import Categories from './pages/CategoriesPage/CategoriesPage';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import ResultsPage from './pages/ResultsPage/ResultsPage';
import NoPage from './pages/NoPage/NoPage';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="page-wrapper">
        <div className="container">
          <Switch>
            <Route path="/" component={Main} exact/>
            <Route path="/categories" component={Categories} exact/>
            <Route path="/categories/:id" component={CategoryPage} exact/>
            <Route path="/results" component={ResultsPage} exact/>
            <Route component={NoPage}/>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
