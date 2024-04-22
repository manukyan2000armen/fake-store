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
import {
  faCartShopping,
  faMinus,
  faPencil,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import UpdateProductData from "../../component/UpdateProductData";
import Swal from "sweetalert2";

function Personal() {
  const { product } = useAppSelector((st: RootState) => st.products);
  const dispatch = useAppDispatch();
  const [count, setCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [startAnimation, setStartAnimation] = useState(false);

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

  const handleAddToCartWithAnimation = (id: number) => {
    setStartAnimation(true);

    setTimeout(() => {
      setStartAnimation(false);

      dispatch(addToCart(id))
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Product added to cart!",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((error) => {
          console.error("Error adding to cart:", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        });
    }, 1000);
  };
  return (
    <div className="personalPage">
      <div className={`personalItems ${startAnimation ? "animate" : ""}`}>
        <div className={`forImg ${startAnimation ? "animate" : ""}`}>
          <img src={product.image} alt="Product Image" />
        </div>
        <div className="forTexts">
          <h3>{product.title}</h3>
          <span className="titleSpan"></span>
          <p>{product.description}</p>
          <p>$ {product.price}</p>
          <div className="forIncAndDecButtons">
            <button onClick={decrament}>
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <span>{count}</span>
            <button onClick={incrament}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <button
            className="btn btn-outline-secondary buy"
            onClick={() => handleAddToCartWithAnimation(product.id)}
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
      <div className="cartAnimation">
        <button>
          <FontAwesomeIcon icon={faCartShopping} />
        </button>
      </div>
    </div>
  );
}

export default Personal;
