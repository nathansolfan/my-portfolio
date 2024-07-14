import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/organism/Header";
import Calendar from "./components/organism/Calendar";
import Hero from "./components/organism/Hero";
import About from "./components/organism/About";
import EmailInput from "./components/organism/EmailInput";
import Logo from "./components/organism/Logo";
import "./index.css";
import BoxSizing from "./components/molecule/BoxSizing";
import AIChat from "./components/AI/AIChat";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import CarPooling from "./components/CarPooling/CarPooling";
import Footer from "./components/organism/Footer";
import SideBySide from "./components/organism/SideBySide";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/logo" element={<Logo />} />
          <Route path="/about" element={<About />} />
          <Route path="/find-booking" element={<EmailInput />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/box" element={<BoxSizing />} />
          <Route path="/aichat" element={<AIChat />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/carpooling" element={<CarPooling />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
