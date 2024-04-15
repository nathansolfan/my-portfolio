import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/templates/Header";
import Calendar from "./components/organism/Calendar";
import Hero from "./components/organism/Hero";
import About from "./components/organism/About";
import EditBooking from "./components/organism/EditBooking";
import Change from "./components/templates/Change";
import EmailInput from "./components/organism/EmailInput";

function App() {
  return (
    <Router>
      {" "}
      {/* Router should wrap all components that use routing */}
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/find-booking" element={<EmailInput />} />
          <Route path="/edit-booking/:id" element={<EditBooking />} />
          <Route path="/booking-list" element={<Change />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>

        <footer></footer>
      </div>
    </Router>
  );
}

export default App;
