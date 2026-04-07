import { useEffect, useState } from "react";
import Modal from "../../../../components/Modal";
import type { Post } from "../../../../store/features/post/types";
import {
  FiTag,
  FiMaximize2,
  FiCalendar,
  FiLayers,
  FiUser,
  FiInfo,
} from "react-icons/fi";
import { formatDate, formatPrice } from "../../../../utils";
import Loading from "../../../../components/Loading";
import "./styles.css";

interface ViewProps {
  visible: boolean;
  onClose: () => void;
  post: Post | null;
  loading: boolean;
}

function View({ visible, onClose, post, loading }: ViewProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    console.log({ post });
  }, []);

  return (
    <Modal title="Visualizar Publicação" onClose={onClose} visible={visible}>
      <div className="view-container">
        {loading || !post ? (
          <div className="view-loading-state">
            <Loading />
            <p>Buscando detalhes do produto...</p>
          </div>
        ) : (
          <div className="view-content-fade-in">
            <div className="view-image-section">
              <div
                className={`image-wrapper ${isZoomed ? "zoomed" : ""}`}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <img
                  src={
                    post.image ||
                    "https://via.placeholder.com/400x300?text=Sem+Imagem"
                  }
                  alt={post.name}
                />
                <div className="zoom-overlay">
                  <FiMaximize2 />
                  <span>
                    {isZoomed ? "Clique para reduzir" : "Clique para ampliar"}
                  </span>
                </div>
              </div>
            </div>

            <div className="view-header-info">
              <div className="category-tag">{post.category || "Geral"}</div>
              <h3>{post.name}</h3>
              <div className="view-price">{formatPrice(post.price || 0)}</div>
            </div>

            <div className="view-description">
              <label>
                <FiInfo size={14} style={{ marginRight: 4 }} />
                Descrição do Post
              </label>
              <p>
                {post.description ||
                  "Esta publicação não possui uma descrição detalhada cadastrada."}
              </p>
            </div>

            <div className="view-details-grid">
              <div className="view-item">
                <div className="view-icon">
                  <FiLayers />
                </div>
                <div className="view-info">
                  <label>Tamanho / Tipo</label>
                  <p>{"Padrão"}</p>
                </div>
              </div>

              <div className="view-item">
                <div className="view-icon">
                  <FiCalendar />
                </div>
                <div className="view-info">
                  <label>Postado em</label>
                  <p>{formatDate(post.createdAt)}</p>
                </div>
              </div>

              <div className="view-item">
                <div className="view-icon">
                  <FiUser />
                </div>
                <div className="view-info">
                  <label>Vendedor</label>
                  <p>{"Carol Sistemas"}</p>
                </div>
              </div>

              <div className="view-item">
                <div className="view-icon">
                  <FiTag />
                </div>
                <div className="view-info">
                  <label>ID Registro</label>
                  <p>#{post.id.toString().slice(-6).toUpperCase()}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default View;
