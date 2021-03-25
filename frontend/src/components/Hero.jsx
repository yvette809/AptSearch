import React from 'react'

const Hero = ({children}) => {
    return (
        <div className="container-fluid home">
      <div className="intro text-center">
    {children}
      </div>
    </div>
    )
}

export default Hero
