import Modal from "../../../../components/Modal";
import { setDeletePostRequest } from "../../../../store/features/post/postSlice";
import type { Post } from "../../../../store/features/post/types";
import { useDispatch } from "react-redux";

function Delete({
  visible,
  onClose,
  post,
}: {
  visible: boolean;
  onClose: () => void;
  post: Post | null;
}) {
  const dispatch = useDispatch();

  const handleOnClose = () => {
    onClose();
  };

  const handleDelete = () => {
    if (!post) return;
    dispatch(setDeletePostRequest({ id: post.id }));
    handleOnClose();
  };

  if (!post) {
    return null;
  }

  return (
    <Modal title="Excluir post" onClose={handleOnClose} visible={visible}>
      <div className="modal-form">
        <p className="modal-subtitle">
          Esta ação não pode ser desfeita. Tem certeza que deseja remover este
          post?
        </p>

        <div className="form-group">
          <label>Post selecionado</label>
          <input
            type="text"
            className="form-input"
            value={post.name}
            disabled
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
            style={{ backgroundColor: "#ef4444" }}
          >
            Confirmar Exclusão
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default Delete;
