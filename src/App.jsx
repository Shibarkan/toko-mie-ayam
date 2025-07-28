// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import AdminLogin from "./pages/AdminLogin";
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
          <Route path="/admin-login" element={<AdminLogin />} />{" "}
          {/* ⬅️ ini login admin */}
          <Route path="/admin" element={<AdminPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
