import { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "../../../../components/Modal";
import "./styles.css";
import { setCreateProductRequest } from "../../../../store/features/product/productSlice";

function Create({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [error, setError] = useState("");

  const handleOnClose = () => {
    setName("");
    setDescription("");
    setPrice(0);
    setError("");
    onClose();
  };

  const handleCreate = () => {
    dispatch(
      setCreateProductRequest({
        name,
        description,
        price,
        createdById: 58,
      }),
    );
    handleOnClose();
  };

  return (
    <Modal title="Criar novo produto" onClose={handleOnClose} visible={visible}>
      <div className="modal-form">
        <p className="modal-subtitle">
          Preencha as informações do novo produto.
        </p>

        <div className="form-group">
          <label>Nome do produto</label>
          <input
            type="text"
            className="form-input"
            placeholder="Ex: Mesa de centro"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Descrição</label>
          <input
            type="text"
            className="form-input"
            placeholder="ex: uma mesa grande e espaçosa"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label>Preço</label>
          <input
            type="number"
            className="form-input"
            placeholder="$45,00"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>

        {error && <div className="alert-error">{error}</div>}

        <div className="modal-footer">
          <button className="btn-cancel" onClick={handleOnClose}>
            Cancelar
          </button>
          <button className="btn-submit" onClick={() => handleCreate()}>
            Cadastrar produto
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default Create;
