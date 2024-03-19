import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Menu from "./component/Menu";
import MyRouter from "./router/myRouter";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Menu />
        <MyRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
