import "./App.css";
import {Switch, Route, BrowserRouter as Router,} from 'react-router-dom';
import Characters from "./component/Characters";
import HouseDetail from "./component/HouseDetail";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/housedetail/:id" children={<HouseDetail/>}></Route>
          <Route path="/"><Characters/></Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
