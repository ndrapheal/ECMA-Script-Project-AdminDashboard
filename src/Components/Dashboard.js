import React from 'react'
import { Outlet } from 'react-router-dom';
const Dashboard = () => {
    return (
      <main className="">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Dashboard</h1>
        </div>
        <div className="row">
          {/* <!-- Cards --> */}
          <div className="col-md-3">
            <div className="card text-white bg-primary mb-3">
              <div className="card-body">
                <h5 className="card-title">Users</h5>
                <p className="card-text">1,234 Active Users</p>
                <i className="lni lni-users fs-2 float-end"></i>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-white bg-success mb-3">
              <div className="card-body">
                <h5 className="card-title">Orders</h5>
                <p className="card-text">567 New Orders</p>
                <i className="lni lni-cart fs-2 float-end"></i>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-white bg-warning mb-3">
              <div className="card-body">
                <h5 className="card-title">Revenue</h5>
                <p className="card-text">$12,345.67</p>
                <i className="lni lni-stats-up fs-2 float-end"></i>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-white bg-danger mb-3">
              <div className="card-body">
                <h5 className="card-title">Alerts</h5>
                <p className="card-text">3 New Alerts</p>
                <i className="lni lni-alarm fs-2 float-end"></i>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
}
export default Dashboard