import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate,Link } from 'react-router-dom';
import './Adminsidebar.css';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isAdminLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const menuItems = [
    {
      title: 'Dashboard',
      path: '/admin/dashboard',
      icon: '📊'
    },
    {
      title: 'Manage Staff',
      path: '/admin/staff',
      icon: '👥'
    },
    {
      title: 'Manage Results',
      path: '/admin/results',
      icon: '📝'
    },
    {
      title: 'Manage Slider',
      path: '/admin/home/hero',
      icon: '🖼️'
    },
    {
      title: 'Upcoming Events',
      path: '/admin/home/events',
      icon: '📅'
    },
    {
      title: 'Management Messages',
      path: '/admin/home/messages',
      icon: '💬'
    },
    {
      title: 'About Madrasa',
      path: '/admin/about',
      icon: '🏫'
    },
    {
      title: 'News & Announcements',
      path: '/admin/home/news',
      icon: '📰'
    }
  ];

  return (
    <div className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      
      {/* Header Section */}
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo-icon">🎓</div>
          {!isCollapsed && (
            <div className="logo-text">
              <h5 className="mb-0">Admin Panel</h5>
              <small className="text-light-green">Dharul Hikma</small>
            </div>
          )}
        </div>
        
        <button 
          className="collapse-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Expand' : 'Collapse'}
        >
          {isCollapsed ? '»' : '«'}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item, index) => (
            <li key={index} className="nav-item">
              <NavLink 
                to={item.path}
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }
                title={isCollapsed ? item.title : ''}
              >
                <span className="nav-icon">{item.icon}</span>
                {!isCollapsed && <span className="nav-text">{item.title}</span>}
                {!isCollapsed && (
                  <span className="nav-arrow">›</span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Settings Section */}
        <div className="sidebar-footer">
          <div className="divider"></div>
        
             {isAdminLoggedIn ? (
            <button className="btn admin-login-btn text-white align-center" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn admin-login-btn">
              Admin Login
            </Link>
          )}
            
           
        </div>
      </nav>

    </div>
  );
};

export default AdminSidebar;