import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [brand, setCategory] = useState(""); // Tên danh mục
  const [error, setError] = useState(""); // Lỗi
  const [successMessage, setSuccessMessage] = useState(""); // Thành công
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!brand.trim()) {
      setError("Tên danh mục không được để trống!");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3500/api/categories",
        { brand }
        );
        setCategory(response.data)

      setSuccessMessage("Thêm danh mục thành công!");
      setError("");

      setTimeout(() => {
        navigate("/orders");
      }, 2000);
    } catch (err) {
      setError("Lỗi khi thêm danh mục!");
      console.error("Lỗi khi thêm danh mục:", err);
    }
  };


  return (
    <main>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Thêm danh mục</h1>
      </div>
      <div className="container mt-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Tên danh mục muốn thêm
            </label>
            <input
              type="text"
              className="form-control input-category"
              id="category"
              value={brand}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          {/* Hiển thị thông báo */}
          {error && <div className="alert alert-danger">{error}</div>}
          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}

          <button type="submit" className="btn btn-primary btn-sm me-2">
            <i className="lni lni-plus"></i> Thêm danh mục
          </button>
        </form>
      </div>
    </main>
  );
};

export default AddCategory;
