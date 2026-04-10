/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import { formatBRL, onlyDigits } from "../../../../utils";
import Modal from "../../../../components/Modal";
import "./styles.css";
import type { Post } from "../../../../store/features/post/types";

function Edit({
  visible,
  onClose,
  post,
}: {
  visible: boolean;
  onClose: () => void;
  post: Post | null;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  const [fileName, setFileName] = useState("Nenhum arquivo selecionado");
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = onlyDigits(e.target.value);
    if (digits.length > 12) return;
    setPrice(digits === "" ? "" : formatBRL(digits));
  };

  const handleOnClose = () => {
    setFileName("Nenhum arquivo selecionado");
    setPreview(null);
    setName("");
    setDescription("");
    setCategory("");
    setSize("");
    setPrice("");
    setError("");
    onClose();
  };

  const updateState = () => {
    if (!post) return;

    setName(post.name);
    setDescription(post.description || "");
    setCategory(post.category);
    setSize(post.size || "");

    const initialPriceDigits = post.price.toString();
    setPrice(formatBRL(initialPriceDigits));

    if (post.image) {
      setPreview(post.image);
      const nameFromUrl = post.image.split("/").pop() || "";
      const cleanName = nameFromUrl.includes("-")
        ? nameFromUrl.split("-").slice(1).join("-")
        : nameFromUrl;
      setFileName(cleanName || "imagem_atual.jpeg");
    } else {
      setFileName("Nenhum arquivo selecionado");
      setPreview(null);
    }

    setError("");
  };

  useEffect(() => {
    if (visible) {
      updateState();
    }
  }, [post, visible]);

  if (!post) return null;

  return (
    <Modal title="Editar post" onClose={handleOnClose} visible={visible}>
      <div className="modal-form-edit">
        <p className="modal-subtitle">Atualize as informações do post.</p>

        <div className="form-group">
          <label>Imagem do produto</label>

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleImageChange}
          />

          <div
            className="form-input"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              background: "#fff",
              padding: "4px 8px",
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            <button
              type="button"
              style={{
                padding: "2px 10px",
                background: "#efefef",
                border: "1px solid #767676",
                borderRadius: "2px",
                fontSize: "13px",
              }}
            >
              Escolher arquivo
            </button>
            <span style={{ fontSize: "13px", color: "#333" }}>{fileName}</span>
          </div>

          {preview && (
            <div style={{ marginTop: "10px", textAlign: "center" }}>
              <img
                src={preview}
                alt="Preview"
                style={{
                  width: "100%",
                  maxHeight: "150px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  border: "1px solid #eee",
                }}
              />
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Nome do post</label>
          <input
            type="text"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Descrição</label>
          <textarea
            className="form-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Preço</label>
          <input
            type="text"
            className="form-input"
            value={price}
            onChange={handlePriceChange}
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
          <button className="btn-submit" onClick={() => {}}>
            Salvar Alterações
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default Edit;
