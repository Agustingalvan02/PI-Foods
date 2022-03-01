import './App.css';
import { Route, Switch} from 'react-router-dom';
import  landingPage from './Components/Landing/landingPage';
import Home from './Components/Home/home';
import CreateRecipe from './Components/CreateRecipe';
import NavBar from './NavBar/nav';
import CardContainer from './Components/CardContainer/CardContainer';
function App() {
  return (
   
    <div className="App">
      <h1 className='title'>Henry Food</h1>
      <NavBar/>
      <Switch>
      <Route exact path="/" component={landingPage}/>
      <Route exact path="/home" component={Home}/>
      <Route exact path="/recipe" component={CreateRecipe}/>
      <Route path="/recipes/:id" component={CardContainer}/>
      </Switch>
    </div>
   
  );
}

export default App;
