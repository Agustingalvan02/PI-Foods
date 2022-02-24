import './App.css';
import { Route, Switch} from 'react-router-dom';
import  landingPage from './Components/Landing/landingPage';
import Home from './Components/Home/home';
function App() {
  return (
    <div className="App">
      <h1>Henry Food</h1>
      <Switch>
      <Route exact path="/" component={landingPage}/>
      <Route exact path="/home" component={Home}/>
      </Switch>
    </div>
  );
}

export default App;
