import React, { useState,useContext } from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets.js'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext.jsx'
const Navbar = ({setShowLogin}) => {
  const [menu, setMenu]= useState('home')
  const {getTotalCartAmount,token, setToken}= useContext(StoreContext)
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate()
  const logout =()=>{
    localStorage.removeItem('token')
    setToken("")
    navigate('/')
  }
  
  return (
    <div className='navbar'>
    <Link to='/'>

      <img src={assets.logo} alt="" className='logo'/>
    </Link>
      <ul className='navbar-menu'>
          <Link to='/' className={menu==="home"?"active":""} onClick={()=>setMenu('home')}>HOME</Link>
          <a href='#explore-menu' className={menu==="menu"?"active":""} onClick={()=>setMenu('menu')}>MENU</a>
          <a href='#app-download' className={menu==="mobile-app"?"active":""} onClick={()=>setMenu('mobile-app')}>MOBILE APP</a>
          <a href='#footer' className={menu==="contact-us"?"active":""} onClick={()=>setMenu('contact-us')}>CONTACT US</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <Link to='/cart'>

        <div className="navbar-search-icon">
          <img src={assets.basket_icon} alt="" />
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        </Link>

        {
          !token ? <button onClick={()=>setShowLogin(true)}>SignIn</button> 
          :
          <div
        className="navbar-profile"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ position: 'relative', display: 'inline-block', cursor: 'pointer' }}
      >
        <img
          src={assets.profile_icon}
          alt="Profile"
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
          }}
        />

        {/* Dropdown menu */}
        {isHovered && (
          <ul
            style={{
              display: 'block',
              position: 'absolute',
              top: '100%',
              left: '0',
              border: '1px solid tomato',
              backgroundColor: 'white',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
              width: '150px',
              padding: '10px',
              borderRadius: '8px',
              zIndex: 10,
            }}
          >
            <li
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              onClick={()=>navigate('/myorders')}
            >
              <img
                src={assets.bag_icon}
                alt="Orders"
                style={{ width: '20px', height: '20px', marginRight: '8px' }}
              />
              <p>Orders</p>
            </li>
            <li onClick={logout}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <img
                src={assets.logout_icon}
                alt="Logout"
                style={{ width: '20px', height: '20px', marginRight: '8px' }}
              />
              <p>LogOut</p>
            </li>
          </ul>
        )}
      </div>
        }
        
      </div>
    </div>
  )
}

export default Navbar
