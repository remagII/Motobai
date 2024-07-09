import "./App.css";
import Header from "./Components/Header/Header.jsx";
import Companies from "./Components/Pages/Companies";
import Products from "./Components/Pages/Products";
import Inventory from "./Components/Pages/Inventory";
import Orders from "./Components/Pages/Orders";
import OrderList from "./Components/Pages/OrderList";

import { Route, Routes } from "react-router-dom";
import Container from "./Components/Pages/Container";

function App() {
  return (
    <>
      <Container>
        <Header />
        <Routes>
          <Route path="/companies" element={<Companies />} />
          <Route path="/products" element={<Products />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orderList" element={<OrderList />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
