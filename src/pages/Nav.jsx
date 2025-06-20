import React, { useState } from 'react'
import logo from '../assets/images/solvistalogo.png'
import profile from '../assets/images/solvistaicon.png'
import '../styles/pages/_nav.scss'
import { Link } from 'react-router-dom'
import { Session } from '../routes/SessionProvider'
import { IoIosLogOut } from "react-icons/io";
import { HiMenu } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import SignOutFunctions from '../functions/SIgnOutFunctions'

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

    const {
        isSigningOut,
        handleSignOut
    } = SignOutFunctions()

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
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
                            src={user?.session?.user_metadata?.avatar_url || userDetails?.picture || profile} 
                            alt="Profile" 
                            referrerPolicy="no-referrer"
                            crossOrigin="anonymous"
                        />
                        <p>{userDetails?.username?.split('@')[0]}</p>
                    </div>
                    <button className="logout-btn" onClick={handleSignOut}>
                        <IoIosLogOut size={24}/>
                        <span className="logout-text">{isSigningOut ? "Signing Out" : "Sign Out"}</span>
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Nav