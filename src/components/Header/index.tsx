import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, type LoginState } from "../../store/features/login/loginSlice";
import api from "../../api";
import "./styles.css";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state: { login: LoginState }) => state.login);

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
          <div className="user-profile-container">
            <div className="user-info-trigger">
              <img
                src="https://github.com/identicons/jasonlong.png"
                alt="Avatar"
                className="user-avatar"
              />
              <span className="user-name">
                {user?.name || "Usuário Logado"}
              </span>
              <span className="chevron">▼</span>
            </div>

            <div className="user-dropdown">
              <div className="dropdown-item">
                <span>Modo Dark</span>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider"></span>
                </label>
              </div>

              <hr className="dropdown-divider" />

              <button className="btn-dropdown-logout" onClick={handleLogout}>
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
