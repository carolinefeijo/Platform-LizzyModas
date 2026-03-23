import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Home from "./pages/home";
import Users from "./pages/users";
import Sidebar from "./components/SideBar";
import Products from "./pages/products";
import Header from "./components/Header";
import "./App.css";
import Login from "./pages/login";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/*"
            element={
              <>
                <Sidebar />
                <div className="content-wrapper">
                  <Header />
                  <main className="main-content">
                    <Routes>
                      <Route path="/" element={<Navigate to="/home" />} />
                      <Route path="/home" element={<Home />} />
                      <Route path="/users" element={<Users />} />
                      <Route path="/products" element={<Products />} />
                    </Routes>
                  </main>
                </div>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
