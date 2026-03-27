import { useNavigate } from "react-router-dom";
import "./styles.css";

function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
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
