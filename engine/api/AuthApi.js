import supabase from '../supabase/SupabaseClient.js'

export const google = async (req, res) => {
    try {
        const { data: authData, error: authError } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        })

        if (authError) {
            return res.status(400).json({
            error: 'Google authentication failed. Please try again.'
            })
        }

        return res.status(200).json({
        message: 'Google authentication initiated',
        data: authData
        })
    } catch (error) {
        return res.status(500).json({
        error: 'An unexpected error occurred. Please try again later.'
        })
    }
}