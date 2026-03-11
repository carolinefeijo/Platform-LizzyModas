import "./styles.css";

function Header() {
  return (
    <header className="header-container">
      <div className="header-content">
        <div className="logo-section">
          <span className="brand-name">Carool sistemas</span>
        </div>

        <div className="user-section">
          <button className="login-btn">LOGIN</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
