import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/organism/Header";
import Calendar from "./components/organism/Calendar";
import Hero from "./components/organism/Hero";
import About from "./components/organism/About";
import EmailInput from "./components/organism/EmailInput";
import Logo from "./components/organism/Logo";
import "./index.css";
import BoxSizing from "./components/molecule/BoxSizing";

function App() {
  return (
    <Router>
      {" "}
      {/* Router should wrap all components that use routing */}
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/logo" element={<Logo />} />

          <Route path="/about" element={<About />} />
          <Route path="/find-booking" element={<EmailInput />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/box" element={<BoxSizing />} />
        </Routes>

        <footer>Footer</footer>
      </div>
    </Router>
  );
}

export default App;
