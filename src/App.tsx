import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import "./App.css";
const App = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default App;
