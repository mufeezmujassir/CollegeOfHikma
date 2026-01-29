import React from 'react'
import { Route,Routes } from 'react-router-dom'

//admin
import Login from '../Pages/Login/Login'
import StaffManagement from '../Pages/Admin/staff/StaffManagement'
import Staff from '../Pages/Staff/Staff'
import AdminLayout from '../Pages/Admin/layout/AdminLayout'
import AdminHeroSlider from '../Pages/Admin/home-editor/HeroSliderManager'
import ManagementMessage from '../Pages/Admin/home-editor/ManagementMessageManage'
import Home from '../Pages/Home/Home'
import NewsManagement from '../Pages/Admin/home-editor/MadrasaNewsManager'
import ResultPage from '../Pages/Results/Results'
import AboutManage from '../Pages/Admin/about-editor/AboutManage'
import AboutHome from'../Pages/About/About'
import NewsList from'../components/News/NewsList'
import ManageResult from '../Pages/Admin/result-editor/ManageResult'
import { ProtectedRoute } from '../components/ProtectedRoute'
import ManageUpcomming from '../Pages/Admin/upcomming-editor/UpcommingManage'
const AppRoutes = () => {
  return (
    <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login />} />
        
        <Route path='/staff' element={<Staff />} />
        <Route path="/result"element={<ResultPage/>}/>
      <Route path='/about' element={<AboutHome/>}/>
      <Route path='/news' element={<NewsList/>}/>
      
      {/* Admin Routes - Protected Layout */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/home/hero" element={<AdminHeroSlider />} />
          <Route path="/admin/home/messages" element={<ManagementMessage />} />
          <Route path="/admin/home/news" element={<NewsManagement />} />
          <Route path='/admin/staff' element={<StaffManagement />} />
          <Route path='/admin/about' element={<AboutManage/>}/>
          <Route path="/admin/results" element={<ManageResult />} />
          <Route path="/admin/upcomming" element={<ManageUpcomming />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default AppRoutes
