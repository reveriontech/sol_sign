import React from 'react'
// import { GoogleAuthFunctions } from '../utils/GoogleAuthFunctions'
import '../styles/pages/_intro.scss'

// Reusable Components
import Button from '../reusable/Button'
import logo from '../assets/images/solvistalogo.png'

const Intro = () => {
  // const {
  //       isGoogleSigningIn,
  //       handleGoogleSignIn
  //   } = GoogleAuthFunctions()

  return (
    <section className='intro-container'>
        <nav>
          <img src={logo} alt="Sol Vista DocSign" />
        </nav>
        <div className='landing'>
          <div className='landing-title'>
              Sol Vista DocSign
              </div>
              <Button variant='outline' 
                  size='small'
                  onClick={() => {}}
              >
                Authenticate
                  {/* {isGoogleSigningIn ? ('Authenticating') : ('Authenticate')} */}
              </Button>
          </div>
       
    </section>
  )
}

export default Intro