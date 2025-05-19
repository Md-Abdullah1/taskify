import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import allRoutes from "./routes";
import Home from "./views/pages/home";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        {/* <Routes>{allRoutes?.map}</Routes> */}
        <Routes><Route path={`/`} element={<Home/>}></Route></Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
