import supabase from '../supabase/SupabaseClient.js'

export const session = async (req, res) => {
    const { access_token } = req.body

    try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getUser(access_token)

        const session = sessionData.user
        
        const { data: userDetails, error: userDetailsError } = await supabase
            .from('users')
            .select()
            .eq('auth_id', session.id)
            .single()

        if (userDetailsError) {
            return res.status(401).json({ error: 'User details not found.', success: false })
        }

        const avatar = session?.user_metadata?.avatar_url || null

        return res.status(200).json({
            success: true,
            data: {
                avatar,
                session,
                userDetails
            }
        })

    } catch (error) {
        return res.status(500).json({ error: 'Server error.', success: false })
    }
}