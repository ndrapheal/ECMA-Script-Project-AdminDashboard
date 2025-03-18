import React, { useRef, useState } from "react";
import axios from "axios";

const Login = () => {
  const usernameRef = useRef(); 
  const passwordsRef = useRef(); 
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(""); 

  const validateForm = () => {
    const errors = {};
    if (!usernameRef.current.value) {
      errors.username = "Tên đăng nhập không được để trống";
    }
    if (!passwordsRef.current.value) {
      errors.passwords = "Mật khẩu không được để trống";
    }
    return errors;
  };

  const submitDuLieu = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setServerError(""); 
      return;
    }

    const user = {
      username: usernameRef.current.value,
      passwords: passwordsRef.current.value, 
    };

    console.log("Dữ liệu gửi đi:", user);

    try {
      const response = await axios.post(
        "http://localhost:3500/api/login",
        user
      );
      if (response.status === 200) {
        console.log("Đăng nhập thành công:", response.data);
        localStorage.setItem("token", response.data.token); 
        alert("Đăng nhập thành công!");
        setServerError(""); 
        window.location.href = "/products"; // trả về trang chủ
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setServerError(error.response.data.message);
      } else {
        console.error("Lỗi không xác định:", error);
        setServerError("Đã xảy ra lỗi, vui lòng thử lại sau!");
      }
    }
  };

  return (
    <div className="login d-flex justify-content-center align-items-center vh-100">
      <div
        className="card shadow-lg"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="card-body">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h4">Đăng nhập</h1>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Tên đăng nhập
              </label>
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="Nhập tên đăng nhập"
                ref={usernameRef}
              />
              {errors.username && (
                <div className="text-danger">{errors.username}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="passwords" className="form-label">
                Mật khẩu
              </label>
              <input
                type="password"
                id="passwords"
                className="form-control"
                placeholder="Nhập mật khẩu"
                ref={passwordsRef}
              />
              {errors.passwords && (
                <div className="text-danger">{errors.passwords}</div>
              )}
            </div>
            {serverError && (
              <div className="text-danger mb-3">{serverError}</div>
            )}
            <div className="d-grid gap-2">
              <button
                type="button"
                onClick={submitDuLieu}
                className="btn btn-info"
              >
                Đăng nhập
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
