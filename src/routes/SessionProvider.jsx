import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import supabase from '../supabase/supabaseClient'
import supabaseApi from '../supabase/supabaseApi'

const SessionContext = createContext()

export const SessionProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [userDetails, setUserDetails] = useState(null)
    const navigate = useNavigate()
    const location = useLocation()
    
    const homeRoutes = [ '/landing' ]
    
    useEffect(() => {
        let subscription
    
        const CurrentSession = async () => {

            setLoading(true)
            
            try {

                const { data: { session: supabaseSession } } = await supabase.auth.getSession()
    
                if (!supabaseSession) {
                    if (location.pathname !== '/') {
                        navigate('/')
                    }
                    return
                }

                const { data: result } = await supabaseApi.post('/session', {
                    access_token: supabaseSession.access_token
                })
    
                if (!result.success || result.error) {
                    await supabase.auth.signOut()
                    if (location.pathname !== '/') {
                        navigate('/')
                    }
                    return
                }

                setUser(result.data.session)
                setUserDetails(result.data.userDetails)

                const { usertype } = result.data.userDetails

                        if ((usertype === 'User' || usertype === 'Admin')) {
                            if (homeRoutes.includes(location.pathname)) {
                                navigate(homeRoutes)
                            } else {
                                navigate('/landing')
                            }
                        } else {
                            if (location.pathname !== '/') {
                                await signoutII()
                                navigate('/')
                            }
                    }

            } catch (error) {
                if (location.pathname !== '/') {
                    navigate('/')
                }
            } finally {
                setLoading(false)
            }
        }
    
        CurrentSession()
    }, [])

return (
    <SessionContext.Provider value={{ loading, user, userDetails, setUser, setUserDetails, navigate }} >
      {children}
    </SessionContext.Provider>
  
    )
}

export const Session = () => {
    return useContext(SessionContext)
}