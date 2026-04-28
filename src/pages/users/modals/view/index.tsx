import Modal from "../../../../components/Modal";
import type { User } from "../../../../store/features/user/types";
import { FiUser, FiMail, FiPhone } from "react-icons/fi";

function View({
  visible,
  onClose,
  user,
}: {
  visible: boolean;
  onClose: () => void;
  user: User | null;
}) {
  if (!user) return null;

  return (
    <Modal title="Detalhes do Usuário" onClose={onClose} visible={visible}>
      <div className="view-container">
        <div className="view-header-profile"></div>
        <div className="view-details-grid">
          <div className="view-item">
            <div className="view-icon">
              <FiUser />
            </div>
            <div className="view-info">
              <label>Nome Completo</label>
              <p>{user.name}</p>
            </div>
          </div>

          <div className="view-item">
            <div className="view-icon">
              <FiMail />
            </div>
            <div className="view-info">
              <label>E-mail</label>
              <p>{user.email || "Não informado"}</p>
            </div>
          </div>

          <div className="view-item">
            <div className="view-icon">
              <FiPhone />
            </div>
            <div className="view-info">
              <label>Telefone / WhatsApp</label>
              <p>{user.phone || "Não informado"}</p>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default View;
