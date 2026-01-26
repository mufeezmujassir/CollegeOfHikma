import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSlidebar from './AdminSidebar'
const AdminLayout = () => {
  return (
   <div className="d-flex vh-100 overflow-hidden">

      {/* Sidebar */}
      <div style={{ width: "260px", flexShrink: 0 }}>
        <AdminSlidebar />
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 bg-light overflow-auto ">
        <Outlet />
      </div>

    </div>
  )
}

export default AdminLayout
