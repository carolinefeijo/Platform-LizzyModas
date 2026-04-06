import {
  BsTrash,
  BsChevronDown,
  BsPencilSquare,
  BsPlus,
  BsEye,
  BsShare,
  BsFacebook,
  BsInstagram,
  BsWhatsapp,
  BsXLg,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import type { Post } from "../../store/features/post/types";
import {
  fetchPostsRequest,
  type PostState,
} from "../../store/features/post/postSlice";
import Loading from "../../components/Loading";
import { formatDate, formatPrice, getShareLink } from "../../utils";
import "./styles.css";

function Posts() {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector(
    (state: { post: PostState }) => state.post,
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    dispatch(fetchPostsRequest());
  }, [dispatch]);

  const handleOpenShare = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleShare = (platform: "wa" | "fb" | "ig") => {
    if (!selectedPost) return;
    const link = getShareLink(platform, selectedPost);
    window.open(link, "_blank");
  };

  return (
    <div className="container">
      <header className="header-actions">
        <h2>Postagens da loja</h2>
        <button className="btn-create">
          <BsPlus /> Novo Post
        </button>
      </header>

      {loading ? (
        <div className="loading-wrapper">
          <Loading />
        </div>
      ) : (
        <div className="accordion-list">
          {posts?.length === 0 ? (
            <p className="empty-msg">Nenhuma postagem encontrada.</p>
          ) : (
            posts?.map((post) => (
              <details className="accordion-item" key={post.id}>
                <summary className="accordion-header">
                  <div className="info-group">
                    <div className="avatar-circle">
                      {post.image ? (
                        <img src={post.image} alt={post.name} />
                      ) : (
                        <div className="avatar-placeholder">
                          {post.name?.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <strong className="product-name">
                      {post.name || "Sem nome"}
                    </strong>
                  </div>

                  <div className="action-group">
                    <button className="btn-icon view">
                      <BsEye size={16} />
                    </button>
                    <button className="btn-icon edit">
                      <BsPencilSquare size={16} />
                    </button>
                    <button className="btn-icon delete">
                      <BsTrash size={16} />
                    </button>
                    <button
                      className="btn-icon share"
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpenShare(post);
                      }}
                    >
                      <BsShare size={16} />
                    </button>
                    <span className="chevron">
                      <BsChevronDown size={16} />
                    </span>
                  </div>
                </summary>

                <div className="accordion-content">
                  <div className="details-info">
                    <p>
                      <strong>ID:</strong> {post.id}
                    </p>
                    <p>
                      <strong>Criação:</strong> {formatDate(post.createdAt)}
                    </p>
                    <p>
                      <strong>Categoria:</strong> {post.category || "Geral"}
                    </p>
                    <p>
                      <strong>Preço:</strong> {formatPrice(post.price || 0)}
                    </p>
                  </div>
                </div>
              </details>
            ))
          )}
        </div>
      )}

      {/* Modal de Compartilhamento */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <header className="modal-header">
              <h3>Compartilhar Produto</h3>
              <button
                className="close-modal"
                onClick={() => setIsModalOpen(false)}
              >
                <BsXLg />
              </button>
            </header>

            <div className="share-card-preview">
              <div className="share-img-box">
                {selectedPost?.image ? (
                  <img src={selectedPost.image} alt={selectedPost.name} />
                ) : (
                  <div className="no-img-placeholder">Sem Foto</div>
                )}
              </div>
              <div className="share-details-box">
                <h4>{selectedPost?.name}</h4>
                <span className="share-tag">@lizzymodas</span>
                <p className="share-price-label">
                  {formatPrice(selectedPost?.price || 0)}
                </p>
                <small>{selectedPost?.category}</small>
              </div>
            </div>

            <nav className="share-actions-list">
              <button
                className="share-btn wa"
                onClick={() => handleShare("wa")}
              >
                <BsWhatsapp /> WhatsApp
              </button>
              <button
                className="share-btn fb"
                onClick={() => handleShare("fb")}
              >
                <BsFacebook /> Facebook
              </button>
              <button
                className="share-btn ig"
                onClick={() => handleShare("ig")}
              >
                <BsInstagram /> Instagram
              </button>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

export default Posts;
