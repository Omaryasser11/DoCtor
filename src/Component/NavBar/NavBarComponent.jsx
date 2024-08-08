import React from 'react'
import './NavBarComponent.scss'
import { Link } from 'react-router-dom'
import navBarLogo from '../../assets/logo.png'
function NavBarComponent() {
  return (
    <div className='NavBar'>
      <img className='navBarLogo' src={navBarLogo}>



      </img>
      <ul>
        <li>
        <Link to="/dr">Dr</Link>

        </li>
        <li>PROCEDURES
        </li>
        <li>BEFORE & AFTER</li>
        <li>FAQ
        </li>
        <li>
          VIDEOS</li>
        <li>BLOG</li>
        <li>TESTIMONIALS
        </li>
        <li>CONSULTATION
        </li>
        <li><button>OGEE Recovery</button></li>

      </ul>

    </div>
  )
}

export default NavBarComponent
