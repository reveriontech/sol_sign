import React from 'react'
import { Outlet } from 'react-router-dom'

// Pages
import Nav from './Nav'

const Home = () => {
  return (
    <>
        <Nav />
        <div className='home-container'>
            <Outlet />
        </div>
    </>
  )
}

export default Home