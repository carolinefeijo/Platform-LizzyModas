import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginRequest } from "../../store/features/login/loginSlice";
import { useNavigate } from "react-router-dom";
import "./styles.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      loginRequest({
        user: { email, password },
        navigate,
      }),
    );
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Entrar no Sistema</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>E-mail</label>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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
