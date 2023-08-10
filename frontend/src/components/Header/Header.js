import React from 'react';
import './header.css';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className='headerNav'>
          <div className="topLeft">
            upload your blogs
          </div>

          <div className='navbarBtn'>
            <button className='allBlogs' onClick={() => navigate('/blogs')}>All Blogs</button>
            <button className='userBlogs' onClick={() => navigate('/userBlogs')}>User Blogs</button>
          </div>
          <button className='topbarLogout'>logout</button>
      </div>

      <div className='mainBody'>
            
      </div>
    </div>
  )
}
