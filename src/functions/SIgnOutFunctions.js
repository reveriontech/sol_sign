import React, { useState, useEffect } from 'react'
import supabase from "../supabase/supabaseClient"

function SignOutFunctions() {

    const [isSigningOut, setIsSigningOut] = useState(false)

    const handleSignOut = async () => {
        setIsSigningOut(true)

        try {

            const { data: { session: supabaseSession }, } = await supabase.auth.getSession()

            if (!supabaseSession) {
                if (location.pathname !== "/") {
                    navigate("/")
                }
                return
            } else {
                await supabase.auth.signOut()

                sessionStorage.clear()
                localStorage.clear()

                window.location.reload()
            }

        } catch (error) {
            console.error(error);
        } finally {
            setTimeout(() => setIsSigningOut(false), 180)
        }
    }
    
    return {
        isSigningOut,
        handleSignOut
    }
}

export default SignOutFunctions