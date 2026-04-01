import "./styles.css";
import { BsTrash, BsChevronDown, BsPencilSquare, BsPlus } from "react-icons/bs";

import "./styles.css";

function Products() {
  return (
    <div className="container">
      <div className="header-actions">
        <h2>Postagens da loja</h2>
        <button className="btn-create" onClick={() => {}}>
          <BsPlus /> Nova Postagem
        </button>
      </div>

      {/* <SearchInput
        placeholder="Digite o nome do produto"
        value={searchTerm}
        onChange={handleInputChange}
        onSearch={handleSearch}
      /> */}

      {/* {loading ? ( */}
      <div style={{ marginTop: "12rem" }}>{/* <Loading /> */}</div>
      {/* //   ) : ( */}
      {/* //     <> */}
      {/* //       {products?.length === 0 ? ( */}
      {/* //         <p>Nada encontrado</p>
        //   ) : ( */}
      <div className="accordion-list">
        {/* {products?.map((product) => ( */}
        <details className="accordion-item">
          <summary className="accordion-header">
            <div className="info-group">
              <div className="avatar-circle">
                {/* {product.name.charAt(0).toUpperCase()} */}
              </div>
              <strong className="product-name">"Sem nome"</strong>
            </div>

            <div className="action-group">
              <button
                className="btn-icon edit"
                // onClick={() => {
                //   setSelected(product);
                //   setIsOpenEditModal(true);
                // }}
              >
                <BsPencilSquare size={16} />
              </button>
              <button
                className="btn-icon delete"
                // onClick={() => {
                //   setProductDeleted(product);
                //   setIsOpenDeleteModal(true);
                // }}
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
              <strong>Descrição:</strong>{" "}
              {/* {product.description || "Sem descrição."} */}
            </p>
          </div>
        </details>
      </div>
      {/* )}
        </> */}
      {/* )} */}

      {/* <Create visible={isOpenModal} onClose={() => setIsOpenModal(false)} />
      <Edit
        visible={isOpenEditModal}
        onClose={() => setIsOpenEditModal(false)}
        product={selected}
      />
      <Delete
        visible={isOpenDeleteModal}
        onClose={() => setIsOpenDeleteModal(false)}
        product={productDeleted}
      /> */}
    </div>
  );
}

export default Products;
