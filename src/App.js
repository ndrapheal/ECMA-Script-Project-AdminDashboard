// Imports look correct and necessary for the application
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";

import Sidebar from "./Components/Sidebar";
import Dashboard from "./Components/Dashboard";
import Products from "./Components/Product/Products";
import Users from "./Components/Users/Users"; 
import More from "./Components/More";
import Order from "./Components/Order/Orders";
import UpdateBrand from "./Components/Order/UpdateBrand";
import AddProduct from "./Components/Product/addProduct";
import EditProduct from "./Components/Product/editProduct";
import Login from "./Components/Login";
import Register from "./Components/Register";
import AddBrand from "./Components/Order/AddBrand";

function App() {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-lg-2 d-md-block bg-dark sidebar text-white vh-100">
            <Sidebar />
          </div>
          <div className="col-md-9 col-lg-10 main-content">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/users" element={<Users />} />
              <Route path="/orders" element={<Order />}></Route>
              <Route path="/more" element={<More />}></Route>
              <Route path="/admin/update/:id" element={<EditProduct />}></Route>
              <Route path="/admin/addpro" element={<AddProduct />}></Route>
              <Route path="/admin/delete/:id" element={<deletePro />}></Route>
              <Route path="/admin/login" element={<Login />}></Route>
              <Route path="/admin/register" element={<Register />}></Route>
              <Route path="/admin/updateBrand/:brandId" element={<UpdateBrand />} />
              <Route path="/admin/addBrand" element={<AddBrand />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
