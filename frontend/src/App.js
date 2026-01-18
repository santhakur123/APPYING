import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home"
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Order from "./pages/Orders"

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/product/:id" element ={< ProductDetails/>}/>
          <Route path="/cart" element={<Cart/>} />
          <Route path="/login" element={<Login/>} />
           <Route path="/orders" element={<order/>} />
          <Route
            path="/register"
            element={<Register/>}
          />
          <Route path="/orders" element={<h1>Orders Page (Coming Soon)</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;