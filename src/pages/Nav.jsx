import React from 'react'
import logo from '../assets/images/solvistalogo.png'
import profile from '../assets/images/hikaru.jpg'
import '../styles/pages/_nav.scss'
import { Link } from 'react-router-dom'
import { Session } from '../routes/SessionProvider'

const Nav = () => {
  const {
		loading,
		setLoading,
		user,
		setUser,
		userDetails,
		setUserDetails
	} = Session()

  return (
    <nav>
       <Link to="/landing">
           <img src={logo} alt="Sol Vista DocSign" className='logo' />
        </Link>

        <div className="profile">
          <img className="profile-image" src={userDetails?.picture || "solvistalogo.png"} alt="Profile" />
          <p>{user?.email?.split('@')[0]}</p>
        </div>
      </nav>

      
  )
}

export default Nav