import React, { useRef, useState } from "react";
import axios from "axios";

const Register = () => {
  const usernameRef = useRef();
  const passwordsRef = useRef();
  const repasswordsRef = useRef();
  const emailRef = useRef();
  const nameRef = useRef();
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
    if (!repasswordsRef.current.value) {
      errors.repasswords = "Nhập lại mật khẩu không được để trống";
    }
    if (passwordsRef.current.value !== repasswordsRef.current.value) {
      errors.repasswords = "Mật khẩu không khớp";
    }
    if (!emailRef.current.value) {
      errors.email = "Email không được để trống";
    }
    if (!nameRef.current.value) {
      errors.name = "Tên không được để trống";
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
      email: emailRef.current.value,
      name: nameRef.current.value,
    };

    console.log("Dữ liệu gửi đi:", user);

    try {
      const response = await axios.post(
        "http://localhost:3500/api/register",
        user
      );

      if (response.status === 201) {
        console.log("Đăng ký thành công:", response.data);
        alert("Đăng ký thành công! Vui lòng đăng nhập.");
        setServerError("");
        window.location.href = "admin/login";
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setServerError(error.response.data.message || "Đăng ký thất bại!");
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
          <h1 className="h4 text-center mb-3">Đăng ký</h1>
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
              <label htmlFor="name" className="form-label">
                Tên người dùng
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Nhập tên người dùng"
                ref={nameRef}
              />
              {errors.name && <div className="text-danger">{errors.name}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Nhập email"
                ref={emailRef}
              />
              {errors.email && (
                <div className="text-danger">{errors.email}</div>
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
            <div className="mb-3">
              <label htmlFor="repasswords" className="form-label">
                Nhập lại mật khẩu
              </label>
              <input
                type="password"
                id="repasswords"
                className="form-control"
                placeholder="Nhập lại mật khẩu"
                ref={repasswordsRef}
              />
              {errors.repasswords && (
                <div className="text-danger">{errors.repasswords}</div>
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
                Đăng ký
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
