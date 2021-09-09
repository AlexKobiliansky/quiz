import Header from './components/Header/Header';
import {Route, Switch} from 'react-router-dom';
import Main from './components/Main/Main'
import Categories from './pages/Categories/Categories';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="page-wrapper">
        <div className="container">
          <Switch>
            <Route path="/" component={Main} exact/>
            <Route path="/categories" component={Categories} exact/>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
