import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import {
  addToCart,
  getAllCategories,
  getAllProducts,
  getProductsByCategory,
  getSortedProducts,
} from "../../features/Product/productAPI";
import "./style.scss";
import { Product } from "../../type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowRight,
  faArrowUp,
  faCheck,
  faPlus,
  faShoppingCart,
  faSpinner,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTelegram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import { Link, useNavigate } from "react-router-dom";
import AddProductModal from "../../component/AddProductModal";
import Swal from "sweetalert2";

function Products() {
  const { products, categories } = useAppSelector(
    (st: RootState) => st.products
  );
  const { cartItems } = useAppSelector((st: RootState) => st.carts);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const productsRef = useRef<HTMLDivElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState<{
    [key: number]: boolean;
  }>({});
  const [addedProducts, setAddedProducts] = useState<{
    [key: number]: boolean;
  }>({});
  const [selectedProductIndex, setSelectedProductIndex] = useState<number>(0);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // console.log("Key pressed:", event.key);
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        setSelectedProductIndex((prevIndex) =>
          Math.min(prevIndex + 1, products.length - 1)
        );
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        setSelectedProductIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [products]);

  const scrollToSelectedProduct = () => {
    if (
      productsRef.current &&
      productsRef.current.children[selectedProductIndex]
    ) {
      productsRef.current.children[selectedProductIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  useEffect(() => {
    scrollToSelectedProduct();
  }, [selectedProductIndex]);

  const shortenTitle = (title: string) => {
    if (title.length > 30) {
      return title.slice(0, 30) + "...";
    }
    return title;
  };

  const filteredProducts = (category: string) => {
    dispatch(getProductsByCategory(category));
  };

  const handleSort = (sort: string) => {
    dispatch(getSortedProducts(sort));
  };

  const handleAddToCart = (productId: number) => {
    setLoadingProducts({ ...loadingProducts, [productId]: true });

    const isProductInCart = cartItems.some((item) => item.id === productId);

    if (!isProductInCart) {
      dispatch(addToCart(productId))
        .then(() => {
          setAddedProducts({ ...addedProducts, [productId]: true });
          setTimeout(() => {
            setLoadingProducts({ ...loadingProducts, [productId]: false });
            setAddedProducts({ ...addedProducts, [productId]: true });
          }, 1500);
        })
        .catch((error) => {
          console.error("Error adding to cart:", error);
          setLoadingProducts({ ...loadingProducts, [productId]: false });
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "This product is already in the cart",
      });
      // console.log("This product is already in the cart");
      setLoadingProducts({ ...loadingProducts, [productId]: false });
    }
  };

  return (
    <div className="forProducts">
      <div className="nkariHamar">
        <div className="blur">
          <h3 className="card-title display-3 fw-bolder mb-0">
            NEW SEASON ARRIVALS
          </h3>
          <p className="card-text lead fs-2">CHECK OUT ALL THE TRENDS</p>
        </div>
      </div>
      <div className="forButtons">
        {categories?.map((elm: any) => {
          return (
            <button value={elm} key={elm} onClick={() => filteredProducts(elm)}>
              {elm}
            </button>
          );
        })}
      </div>
      <div className="forSort">
        <div className="sortButtons">
          <button
            onClick={() => handleSort("asc")}
            className="btn btn-outline-secondary"
          >
            Sort Ascending <FontAwesomeIcon icon={faArrowUp} />
          </button>
          <button
            onClick={() => handleSort("desc")}
            className="btn btn-outline-secondary"
          >
            Sort Descending <FontAwesomeIcon icon={faArrowDown} />
          </button>
        </div>
        <div className="addNewProductBtn">
          <button onClick={handleOpenModal}>
            <FontAwesomeIcon icon={faPlus} /> Add new Product
          </button>
        </div>
      </div>
      <div className="products" ref={productsRef}>
        {products?.map((elm: Product, index: number) => {
          const loading = loadingProducts[elm.id];
          const added = addedProducts[elm.id];
          return (
            <div
              key={elm.id}
              className={`productCard ${
                index === selectedProductIndex ? "selected" : ""
              }`}
            >
              <img src={elm.image} alt="Product Image" />
              <p className="pTitle">{shortenTitle(elm.title)}</p>
              <p>$ {elm.price}</p>

              <div className="forShoppingCart">
                <button onClick={() => navigate("/product/" + elm.id)}>
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
                <button onClick={() => handleAddToCart(elm.id)}>
                  {loading ? (
                    <FontAwesomeIcon icon={faSpinner} spin />
                  ) : added ? (
                    <FontAwesomeIcon
                      icon={faCheck}
                      style={{ color: "green", fontSize: "18px" }}
                    />
                  ) : (
                    <FontAwesomeIcon icon={faShoppingCart} />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {isModalOpen && <AddProductModal handleCloseModal={handleCloseModal} />}
      <div className="footer">
        <div className="forP">
          <span>© 2024 All rights reserved.</span>
        </div>
        <div className="forIcons">
          <FontAwesomeIcon icon={faInstagram} className="i" />
          <FontAwesomeIcon icon={faTwitter} className="i" />
          <FontAwesomeIcon icon={faFacebook} className="i" />
          <FontAwesomeIcon icon={faTelegram} className="i" />
        </div>
      </div>
    </div>
  );
}

export default Products;
