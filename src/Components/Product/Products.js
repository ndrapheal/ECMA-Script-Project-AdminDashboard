import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../Css/Product.css";

const Products = () => {
  const [products, setProduct] = useState([]);


  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10  ;

  // Gọi API để lấy danh sách sản phẩm
  
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3500/api/products");
      setProduct(response.data);
    } catch (error) {
      console.error("Lỗi khi fetch sản phẩm:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Hàm xóa sản phẩm
  const deletePro = async (productId) => {
    const confirmDelete = window.confirm("Bạn có muốn xóa sản phẩm này không?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3500/api/admin/delete/${productId}`);
        console.log(`Xóa thành công sản phẩm ${productId}`);
        
        setProduct(
          products.filter((product) => product.productId !== productId)
        );
      } catch (error) {
        console.error("Lỗi trong quá trình xóa:", error);
      }
    }
  };


  // Tính toán các sản phẩm hiện tại

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <main>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Sản phẩm</h1>
      </div>
      <div className="mb-3">
        <Link to="/admin/addpro" className="btn btn-success btn-sm">
          <i className="lni lni-plus"></i> Thêm sản phẩm
        </Link>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>ID sản phẩm</th>
                  <th>Tên</th>
                  <th>Thương hiệu</th>
                  <th>Giá (VND)</th>
                  <th>Đánh giá</th>
                  <th>Kho</th>
                  <th>Ngày cập nhật</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((product, index) => (
                  <tr key={product.productId}>
                    <td>{index + 1}</td>
                    <td>{product.productId}</td>
                    <td>{product.name}</td>
                    <td>{product.brand}</td>
                    <td>{product.price}</td>
                    <td>{product.rating}</td>
                    <td>{product.inStock ? "Còn" : "Hết"}</td>
                    <td>
                      {new Date(product.releaseDate).toLocaleDateString("vi")}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm me-2"
                        onClick={() => deletePro(product.productId)}
                      >
                        <i className="lni lni-trash-can"></i> Xóa
                      </button>
                      <Link
                        to={`/admin/update/${product.productId}`}
                        className="btn btn-secondary btn-sm"
                      >
                        <i className="lni lni-pencil-alt"></i> Sửa
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              productsPerPage={productsPerPage}
              totalProducts={products.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </main>
  );
};


const Pagination = ({
  productsPerPage,
  totalProducts,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];  
  for (let i = 1; i <= 5; i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${number === currentPage ? "active" : ""}`}
          >
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Products;
