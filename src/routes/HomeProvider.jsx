import React from 'react'
import { Navigate } from 'react-router-dom'
import { Session } from './SessionProvider'
import PageLoader from '../components/PageLoader'

function HomeProvider({ children }) {
    const {
        loading,
        setLoading,
        user,
        setUser,
        userDetails,
        setUserDetails,
        navigate
    } = Session()

    const homeRoutes = [ '/landing' ]

    if (loading) {
        return (
          <PageLoader/>
        )
    }

    if (!loading) {
        if (!userDetails) {
            return children
        }
    
        if (userDetails &&
            (userDetails.usertype === 'User' || userDetails.usertype === 'Admin')) {
            if (homeRoutes.includes(location.pathname)) {
                return children
            } else {
                return <Navigate to="/landing" />
            }
        }
    }

    return children
}

export default HomeProvider