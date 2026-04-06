import {
  BsTrash,
  BsChevronDown,
  BsPencilSquare,
  BsPlus,
  BsEye,
  BsShare,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import type { Post } from "../../store/features/post/types";
import {
  fetchPostsRequest,
  type PostState,
} from "../../store/features/post/postSlice";
import Loading from "../../components/Loading";
import { formatDate, formatPrice } from "../../utils";
import "./styles.css";
import ShareModal from "./modais/share";

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
                      <strong>ID do produto:</strong> {post.id}
                    </p>
                    <p>
                      <strong>Criação da postagem:</strong>{" "}
                      {formatDate(post.createdAt)}
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

      <ShareModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        post={selectedPost}
      />
    </div>
  );
}

export default Posts;
