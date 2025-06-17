import React from 'react'
import logo from '../assets/images/solvistalogo.png'
import profile from '../assets/images/hikaru.jpg'
import '../styles/pages/_nav.scss'

const Nav = () => {
  return (
    <nav>
        <img src={logo} alt="Sol Vista DocSign" />

        <div className="profile">
          <img className="profile-image" src={profile} alt="Hikaru" />
          <p>Hikaru</p>
        </div>
      </nav>

      
  )
}

export default Nav