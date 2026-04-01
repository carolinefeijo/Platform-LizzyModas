import "./styles.css";
import { BsTrash, BsChevronDown, BsPencilSquare, BsPlus } from "react-icons/bs";

import "./styles.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchPostsRequest } from "../../store/features/post/postSlice";

function Products() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostsRequest());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="header-actions">
        <h2>Postagens da loja</h2>
        <button className="btn-create" onClick={() => {}}>
          <BsPlus /> Nova Postagem
        </button>
      </div>

      <div style={{ marginTop: "12rem" }}></div>

      <div className="accordion-list">
        <details className="accordion-item">
          <summary className="accordion-header">
            <div className="info-group">
              <div className="avatar-circle"></div>
              <strong className="product-name">"Sem nome"</strong>
            </div>

            <div className="action-group">
              <button className="btn-icon edit">
                <BsPencilSquare size={16} />
              </button>
              <button className="btn-icon delete">
                <BsTrash size={16} />
              </button>
              <span className="chevron">
                <BsChevronDown size={16} />
              </span>
            </div>
          </summary>

          <div className="accordion-content">
            <p>
              <strong>Descrição:</strong>{" "}
            </p>
          </div>
        </details>
      </div>
    </div>
  );
}

export default Products;
