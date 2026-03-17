/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import Modal from "../../../../components/Modal";
import { useDispatch } from "react-redux";
import type { Product } from "../../../../store/features/product/types";
import { setEditProductResquest } from "../../../../store/features/product/productSlice";
import "./styles.css";

function Edit({
  visible,
  onClose,
  product,
}: {
  visible: boolean;
  onClose: () => void;
  product: Product | null;
}) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const handleOnClose = () => {
    onClose();
  };

  const updateState = () => {
    if (!product) return;
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
  };

  const handleEdit = () => {
    if (!product) return;

    const newProduct: Partial<Product> = {
      name,
      description,
      price,
      id: product.id,
    };
    dispatch(setEditProductResquest({ product: newProduct }));
  };

  useEffect(() => {
    updateState();
  }, [product]);

  if (!product) {
    return null;
  }

  return (
    <Modal title="Editar Colaborador" onClose={handleOnClose} visible={visible}>
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

        <div className="modal-footer">
          <button className="btn-cancel" onClick={handleOnClose}>
            Cancelar
          </button>
          <button
            className="btn-submit"
            onClick={() => {
              handleEdit();
              handleOnClose();
            }}
          >
            Atualizar produto
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default Edit;
