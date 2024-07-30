import React from 'react'
import { Link } from 'react-router-dom'
import '../Styles/Navbar.css'

const Navbar = () => {
    return (
        <div className='navContainer'>
            <div className='navImg'>
                <img src="/img/fnlogo.png" alt="Logo" className='img' />
                <img src="/img/auto.png" alt="Auto" className='imgAuto' />
            </div>
            <div className='navLinks'>
                <Link to='/' className='active'>Pantalla</Link>
                <Link to='/Adminsitrador' className='active'>Administrador</Link>
            </div>
        </div>
    )
}

export default Navbar