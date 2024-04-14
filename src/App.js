import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/templates/Header";
import Calendar from "./components/organism/Calendar";

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
      <Calendar />

      <footer></footer>
    </div>
  );
}

export default App;
