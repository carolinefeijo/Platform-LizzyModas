/* eslint-disable react-hooks/exhaustive-deps */
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
  const [priceText, setPriceText] = useState("");
  const [error, setError] = useState("");

  const onlyDigits = (s: string) => s.replace(/\D/g, "");

  const formatBRL = (digits: string) => {
    if (!digits) return "";
    const numberValue = parseInt(digits, 10);
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(numberValue / 100);
  };

  const parseToNumber = (value: string) => {
    const digits = onlyDigits(value);
    return digits ? parseInt(digits, 10) : 0;
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = onlyDigits(e.target.value);
    if (digits.length > 12) return;
    setPriceText(digits === "" ? "" : formatBRL(digits));
  };

  const updateState = () => {
    if (!product) return;
    setName(product.name);
    setDescription(product.description);

    const initialPriceDigits = product.price.toString();
    setPriceText(formatBRL(initialPriceDigits));
    setError("");
  };

  const handleEdit = () => {
    if (!product) return;

    if (!name || !priceText) {
      setError("Nome e preço são obrigatórios.");
      return;
    }

    const newProduct: Partial<Product> = {
      id: product.id,
      name,
      description,
      price: parseToNumber(priceText),
    };

    dispatch(setEditProductResquest({ product: newProduct }));
    onClose();
  };

  useEffect(() => {
    if (visible) {
      updateState();
    }
  }, [product, visible]);

  if (!product) return null;

  return (
    <Modal title="Editar Produto" onClose={onClose} visible={visible}>
      <div className="modal-form">
        <p className="modal-subtitle">
          Altere as informações do produto abaixo.
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
            placeholder="Ex: uma mesa grande"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Preço</label>
          <input
            type="text"
            className="form-input"
            placeholder="R$ 0,00"
            value={priceText}
            onChange={handlePriceChange}
          />
        </div>

        {error && (
          <div
            className="alert-error"
            style={{ color: "red", marginTop: "10px" }}
          >
            {error}
          </div>
        )}

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-submit" onClick={handleEdit}>
            Atualizar produto
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default Edit;
