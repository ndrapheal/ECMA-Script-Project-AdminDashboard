import { Link } from "react-router-dom";
import React from "react";

const More = () => {
    return (
      <main>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">More</h1>
        </div>

        <div className="table-responsive">
          <Link to={`/admin/addpro`}>Addproduct</Link>
        </div>
        <div className="table-responsive">
          <Link to={`/admin/login`}>Login</Link>
        </div>
        <div className="table-responsive">
          <Link to={`/admin/register`}>Register</Link>
        </div>
      </main>
    );
}
export default More;