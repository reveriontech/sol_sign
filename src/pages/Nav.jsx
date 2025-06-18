import React, { useState } from 'react'
import logo from '../assets/images/solvistalogo.png'
import '../styles/pages/_nav.scss'
import { Link } from 'react-router-dom'
import { Session } from '../routes/SessionProvider'
import { IoIosLogOut } from "react-icons/io";
import { HiMenu } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const {
        loading,
        setLoading,
        user,
        setUser,
        userDetails,
        setUserDetails
    } = Session()

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        // Add your logout logic here
        setUser(null);
        setUserDetails(null);
    };

    return (
        <nav>
            <Link to="/landing">
                <img src={logo} alt="Sol Vista DocSign" className='logo' />
            </Link>

            <div className="nav-right">
                <div className="mobile-menu">
                    {isMenuOpen ? (
                        <IoMdClose size={24} onClick={toggleMenu} />
                    ) : (
                        <HiMenu size={24} onClick={toggleMenu} />
                    )}
                </div>

                <div className={`profile ${isMenuOpen ? 'show' : ''}`}>
                    <div className="profile-info">
                        <img 
                            className="profile-image" 
                            src={userDetails?.picture || logo} 
                            alt="Profile" 
                        />
                        <p>{user?.email?.split('@')[0]}</p>
                    </div>
                    <button className="logout-btn" onClick={handleLogout}>
                        <IoIosLogOut size={24}/>
                        <span className="logout-text">Logout</span>
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Nav