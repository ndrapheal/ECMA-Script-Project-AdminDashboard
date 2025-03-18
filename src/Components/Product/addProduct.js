import { useState } from "react";
import axios from "axios";
// import Product from "../../API/models/Product";

const AddProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [successMessage, setSuccessMessage] = useState("");

  const [newProduct, setNewProduct] = useState({
    productId: "",
    name: "",
    price: "",
    specs: { processor: "", ram: "", storage: "", display: "" },
    brand: "",
    image: "",
    rating: "",
    inStock: "",
    releaseDate: "",
  });

  const [errors, setErrors] = useState({});

  // Form validation
  const validateForm = () => {
    const errors = {};
    if (!newProduct.productId) errors.productId = "Product ID is required.";
    if (!newProduct.name) errors.name = "Name is required.";
    if (!newProduct.price) errors.price = "Price is required.";
    if (!newProduct.brand) errors.brand = "Brand is required.";
    if (!newProduct.image) errors.image = "Image URL is required.";
    if (!newProduct.rating) errors.rating = "Rating is required.";
    // if (!newProduct.inStock) errors.inStock = "Stock is required.";
    if (!newProduct.releaseDate)
      errors.releaseDate = "Release date is required.";
    return errors;
  };

  // Handle form submit
 const submitAdd = async (e) => {
   e.preventDefault();
   setIsLoading(true); // Bắt đầu loading

   const formErrors = validateForm();
   if (Object.keys(formErrors).length > 0) {
     setErrors(formErrors);
     setIsLoading(false); // Dừng loading khi có lỗi
     return;
   }

   try {
     const response = await axios.post(
       "http://localhost:3500/api/products/",
       newProduct
     );
     console.log("Sản phẩm đã thêm:", response.data);
     setSuccessMessage("Thêm sản phẩm thành công!");
     setNewProduct({
       productId: "",
       name: "",
       price: "",
       specs: { processor: "", ram: "", storage: "", display: "" },
       brand: "",
       image: "",
       rating: "",
       inStock: "",
       releaseDate: "",
     });
   } catch (error) {
     console.error("Lỗi khi thêm sản phẩm:", error);
   } finally {
     setIsLoading(false); // Dừng loading
   }
 };


  return (
    <main>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Thêm sản phẩm</h1>
      </div>

      <form onSubmit={submitAdd}>
        {/* Product ID */}
        <div className="form-group">
          <label htmlFor="productId">Product ID:</label>
          <input
            type="text"
            id="productId"
            value={newProduct.productId}
            onChange={(e) =>
              setNewProduct({ ...newProduct, productId: e.target.value })
            }
            className="form-control"
          />
          {errors.productId && (
            <div className="text-danger">{errors.productId}</div>
          )}
        </div>

        {/* Name */}
        <div className="form-group">
          <label htmlFor="name">Tên sản phẩm:</label>
          <input
            type="text"
            id="name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="form-control"
          />
          {errors.name && <div className="text-danger">{errors.name}</div>}
        </div>

        {/* Price */}
        <div className="form-group">
          <label htmlFor="name">Giá:</label>
          <input
            type="text"
            id="price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            className="form-control"
          />
        </div>

        {/* Specs */}
        <div className="form-group">
          <h5>Specifications</h5>
          <label htmlFor="processor">Cấu hình:</label>
          <input
            type="text"
            id="processor"
            value={newProduct.specs.processor}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                specs: { ...newProduct.specs, processor: e.target.value },
              })
            }
            className="form-control"
          />
          <label htmlFor="ram">RAM:</label>
          <input
            type="text"
            id="ram"
            value={newProduct.specs.ram}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                specs: { ...newProduct.specs, ram: e.target.value },
              })
            }
            className="form-control"
          />
          <label htmlFor="storage">Bộ nhớ:</label>
          <input
            type="text"
            id="storage"
            value={newProduct.specs.storage}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                specs: { ...newProduct.specs, storage: e.target.value },
              })
            }
            className="form-control"
          />
          <label htmlFor="display">Màn hình:</label>
          <input
            type="text"
            id="display"
            value={newProduct.specs.display}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                specs: { ...newProduct.specs, display: e.target.value },
              })
            }
            className="form-control"
          />
        </div>

        {/* Brand */}
        <div className="form-group">
          <label htmlFor="brand">Thương hiệu:</label>
          <input
            type="text"
            id="brand"
            value={newProduct.brand}
            onChange={(e) =>
              setNewProduct({ ...newProduct, brand: e.target.value })
            }
            className="form-control"
          />
          {errors.brand && <div className="text-danger">{errors.brand}</div>}
        </div>

        {/* Image URL */}
        <div className="form-group">
          <label htmlFor="image">URL ảnh:</label>
          <input
            type="text"
            id="image"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
            className="form-control"
          />
          {errors.image && <div className="text-danger">{errors.image}</div>}
        </div>

        {/* Rating */}
        <div className="form-group">
          <label htmlFor="rating">Đánh giá:</label>
          <input
            type="number"
            id="rating"
            value={newProduct.rating}
            onChange={(e) =>
              setNewProduct({ ...newProduct, rating: e.target.value })
            }
            className="form-control"
          />
          {errors.rating && <div className="text-danger">{errors.rating}</div>}
        </div>

        {/* In Stock */}
        <div className="form-group">
          <label>Tồn kho:</label>
          <div>
            <label>
              <input
                type="radio"
                name="inStock"
                value="true"
                checked={newProduct.inStock === true}
                onChange={() => setNewProduct({ ...newProduct, inStock: true })}
              />
              Yes
            </label>
            <label className="ms-3">
              <input
                type="radio"
                name="inStock"
                value="false"
                checked={newProduct.inStock === false}
                onChange={() =>
                  setNewProduct({ ...newProduct, inStock: false })
                }
              />
              No
            </label>
          </div>
        </div>

        {/* Release Date */}
        <div className="form-group">
          <label htmlFor="releaseDate">Ngày cập nhật:</label>
          <input
            type="date"
            id="releaseDate"
            value={newProduct.releaseDate}
            onChange={(e) =>
              setNewProduct({ ...newProduct, releaseDate: e.target.value })
            }
            className="form-control"
          />
          {errors.releaseDate && (
            <div className="text-danger">{errors.releaseDate}</div>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary mt-3"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </main>
  );
};

export default AddProduct;
