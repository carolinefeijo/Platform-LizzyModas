import { useEffect } from "react";
import {
  fetchProductsRequest,
  type ProductState,
} from "../../store/features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";

function Products() {
  const dispatch = useDispatch();
  const { products } = useSelector(
    (state: { product: ProductState }) => state.product,
  );

  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, []);

  return (
    <div>
      meus produtos sasjHSJAJHSAJHSAJH
      <div className="userList">
        {products?.map((product) => (
          <div className="userRow " key={product.id}>
            <div className="userInfoField">
              <p>{product.id || "jj"}</p>
            </div>

            <div className="userInfoField">
              <p>{product.name || "--"}</p>
            </div>

            <div className="userInfoField">
              <p>{product.description || "--"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
