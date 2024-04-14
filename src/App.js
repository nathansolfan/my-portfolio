import Header from "./components/templates/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <Switch>
        <Route exact path="/"></Route>
        <Route exact path="/about"></Route>
        <Route exact path="/projects"></Route>
        <Route exact path="/contact"></Route>
      </Switch> */}

      <footer></footer>
    </div>
  );
}

export default App;
