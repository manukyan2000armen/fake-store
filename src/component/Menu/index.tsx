import { NavLink } from "react-router-dom";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

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

  const [showMenu, setShowMenu] = useState(false);
  const [menuIcon, setMenuIcon] = useState(faBars);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setMenuIcon(showMenu ? faBars : faTimes);
  };

  return (
    <div className="myMenu">
      <div className="burgerIcon" onClick={toggleMenu}>
        <FontAwesomeIcon icon={menuIcon} />
      </div>
      <div className={`myMenuItems ${showMenu ? "show" : ""}`}>
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
