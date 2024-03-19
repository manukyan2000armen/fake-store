import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import {
  addToCart,
  deleteProductById,
  getSingleProduct,
} from "../../features/Product/productAPI";
import { useParams } from "react-router-dom";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPencil, faPlus } from "@fortawesome/free-solid-svg-icons";
import UpdateProductData from "../../component/UpdateProductData";
import Swal from "sweetalert2";

function Personal() {
  const { product } = useAppSelector((st: RootState) => st.products);
  const dispatch = useAppDispatch();
  const [count, setCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const incrament = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  const decrament = useCallback(() => {
    if (count > 0) {
      setCount(count - 1);
    }
  }, [count]);

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      dispatch(getSingleProduct(+params.id));
    }
  }, []);

  const handleAddToCartFromPersonalPage = (id: number) => {
    dispatch(addToCart(id))
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Product added to cart!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(id, "added");
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };
  return (
    <div className="personalPage">
      <div className="personalItems">
        <div className="forImg">
          <img src={product.image} alt="Product Image" />
        </div>
        <div className="forTexts">
          <h3>{product.title}</h3>
          <span className="titleSpan"></span>
          <p>{product.description}</p>
          <p>$ {product.price}</p>
          <div className="forIncAndDecButtons">
            <button onClick={incrament}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <span>{count}</span>
            <button onClick={decrament}>
              <FontAwesomeIcon icon={faMinus} />
            </button>
          </div>
          <button
            className="btn btn-outline-secondary buy"
            onClick={() => handleAddToCartFromPersonalPage(product.id)}
          >
            Add to Cart
          </button>
          <span className="spanUpdate">Update Product Data</span>
          <div className="forUpdAndDel">
            <button className="updateBtn" onClick={handleOpenModal}>
              <FontAwesomeIcon icon={faPencil} />
            </button>
            <button
              className="delBtn"
              onClick={() => dispatch(deleteProductById(product.id))}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && <UpdateProductData handleCloseModal={handleCloseModal} />}
    </div>
  );
}

export default Personal;
