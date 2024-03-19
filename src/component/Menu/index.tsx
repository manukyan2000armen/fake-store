import { NavLink } from "react-router-dom";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

function Menu() {
  const navLinkStyles = ({ isActive }: any) => {
    return {
      fontWeight: isActive ? "600" : "500",
      color: isActive ? "#fff" : "#fff",
      textDecoration: isActive ? "underline " : "none",
      textUnderlineOffset: isActive ? " 0.3em" : "normal",
      letterSpacing: isActive ? "2px" : "normal",
    };
  };
  return (
    <div className="myMenu">
      <div className="myMenuItems">
        <ul>
          <li>
            <NavLink style={navLinkStyles} to={"/"}>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink style={navLinkStyles} to={"/user"}>
              Users
            </NavLink>
          </li>

          <li>
            <NavLink style={navLinkStyles} to={"/cart"}>
              Cart <FontAwesomeIcon icon={faCartShopping} />
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Menu;
