import "./styles.css";

function Login() {
  const handleSubmit = () => {
    console.log("entrou");
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Entrar no Sistema</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>E-mail</label>
            <input type="email" placeholder="Digite seu e-mail" required />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input type="password" placeholder="Digite sua senha" required />
          </div>

          <button type="submit" className="btn-login">
            Acessar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
