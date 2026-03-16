/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import Modal from "../../../../components/Modal";
import type { User } from "../../../../store/features/user/types";
import { setEditUserResquest } from "../../../../store/features/user/userSlice";
import { useDispatch } from "react-redux";

function Edit({
  visible,
  onClose,
  user,
}: {
  visible: boolean;
  onClose: () => void;
  user: User | null;
}) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleOnClose = () => {
    onClose();
  };

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canSubmit = name.trim() !== "" && isEmailValid && phone.trim() !== "";

  const updateState = () => {
    if (!user) return;
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone || "");
  };

  const handleEdit = () => {
    if (!user) return;

    const newUser: User = {
      email,
      name,
      phone,
      id: user.id,
    };
    dispatch(setEditUserResquest({ user: newUser }));
  };

  useEffect(() => {
    updateState();
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <Modal title="Editar Colaborador" onClose={handleOnClose} visible={visible}>
      <div className="modal-form">
        <p className="modal-subtitle">
          Altere as informações necessárias abaixo.
        </p>

        <div className="form-group">
          <label>Nome Completo</label>
          <input
            type="text"
            className="form-input"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>E-mail Corporativo</label>
          <input
            type="email"
            className={`form-input ${!isEmailValid && email.length > 0 ? "error" : ""}`}
            placeholder="email@empresa.com"
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
            className="form-input"
            placeholder="(00) 00000-0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {error && <div className="alert-error">{error}</div>}

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="btn-submit"
            disabled={!canSubmit}
            onClick={() => {
              handleEdit();
              handleOnClose();
            }}
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default Edit;
