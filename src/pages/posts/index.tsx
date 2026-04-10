import {
  BsTrash,
  BsPencilSquare,
  BsPlus,
  BsEye,
  BsShare,
  BsHeart,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { formatDate, formatPrice } from "../../utils";
import type { Post } from "../../store/features/post/types";
import {
  fetchPostDetailsRequest,
  fetchPostsRequest,
  type PostState,
} from "../../store/features/post/postSlice";
import Loading from "../../components/Loading";
// import ShareModal from "./modais/share";
import View from "./modais/view";
import Create from "./modais/create";
import "./styles.css";
import Edit from "./modais/edit";

function Posts() {
  const dispatch = useDispatch();
  const { posts, loading, loadingDetails, postDetails } = useSelector(
    (state: { post: PostState }) => state.post,
  );
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  // const [isShareOpen, setIsShareOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selected, setSelected] = useState<Post | null>(null);

  useEffect(() => {
    dispatch(fetchPostsRequest());
  }, [dispatch]);

  // const handleOpenShare = (post: Post) => {
  //   setSelected(post);
  //   setIsShareOpen(true);
  // };

  const handleOpenView = (id: number) => {
    dispatch(
      fetchPostDetailsRequest({
        id,
      }),
    );
    setIsViewOpen(true);
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

      {loading ? (
        <div className="loading-wrapper">
          <Loading />
        </div>
      ) : (
        <div className="posts-feed">
          {posts?.length === 0 ? (
            <p className="empty-msg">Nenhuma postagem encontrada.</p>
          ) : (
            posts?.map((post) => (
              <article className="post-card" key={post.id}>
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
                      onClick={() => {
                        setSelected(post);
                        setIsOpenEditModal(true);
                      }}
                    >
                      <BsPencilSquare size={18} />
                    </button>
                    <button className="btn-minimal delete" title="Excluir">
                      <BsTrash size={18} />
                    </button>
                  </div>
                </div>

                <div
                  className="post-body"
                  onClick={() => handleOpenView(post.id)}
                >
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
                    <button className="btn-social like">
                      <BsHeart size={20} />
                      <span>Curtir</span>
                    </button>
                    <button
                      className="btn-social share"
                      // onClick={() => handleOpenShare(post)}
                    >
                      <BsShare size={18} />
                      <span>Compartilhar</span>
                    </button>
                  </div>

                  <button
                    className="btn-details"
                    onClick={() => handleOpenView(post.id)}
                  >
                    <BsEye size={18} /> Ver detalhes
                  </button>
                </footer>
              </article>
            ))
          )}
        </div>
      )}
      <Create visible={isOpenModal} onClose={() => setIsOpenModal(false)} />
      {/* <Edit
        visible={isOpenEditModal}
        onClose={() => setIsOpenEditModal(false)}
        post={selected}
      /> */}
      <Edit
        key={selected?.id || "new"} // Isso força o reset do estado interno do Edit
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

      {/* <ShareModal
        visible={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        post={selected}
      /> */}
    </div>
  );
}

export default Posts;
