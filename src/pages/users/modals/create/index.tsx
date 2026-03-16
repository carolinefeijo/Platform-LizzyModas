import { useState } from "react";
import { setCreateUserRequest } from "../../../../store/features/user/userSlice";
import { useDispatch } from "react-redux";
import Modal from "../../../../components/Modal";
import "./styles.css";

function Create({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  // função para formatacao do telefone
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    value = value.substring(0, 11);
    const formattedValue = value
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
    setPhone(formattedValue);
  };

  const handleOnClose = () => {
    setName("");
    setEmail("");
    setPhone("");
    setError("");
    onClose();
  };

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPhoneComplete = phone.replace(/\D/g, "").length === 11;
  const canSubmit = name.trim() !== "" && isEmailValid && isPhoneComplete;

  const handleCreate = () => {
    if (!canSubmit) {
      setError("Por favor, preencha os campos corretamente.");
      return;
    }
    dispatch(
      setCreateUserRequest({
        name,
        email,
        phone,
      }),
    );
  };

  return (
    <Modal title="Criar novo usuário" onClose={handleOnClose} visible={visible}>
      <div className="modal-form">
        <p className="modal-subtitle">
          Preencha as informações do novo colaborador.
        </p>

        <div className="form-group">
          <label>Nome Completo</label>
          <input
            type="text"
            className="form-input"
            placeholder="Ex: João Silva"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>E-mail</label>
          <input
            type="text"
            className={`form-input ${!isEmailValid && email.length > 0 ? "error" : ""}`}
            placeholder="exemplo@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
          />
          {!isEmailValid && email.length > 0 && (
            <span className="helper-text error">E-mail inválido.</span>
          )}
        </div>

        <div className="form-group">
          <label>Telefone</label>
          <input
            type="tel"
            className={`form-input ${!isPhoneComplete && phone.length > 0 ? "error" : ""}`}
            placeholder="(00) 00000-0000"
            value={phone}
            onChange={handlePhoneChange}
          />
          {!isPhoneComplete && phone.length > 0 && (
            <span className="helper-text error">
              DDD + 9 dígitos necessários.
            </span>
          )}
        </div>

        {error && <div className="alert-error">{error}</div>}

        <div className="modal-footer">
          <button className="btn-cancel" onClick={handleOnClose}>
            Cancelar
          </button>
          <button
            className="btn-submit"
            disabled={!canSubmit}
            onClick={handleCreate}
          >
            Cadastrar Usuário
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default Create;
