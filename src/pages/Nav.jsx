import React from 'react'
import logo from '../assets/images/solvistalogo.png'
import profile from '../assets/images/hikaru.jpg'
import '../styles/pages/_nav.scss'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav>
       <Link to="/">
           <img src={logo} alt="Sol Vista DocSign" className='logo' />
        </Link>

        <div className="profile">
          <img className="profile-image" src={profile} alt="Hikaru" />
          <p>Hikaru</p>
        </div>
      </nav>

      
  )
}

export default Nav