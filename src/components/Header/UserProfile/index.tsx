import "./styles.css";

function UserProfile() {
  return (
    <header className="main-header">
      <div className="user-profile-container">
        <div className="user-info-trigger">
          <img
            src="https://via.placeholder.com/40"
            alt="Avatar"
            className="user-avatar"
          />
          <span className="user-name">Nome do Usuário</span>
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

          <hr className="divider" />

          <button className="btn-dropdown logout">
            <span>Sair</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default UserProfile;
