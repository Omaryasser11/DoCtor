import React from 'react'
import './NavBarComponent.scss'
import { Link } from 'react-router-dom'
import navBarLogo from '../../assets/لوجو_دينا_المعدل_1-removebg-preview.png'
function NavBarComponent() {
  return (
    <div className='NavBar'>
      <Link to="/">
        <img className='navBarLogo' src={navBarLogo}>



        </img>
      </Link>
      <ul>
        <li>
          <Link className='Linko hover-1' to="/dr">Dr DINA</Link>

        </li>
        <Link to="Procedures" className='Linko hover-1' >

          <li>PROCEDURES
          </li>
        </Link>

        <Link to="Before" className='Linko hover-1' >
          <li>BEFORE & AFTER</li>
        </Link>



        <Link className='Linko hover-1'>
          <li >FAQ
          </li>
        </Link>
        <Link  to='Videosb' className='Linko hover-1'>
          <li >VIDEOS
          </li>
        </Link>
        <Link to='Blog' className='Linko hover-1'>
          <li >BLOG
          </li>
        </Link>

        <Link to='Testimonials' className='Linko hover-1'>
          <li >TESTIMONIALS
          </li>
        </Link>
        <Link className='Linko hover-1'>
          <li >CONSULTATION
          </li>
        </Link>

        <li><button>Login</button></li>

      </ul>

    </div>
  )
}

export default NavBarComponent
