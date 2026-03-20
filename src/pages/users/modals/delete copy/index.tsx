import Modal from "../../../components/Modal";
import type { User } from "../../../store/features/user/types";
import { setDeleteUserRequest } from "../../../store/features/user/userSlice";
import { useDispatch } from "react-redux";

function Delete({
  visible,
  onClose,
  user,
}: {
  visible: boolean;
  onClose: () => void;
  user: User | null;
}) {
  const dispatch = useDispatch();

  const handleOnClose = () => {
    onClose();
  };

  const handleDelete = () => {
    if (!user) return;
    dispatch(setDeleteUserRequest({ id: user.id }));
    handleOnClose();
  };

  if (!user) {
    return null;
  }

  return (
    <Modal
      title="Excluir colaborador"
      onClose={handleOnClose}
      visible={visible}
    >
      <div className="modal-form">
        <p className="modal-subtitle">
          Esta ação não pode ser desfeita. Tem certeza que deseja remover este
          colaborador?
        </p>

        <div className="form-group">
          <label>Usuário selecionado</label>
          <input
            type="text"
            className="form-input"
            value={user.name}
            disabled // Mantém o estilo do input mas impede edição
            style={{ backgroundColor: "#f3f4f6", cursor: "not-allowed" }}
          />
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={handleOnClose}>
            Cancelar
          </button>
          <button
            className="btn-submit"
            onClick={handleDelete}
            style={{ backgroundColor: "#ef4444" }} // Vermelho para indicar perigo/exclusão
          >
            Confirmar Exclusão
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default Delete;
