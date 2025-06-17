import React, { useState, useEffect } from 'react'
import supabaseApi from '../supabase/supabaseApi'

function GoogleAuthFunctions() {    

    const [isGoogleSigningIn, setIsGoogleSigningIn] = useState(false)
    
    const handleGoogleSignIn = async () => {
        setIsGoogleSigningIn(true)
        
        try {
            const { data: result } = await supabaseApi.post('/google')
          
            if (result.error) {
                setErrors(prev => ({
                    ...prev,
                    signinForm: result.error || 'Google authentication failed. Please try again.'
                }))
                setIsGoogleSigningIn(false)
                return
            }
          
            window.location.href = result.data?.url || 'defaultRedirectUrl'
          
        } catch (error) {
            setErrors(prev => ({
            ...prev,
            signinForm: (error.response && error.response.data.error) || 'An unexpected error occurred. Please try again later.'
        }))
            setIsGoogleSigningIn(false)
        }
    }

    return {
        isGoogleSigningIn,
        setIsGoogleSigningIn,
        handleGoogleSignIn
    }

}

export default GoogleAuthFunctions