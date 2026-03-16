import { useEffect, useState } from "react";
import {
  fetchProductsRequest,
  type ProductState,
} from "../../store/features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import "./styles.css";
import Create from "./modals/create";

function Products() {
  const dispatch = useDispatch();
  const { products } = useSelector(
    (state: { product: ProductState }) => state.product,
  );

  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="header-actions">
        <h2>Meus Produtos</h2>
        <button className="btn-create" onClick={() => setIsOpenModal(true)}>
          <FiPlus /> Novo Produto
        </button>
      </div>

      <div className="accordion-list">
        {products?.map((product) => (
          <details className="accordion-item" key={product.id}>
            <summary className="accordion-header">
              <div className="info-group">
                <span className="product-id">#{product.id}</span>
                <strong className="product-name">
                  {product.name || "Sem nome"}
                </strong>
              </div>

              <div className="action-group">
                <button className="btn-icon edit">
                  <FiEdit2 size={16} />
                </button>
                <button className="btn-icon delete">
                  <FiTrash2 size={16} />
                </button>
                <span className="chevron">▾</span>
              </div>
            </summary>

            <div className="accordion-content">
              <p>
                <strong>Descrição:</strong>{" "}
                {product.description || "Sem descrição."}
              </p>
            </div>
          </details>
        ))}
      </div>

      <Create visible={isOpenModal} onClose={() => setIsOpenModal(false)} />
    </div>
  );
}

export default Products;
