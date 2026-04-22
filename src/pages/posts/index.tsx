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
import View from "./modais/view";
import Create from "./modais/create";
import Edit from "./modais/edit";
import Delete from "./modais/delete ";
import Pagination from "../../components/Pagination";
import "./styles.css";

function Posts() {
  const dispatch = useDispatch();
  const { posts, loading, meta, loadingDetails, postDetails } = useSelector(
    (state: { post: PostState }) => state.post,
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selected, setSelected] = useState<Post | null>(null);
  const [postDeleted, setPostDeleted] = useState<Post | null>(null);

  useEffect(() => {
    dispatch(fetchPostsRequest({ page: currentPage }));
  }, [dispatch, currentPage]);

  const handleOpenView = (id: number) => {
    dispatch(fetchPostDetailsRequest({ id }));
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
      <div className="container-total">
        <div className="total">total de posts: {meta?.total || 0}</div>
      </div>

      {loading ? (
        <div className="loading-wrapper">
          <Loading />
        </div>
      ) : (
        <>
          <div className="posts-feed">
            {posts?.length === 0 ? (
              <div className="div-notfound">
                <p className="empty-msg">Nenhuma postagem encontrada !</p>
              </div>
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
                      <button
                        className="btn-minimal delete"
                        title="Excluir"
                        onClick={() => {
                          setPostDeleted(post);
                          setIsOpenDeleteModal(true);
                        }}
                      >
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
                      <button className="btn-social share">
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

          {posts?.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={meta?.totalPages || 1}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}
        </>
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
