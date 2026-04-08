import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCreateProductRequest } from "../../../../store/features/product/productSlice";
import Modal from "../../../../components/Modal";
import "./styles.css";
import { formatBRL, onlyDigits, parseToNumber } from "../../../../utils";

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
  const [priceText, setPriceText] = useState("");
  const [error, setError] = useState("");

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = onlyDigits(e.target.value);
    if (digits.length > 12) return;
    if (digits === "") {
      setPriceText("");
    } else {
      setPriceText(formatBRL(digits));
    }
  };

  const handleOnClose = () => {
    setName("");
    setDescription("");
    setPriceText("");
    setError("");
    onClose();
  };

  const handleCreate = () => {
    if (!name || !priceText) {
      setError("Por favor, preencha o nome e o preço.");
      return;
    }
    const priceInCents = parseToNumber(priceText);
    dispatch(
      setCreateProductRequest({
        name,
        description,
        price: priceInCents,
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
          <button className="btn-cancel" onClick={handleOnClose}>
            Cancelar
          </button>
          <button className="btn-submit" onClick={handleCreate}>
            Cadastrar produto
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default Create;
