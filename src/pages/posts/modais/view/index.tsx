import Modal from "../../../../components/Modal";
import type { Post } from "../../../../store/features/post/types";
import { FiUser, FiMail, FiPhone } from "react-icons/fi";

function View({
  visible,
  onClose,
  post,
}: {
  visible: boolean;
  onClose: () => void;
  post: Post | null;
}) {
  if (!post) return null;

  return (
    <Modal title="Detalhes do Post" onClose={onClose} visible={visible}>
      <div className="view-container">
        <div className="view-header-profile">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: 80,
              backgroundColor: "#eee",
              marginTop: 10,
            }}
          >
            <img
              src={
                "https://cdn.pixabay.com/photo/2015/04/19/08/32/flower-729510_1280.jpg"
              }
              alt={post.name}
              style={{ maxHeight: "100%" }}
            />
          </div>
        </div>
        <div className="view-title-group">
          <h3>{post.name}</h3>
          <span className="badge-status">Colaborador Ativo</span>
        </div>
      </div>

      <div className="view-details-grid">
        <div className="view-item">
          <div className="view-icon">
            <FiUser />
          </div>
          <div className="view-info">
            <label>Nome Completo</label>
            <p>{post.name}</p>
          </div>
        </div>

        <div className="view-item">
          <div className="view-icon">
            <FiMail />
          </div>
          <div className="view-info">
            <label>E-mail</label>
            <p>{"Não informado"}</p>
          </div>
        </div>

        <div className="view-item">
          <div className="view-icon">
            <FiPhone />
          </div>
          <div className="view-info">
            <label>Telefone / WhatsApp</label>
            <p>{"Não informado"}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default View;
