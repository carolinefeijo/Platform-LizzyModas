import { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "../../../../components/Modal";
import "./styles.css";
import { onlyDigits } from "../../../../utils";
import { setCreatePostRequest } from "../../../../store/features/post/postSlice";

function Create({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const dispatch = useDispatch();
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleOnClose = () => {
    setImage(null);
    setName("");
    setDescription("");
    setCategory("");
    setSize("");
    setPrice("");
    setError("");
    onClose();
  };

  const handleCreate = () => {
    if (!name || !price || !category) {
      setError(
        "Por favor, preencha os campos obrigatórios: nome, preço e categoria.",
      );
      return;
    }

    const payload = {
      name,
      description,
      category,
      price: Number(onlyDigits(price)),
      userId: 71,
      image,
    };
    console.log({ enviadoPayload: payload });
    dispatch(setCreatePostRequest(payload));
    handleOnClose();
  };

  return (
    <Modal title="Criar novo post" onClose={handleOnClose} visible={visible}>
      <div className="modal-form">
        <p className="modal-subtitle">Preencha as informações do novo post.</p>

        <div className="form-group">
          <label>Imagem do produto</label>
          <input
            type="file"
            className="form-input"
            accept="image/*"
            onChange={handleImageChange}
          />

          {preview && (
            <div style={{ marginTop: "0px" }}>
              <p>Preview:</p>
              <img
                src={preview}
                alt="Preview do produto"
                style={{ width: "200px", height: "auto", borderRadius: "8px" }}
              />
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Nome do post</label>
          <input
            type="text"
            className="form-input"
            placeholder="Ex: Calça Jeans"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Descrição</label>
          <input
            type="text"
            className="form-input"
            placeholder="ex: Calca muito confortavel, ideal para o dia a dia"
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
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="label-form">Categoria</label>
          <select
            className="form-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Selecione uma categoria</option>
            <option value="roupas femininas">Roupas Femininas</option>
            <option value="roupas masculinas">Roupas Masculinas</option>
            <option value="roupas infantis">Roupas Infantils</option>
            <option value="roupas plus size">Roupas Plus Size</option>
          </select>
        </div>

        <div className="form-group">
          <label>Tamanho</label>
          <select
            className="form-input"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="">Selecione um tamanho</option>
            <option value="PP">PP</option>
            <option value="P">P</option>
            <option value="M">M</option>
            <option value="G">G</option>
            <option value="GG">GG</option>
          </select>
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
            Criar post
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default Create;
