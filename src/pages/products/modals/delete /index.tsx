import Modal from "../../../../components/Modal";
import { setDeleteProductRequest } from "../../../../store/features/product/productSlice";
import type { Product } from "../../../../store/features/product/types";
import { useDispatch } from "react-redux";

function Delete({
  visible,
  onClose,
  product,
}: {
  visible: boolean;
  onClose: () => void;
  product: Product | null;
}) {
  const dispatch = useDispatch();

  const handleOnClose = () => {
    onClose();
  };

  const handleDelete = () => {
    if (!product) return;
    dispatch(setDeleteProductRequest({ id: product.id }));
    handleOnClose();
  };

  if (!product) {
    return null;
  }

  return (
    <Modal title="Excluir produto" onClose={handleOnClose} visible={visible}>
      <div className="modal-form">
        <p className="modal-subtitle">
          Esta ação não pode ser desfeita. Tem certeza que deseja remover este
          produto?
        </p>

        <div className="form-group">
          <label>Produto selecionado</label>
          <input
            type="text"
            className="form-input"
            value={product.name}
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
