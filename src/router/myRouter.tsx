import { useRoutes } from "react-router-dom";
import Products from "../pages/Products";
import User from "../pages/Users";
import Cart from "../pages/Cart";
import Personal from "../pages/Personal";
import UserPersonal from "../pages/UserPersonal";

function MyRouter() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Products />,
    },
    {
      path: "user",
      element: <User />,
    },
    {
      path: "users/:id",
      element: <UserPersonal />,
    },
    {
      path: "cart",
      element: <Cart />,
    },
    {
      path: "product/:id",
      element: <Personal />,
    },
  ]);
  return routes;
}

export default MyRouter;
