/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import Modal from "../../../../components/Modal";
import type { User } from "../../../../store/features/user/types";

function Edit({
  visible,
  onClose,
  user,
}: {
  visible: boolean;
  onClose: () => void;
  user: User | null;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleOnClose = () => {
    setName("");
    setEmail("");
    setPhone("");
    setError("");
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

  useEffect(() => {
    updateState();
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <Modal title="Editar usuario" onClose={handleOnClose} visible={visible}>
      <p>Conteúdo do Modal</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
        />

        {!isEmailValid && email.length > 0 && (
          <span style={{ color: "red", fontSize: "12px" }}>
            Email inválido.
          </span>
        )}

        <input
          type="tel"
          placeholder="Telefone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <button
        disabled={!canSubmit}
        style={{
          marginTop: "10px",
          padding: "10px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: canSubmit ? "pointer" : "not-allowed",
          opacity: canSubmit ? 1 : 0.5,
        }}
        onClick={() => {
          // handleCreate();
          // handleOnClose();
          console.log("EDITADO");
        }}
      >
        Editar
      </button>
    </Modal>
  );
}

export default Edit;
