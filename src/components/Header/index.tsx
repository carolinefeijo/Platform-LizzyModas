import { useNavigate } from "react-router-dom";
import "./styles.css";
import { useDispatch } from "react-redux";
import { logout } from "../../store/features/login/loginSlice";
import api from "../../api";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("@App:token");
    delete api.defaults.headers.Authorization;
    navigate("/login");
  };

  return (
    <header className="header-container">
      <div className="header-content">
        <div className="logo-section">
          <span className="brand-name">CAROL SISTEMAS</span>
        </div>

        <div className="user-section">
          <button className="login-btn" onClick={handleLogout}>
            SAIR
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
