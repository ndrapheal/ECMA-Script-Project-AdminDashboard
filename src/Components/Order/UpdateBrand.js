import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateBrand = () => {
  const { brandId } = useParams();
  const [brand, setBrand] = useState(""); // Tên danh mục
    

// thông báo
    
  const [error, setError] = useState(""); // lỗi
  const [successMessage, setSuccessMessage] = useState(""); //  thành công
   
// điều hướng    
    
  const navigate = useNavigate();

  
  const fetchBrand = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3500/api/categories/${brandId}`
        );
        const brandData = response.data;
      setBrand(brandData.brand); 
      setError(""); 
    } catch (err) {
      setError(
        err.response?.status === 404
          ? "Danh mục không tồn tại!"
          : "Lỗi kết nối với server!",
      );
      console.error("Error fetching brand:", err);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!brand.trim()) {
      setError("Tên danh mục không được để trống!");
      return;
    }

    try {
      await axios.put(
        `http://localhost:3500/api/admin/updateBrand/${brandId}`,
        { brand }
        );
        
      setSuccessMessage("Cập nhật thành công!");
      setError("");
        
      setTimeout(() => {
        navigate("/orders"); 
      }, 2000);
        
    } catch (err) {
      setError("Lỗi khi cập nhật danh mục!");
      console.error("Lỗi khi cập nhật danh mục:", err);
    }
  };


  useEffect(() => {
    fetchBrand();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Cập nhật danh mục</h1>
      </div>
      <div className="container mt-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="brand" className="form-label">
              Tên danh mục
            </label>
            <input
              type="text"
              className="form-control input-brand"
              id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>

          {/* Hiển thị thông báo */}
          {error && <div className="alert alert-danger">{error}</div>}
          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}

          <button type="submit" className="btn btn-primary btn-sm me-2">
            <i className="lni lni-pencil-alt"></i> Cập nhật
          </button>
        </form>
      </div>
    </main>
  );
};

export default UpdateBrand;
