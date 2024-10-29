import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets.js'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
    <div className='footer-content'>
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta autem voluptatibus nesciunt quaerat similique quisquam labore doloribus quidem iusto impedit.</p>
            <div className='footer-social-icon'>
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>HOME</li>
                <li>ABOUT US</li>
                <li>DELIVERY</li>
                <li>PRIVACY POLICY</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+1-212-456-7890</li>
                <li>contact@tomato.com</li>
            </ul>
        </div>
    </div>
      <hr />
      <p className='footer-copyright'>
        Copyright 2024 @ Tomato.com - All Right Reserverd.
      </p>
    </div>
  )
}

export default Footer
