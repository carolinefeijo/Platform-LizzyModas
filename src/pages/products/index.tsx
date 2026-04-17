import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { Product } from "../../store/features/product/types";
import {
  fetchProductsRequest,
  fetchProductSearchRequest,
  type ProductState,
} from "../../store/features/product/productSlice";
import Create from "./modals/create";
import Edit from "./modals/edit";
import Delete from "./modals/delete ";
import SearchInput from "../../components/SearchInput";
import Loading from "../../components/Loading";
import { BsChevronDown, BsPencilSquare, BsPlus, BsTrash } from "react-icons/bs";
import { formatDate, formatPrice } from "../../utils";
import "./styles.css";

function Products() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector(
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
        <div>
          <h2>Meus Produtos</h2>
          <p className="subtitle">Gerencie os produtos da sua loja</p>
        </div>
        <button className="btn-create" onClick={() => setIsOpenModal(true)}>
          <BsPlus size={18} />
          Novo
        </button>
      </div>

      <SearchInput
        placeholder="Digite o nome do produto"
        value={searchTerm}
        onChange={handleInputChange}
        onSearch={handleSearch}
      />

      {loading ? (
        <div style={{ marginTop: "12rem" }}>
          <Loading />
        </div>
      ) : (
        <>
          {products?.length === 0 ? (
            <p>Nada encontrado</p>
          ) : (
            <div className="accordion-list">
              {products?.map((product) => (
                <details className="accordion-item" key={product.id}>
                  <summary className="accordion-header">
                    <div className="info-group">
                      <div className="avatar-circle">
                        {product.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="author-text">
                        <strong className="product-name">
                          {product.name || "Sem nome"}
                        </strong>

                        <span className="post-date">
                          {formatDate(product.createdAt)}
                        </span>
                      </div>
                    </div>

                    <div className="action-group">
                      <button
                        className="btn-icon edit"
                        onClick={() => {
                          setSelected(product);
                          setIsOpenEditModal(true);
                        }}
                      >
                        <BsPencilSquare size={16} />
                      </button>
                      <button
                        className="btn-icon delete"
                        onClick={() => {
                          setProductDeleted(product);
                          setIsOpenDeleteModal(true);
                        }}
                      >
                        <BsTrash size={16} />
                      </button>
                      <span className="chevron">
                        <BsChevronDown size={16} />
                      </span>
                    </div>
                  </summary>

                  <div className="accordion-content">
                    <p>
                      <strong>ID:</strong> {product.id}
                    </p>

                    <p>
                      <strong>Criado por:</strong> {product.createdBy.name}
                    </p>
                    <p>
                      <strong>Descrição:</strong>{" "}
                      {product.description || "Sem descrição."}
                    </p>
                    <p>
                      <strong>Preço:</strong> {formatPrice(product.price)}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          )}
        </>
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
