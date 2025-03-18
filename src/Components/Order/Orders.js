import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Order = () => {
const [Brands, setBrands] = useState([]);
  const navigate = useNavigate();
// fetch danh mục
  
const fetchBrand = async () => {
  try {
    const response = await axios.get("http://localhost:3500/api/categories");
    setBrands(response.data);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

  useEffect(() => {
    fetchBrand();
  }, []);

  // Hàm xóa danh mục
  
   const deleteBrand = async (brandId) => {
     const confirmDelete = window.confirm(
       "Bạn có muốn xóa sản phẩm này không?"
     );
     if (confirmDelete) {
       try {
         await axios.delete(
           `http://localhost:3500/api/admin/deleteBrand/${brandId}`
         );
         console.log(`Xóa thành công sản phẩm ${brandId}`);

         setBrands(
           Brands.filter((brand) => brand.brandId !== brandId)
         );
         setTimeout(() => {
           navigate("/orders");
         }, 2000);
       } catch (error) {
         console.error("Lỗi trong quá trình xóa:", error);
       }
     }
   }; // done


  return (
    <main>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Danh mục</h1>
      </div>
      <div className="mb-3">
        <Link to="/admin/addBrand" className="btn btn-success btn-sm">
          <i className="lni lni-plus"></i> Thêm danh mục
        </Link>
        </div>
      <div className="row mt-4">
        <div className="col-12">
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Brand ID</th>
                  <th>Tên Danh mục</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody id="userTableBody">
                {Brands.length > 0 ? (
                  Brands.map((brand, index) => (
                    <tr key={brand.brandId  || index}>
                      <td>{index + 1}</td>
                      <td>{brand.brandId}</td>
                      <td>{brand.brand}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm me-2"
                          onClick={() => deleteBrand(brand.brandId)}
                        >
                          <i className="lni lni-trash-can"></i> Xóa
                        </button>
                        <Link
                          to={`/admin/updateBrand/${brand.brandId}`}
                          className="btn btn-secondary btn-sm"
                        >
                          <i className="lni lni-pencil-alt"></i> Sửa
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      Không có dữ liệu
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Order;
