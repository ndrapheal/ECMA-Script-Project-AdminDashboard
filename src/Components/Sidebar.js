import "../Css/Sidebar.css";
import React from "react";
import { Link, Outlet } from "react-router-dom";



const Sidebar = () => {
  return (
    <main>
      <div className="d-flex">
        {/* Sidebar */}
        <nav className="">
          <div className="position-sticky">
            <h4 className="p-3 text-center">Trang quản trị</h4>
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link to={`/dashboard`} className="nav-link text-white">
                  <i className="lni lni-dashboard me-2"></i> Trang chính
                </Link>
              </li>
              <li className="nav-item">
                <Link to={`/users`} className="nav-link text-white">
                  <i className="lni lni-users me-2"></i> Người dùng
                </Link>
              </li>
              <li className="nav-item">
                <Link to={`/orders`} className="nav-link text-white">
                  <i className="lni lni-cart me-2"></i> Danh mục
                </Link>
              </li>
              <li className="nav-item">
                <Link to={`/products`} className="nav-link text-white">
                  <i className="lni lni-book me-2"></i> Sản phẩm
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/more"} className="nav-link text-white">
                  <i className="lni lni-cog me-2"></i> Khác
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <Outlet />
      </div>
    </main>
  );
};

export default Sidebar;
