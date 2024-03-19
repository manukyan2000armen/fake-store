import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { Product } from "../../type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";
import StripeCheckout from "react-stripe-checkout";
import { removeItemFromCart } from "../../features/CartF/cartSlice";
import { useEffect, useState } from "react";

function Cart() {
  const { cartItems } = useAppSelector((st: RootState) => st.carts);
  console.log(cartItems);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  const onToken = (token: any) => {
    console.log(token);
  };

  const handleRemoveItem = (productId: number) => {
    dispatch(removeItemFromCart(productId));
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
  return (
    <div className="forCartProduct">
      <div className="carousel">
        <img src={`./video/${currentImageIndex + 1}.jpg`} />
      </div>
      <div className="cartProduct">
        <div className="total">
          <span>Total Price: ${totalPrice.toFixed(2)}</span>
        </div>
        {cartItems?.map((elm: Product) => {
          return (
            <div key={elm.id} className="cartProductItems">
              <div className="forImg">
                <img src={elm.image} alt="Product Image" />
              </div>
              <div className="cartTexts">
                <h4>{elm.title}</h4>
                <p>$ {elm.price}</p>
                <p>Category: {elm.category}</p>
                <p>
                  {" "}
                  <FontAwesomeIcon
                    icon={faStar}
                    style={{ color: "tomato" }}
                  />{" "}
                  {elm.rating && elm.rating.rate}
                </p>
                <div className="forBuyOrRemove">
                  <button onClick={() => handleRemoveItem(elm.id)}>
                    Remove
                  </button>
                  <StripeCheckout
                    token={onToken}
                    name="Payment System"
                    stripeKey="my_PUBLISHABLE_stripekey"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Cart;
