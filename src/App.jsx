// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminUpload from "./components/AdminUpload";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
// import FloatingFans from "./components/FloatingFans";
import ScrollToHashElement from "./components/ScrollToHashElement";

function App() {
  return (
    <Router>
      <div className="relative">
        {/* <FloatingFans /> */}
        <Header />
        <ScrollToHashElement />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/admin" element={<AdminUpload />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
