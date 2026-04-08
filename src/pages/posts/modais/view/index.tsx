import { useEffect, useState } from "react";
import Modal from "../../../../components/Modal";
import type { Post } from "../../../../store/features/post/types";
import {
  BsZoomIn,
  BsInfoCircleFill,
  BsTag,
  BsCalendar2,
  BsLayers,
  BsHeart,
  BsPerson,
} from "react-icons/bs";
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
                  <BsZoomIn />
                  <span>
                    {isZoomed ? "Clique para reduzir" : "Clique para ampliar"}
                  </span>
                </div>
              </div>
            </div>

            <div className="view-header-info">
              <p className="title-modal">{post.name}</p>
              <div className="view-price">{formatPrice(post.price || 0)}</div>
            </div>

            <div className="view-description">
              <label>
                <BsInfoCircleFill size={14} style={{ marginRight: 4 }} />
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
                  <BsTag />
                </div>
                <div className="view-info">
                  <label>ID Registro</label>
                  <p>#{post.id.toString().slice(-6).toUpperCase()}</p>
                </div>
              </div>

              <div className="view-item">
                <div className="view-icon">
                  <BsCalendar2 />
                </div>
                <div className="view-info">
                  <label>Postado em</label>
                  <p>{formatDate(post.createdAt)}</p>
                </div>
              </div>

              <div className="view-item">
                <div className="view-icon">
                  <BsTag />
                </div>
                <div className="view-info">
                  <label>Categoria</label>
                  <p>{post.category || "Geral"}</p>
                </div>
              </div>

              <div className="view-item">
                <div className="view-icon">
                  <BsLayers />
                </div>
                <div className="view-info">
                  <label>Tamanho / Tipo</label>
                  <p>{post.size || "Não especificado"}</p>
                </div>
              </div>

              <div className="view-item">
                <div className="view-icon">
                  <BsPerson />
                </div>
                <div className="view-info">
                  <label>Vendedor</label>
                  <p>{post.user?.name || "Usuário não encontrado"}</p>
                </div>
              </div>

              <div className="view-item">
                <div className="view-icon">
                  <BsHeart />
                </div>
                <div className="view-info">
                  <label>Curtidas</label>

                  <p>{post.count?.likes || "0"}</p>
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
