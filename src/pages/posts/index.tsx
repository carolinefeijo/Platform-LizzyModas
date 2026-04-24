import {
  BsTrash,
  BsPencilSquare,
  BsPlus,
  BsEye,
  BsShare,
  BsHeart,
  BsHeartFill,
  BsWhatsapp,
  BsFacebook,
  BsX,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { formatDate, formatPrice } from "../../utils";
import type { Post } from "../../store/features/post/types";
import {
  setLikedPostRequest,
  fetchPostDetailsRequest,
  fetchPostsRequest,
  type PostState,
} from "../../store/features/post/postSlice";
import View from "./modais/view";
import Create from "./modais/create";
import Edit from "./modais/edit";
import Delete from "./modais/delete ";
import Pagination from "../../components/Pagination";
import "./styles.css";

function Posts() {
  const dispatch = useDispatch();
  const { posts, meta, loadingDetails, postDetails } = useSelector(
    (state: { post: PostState }) => state.post,
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selected, setSelected] = useState<Post | null>(null);
  const [postDeleted, setPostDeleted] = useState<Post | null>(null);

  // Estados para Compartilhamento
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [postToShare, setPostToShare] = useState<Post | null>(null);

  useEffect(() => {
    dispatch(fetchPostsRequest({ page: currentPage }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [dispatch, currentPage]);

  const handleOpenView = (id: number) => {
    dispatch(fetchPostDetailsRequest({ id }));
    setIsViewOpen(true);
  };

  const handleLike = (userId: number, id: number) => {
    dispatch(setLikedPostRequest({ userId, id }));
  };

  const openShareOptions = (e: React.MouseEvent, post: Post) => {
    e.stopPropagation();
    setPostToShare(post);
    setIsShareModalOpen(true);
  };

  const shareWhatsApp = () => {
    if (!postToShare) return;
    const baseUrl = "https://platform-lizzy-modas-brcq.vercel.app/";
    const message = encodeURIComponent(
      `🛍️ *Lizzy Modas - Novidade!*\n\n` +
        `*Nome:* ${postToShare.name}\n` +
        `*Descrição:* ${postToShare.description || "Sem descrição"}\n` +
        `*Preço:* ${formatPrice(postToShare.price || 0)}\n\n` +
        `Veja as fotos e detalhes aqui:\n${baseUrl}/post/${postToShare.id}`,
    );
    window.open(`https://api.whatsapp.com/send?text=${message}`, "_blank");
    setIsShareModalOpen(false);
  };

  const shareFacebook = () => {
    if (!postToShare) return;
    const shareUrl = encodeURIComponent(
      `https://platform-lizzy-modas-brcq.vercel.app/post/${postToShare.id}`,
    );
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      "_blank",
    );
    setIsShareModalOpen(false);
  };

  return (
    <div className="container">
      <header className="header-actions">
        <div>
          <h2>Publicações</h2>
          <p className="subtitle">Gerencie as postagens da sua loja</p>
        </div>
        <button className="btn-create" onClick={() => setIsOpenModal(true)}>
          <BsPlus size={24} /> Novo
        </button>
      </header>

      <div className="container-total">
        <div className="total">total de posts: {meta?.total || 0}</div>
      </div>

      <div className="posts-feed">
        {posts?.length === 0 ? (
          <div className="div-notfound">
            <p className="empty-msg">Nenhuma postagem encontrada !</p>
          </div>
        ) : (
          posts?.map((post) => (
            <article
              className="post-card"
              key={post.id}
              onClick={() => handleOpenView(post.id)}
              style={{ cursor: "pointer" }}
            >
              <div className="post-header">
                <div className="author-info">
                  <div className="avatar-circle">
                    {post.image ? (
                      <img src={post.image} alt={post.name} />
                    ) : (
                      <div className="avatar-placeholder">
                        {post.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="author-text">
                    <strong className="product-name">
                      {post.name || "Post sem nome"}
                    </strong>
                    <span className="post-date">
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                </div>

                <div className="admin-actions">
                  <button
                    className="btn-minimal edit"
                    title="Editar"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelected(post);
                      setIsOpenEditModal(true);
                    }}
                  >
                    <BsPencilSquare size={18} />
                  </button>
                  <button
                    className="btn-minimal delete"
                    title="Excluir"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPostDeleted(post);
                      setIsOpenDeleteModal(true);
                    }}
                  >
                    <BsTrash size={18} />
                  </button>
                </div>
              </div>

              <div className="post-body">
                <div className="post-tags">
                  <span className="tag">{post.category || "Geral"}</span>
                  <span className="tag price">
                    {formatPrice(post.price || 0)}
                  </span>
                </div>
                <p className="post-description">
                  {post.description || "Sem descrição disponível."}
                </p>
              </div>

              <footer className="post-footer">
                <div className="social-group">
                  <button
                    className="btn-social like"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(post.userId, post.id);
                    }}
                  >
                    {post.likes ? (
                      <BsHeartFill size={20} color="#edaee4" />
                    ) : (
                      <BsHeart size={20} />
                    )}
                    <span>{post.likes ? "Curtiu" : "Curtir"}</span>
                    <span className="like-count">
                      ({post.count?.likes || 0})
                    </span>
                  </button>

                  <button
                    className="btn-social share"
                    onClick={(e) => openShareOptions(e, post)}
                  >
                    <BsShare size={18} />
                    <span>Compartilhar</span>
                  </button>
                </div>

                <button
                  className="btn-details"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenView(post.id);
                  }}
                >
                  <BsEye size={18} /> Ver detalhes
                </button>
              </footer>
            </article>
          ))
        )}
      </div>

      {posts?.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={meta?.totalPages || 1}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}

      {isShareModalOpen && (
        <div
          className="modal-share-overlay"
          onClick={() => setIsShareModalOpen(false)}
        >
          <div
            className="modal-share-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-share-header">
              <h3>Compartilhar</h3>
              <button
                className="btn-close"
                onClick={() => setIsShareModalOpen(false)}
              >
                <BsX size={24} />
              </button>
            </div>
            <p>Escolha uma rede social para publicar:</p>
            <div className="share-options-grid">
              <button className="share-btn whatsapp" onClick={shareWhatsApp}>
                <BsWhatsapp size={24} />
                <span>WhatsApp</span>
              </button>
              <button className="share-btn facebook" onClick={shareFacebook}>
                <BsFacebook size={24} />
                <span>Facebook</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <Create visible={isOpenModal} onClose={() => setIsOpenModal(false)} />
      <Edit
        visible={isOpenEditModal}
        onClose={() => setIsOpenEditModal(false)}
        post={selected}
      />
      <View
        visible={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        post={postDetails}
        loading={loadingDetails}
      />
      <Delete
        visible={isOpenDeleteModal}
        onClose={() => setIsOpenDeleteModal(false)}
        post={postDeleted}
      />
    </div>
  );
}

export default Posts;
