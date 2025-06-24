import React from 'react'
import logo from '../assets/images/solvistalogo.png'
import '../styles/pages/_nav.scss'
import { Link } from 'react-router-dom'

const Nav = () => {


    return (
        <nav>
            <Link to="/landing">
                <img src={logo} alt="Sol Vista DocSign" className='logo' />
            </Link>

        </nav>
    )
}

export default Nav