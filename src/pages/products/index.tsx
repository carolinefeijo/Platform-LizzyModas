import { useEffect, useState } from "react";
import type { Product } from "../../store/features/product/types";
import {
  fetchProductsRequest,
  fetchProductSearchRequest,
  type ProductState,
} from "../../store/features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import Create from "./modals/create";
import Edit from "./modals/edit";
import Delete from "./modals/delete ";
import "./styles.css";
import SearchInput from "../../components/SearchInput";

function Products() {
  const dispatch = useDispatch();
  const { products } = useSelector(
    (state: { product: ProductState }) => state.product,
  );

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [selected, setSelected] = useState<Product | null>(null);
  const [productDeleted, setProductDeleted] = useState<Product | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      dispatch(fetchProductSearchRequest(searchTerm));
    } else {
      dispatch(fetchProductsRequest());
    }
  };

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

      <SearchInput
        value={searchTerm}
        onChange={handleInputChange}
        onSearch={handleSearch}
      />
      {products?.length === 0 ? (
        <p>NADA</p>
      ) : (
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
                  <button
                    className="btn-icon edit"
                    onClick={() => {
                      setSelected(product);
                      setIsOpenEditModal(true);
                    }}
                  >
                    <FiEdit2 size={16} />
                  </button>
                  <button
                    className="btn-icon delete"
                    onClick={() => {
                      setProductDeleted(product);
                      setIsOpenDeleteModal(true);
                    }}
                  >
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
      )}

      <Create visible={isOpenModal} onClose={() => setIsOpenModal(false)} />
      <Edit
        visible={isOpenEditModal}
        onClose={() => setIsOpenEditModal(false)}
        product={selected}
      />
      <Delete
        visible={isOpenDeleteModal}
        onClose={() => setIsOpenDeleteModal(false)}
        product={productDeleted}
      />
    </div>
  );
}

export default Products;
