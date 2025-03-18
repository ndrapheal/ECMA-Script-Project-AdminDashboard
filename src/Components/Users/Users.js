import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";

const Users = () => {
  // call API
  const [Users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3500/api/users") 
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu users:", error);
        setError(error.message);
      });
  }, []);

  if (error) {
    return <p>Lỗi khi tải dữ liệu: {error}</p>;
  }

  return (
    <main>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Người dùng</h1>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>user ID</th>
                  <th>Tên người dùng</th>
                  <th>Email</th>
                  <th>Tài khoản</th>
                  <th>Mật khẩu</th>
                </tr>
              </thead>
              <tbody id="userTableBody">
                {Users.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.userId}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.username}</td>
                    <td>{user.passwords}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Users;
