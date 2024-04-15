import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/templates/Header";
import Calendar from "./components/organism/Calendar";
import Home from "./components/organism/Home";
import About from "./components/organism/About";

function App() {
  return (
    <Router>
      {" "}
      {/* Router should wrap all components that use routing */}
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<div>Projects Section</div>} />
          <Route path="/contact" element={<div>Contact Section</div>} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>

        <footer></footer>
      </div>
    </Router>
  );
}

export default App;
