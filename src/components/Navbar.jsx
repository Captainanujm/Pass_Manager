import React from 'react'

const Navbar = () => {
  return (

      <nav className='bg-purple-200 flex justify-between px-12 h-12 w-screen items-center' >
        <div className='logo font-bold'>PassManage</div>
        <ul className='list-none flex gap-10'>
            <li className="hover:font-bold"><a href="#">Home</a></li>
            <li className="hover:font-bold"><a href="#about">About</a></li>
            <li className="hover:font-bold"><a href="#contact">Contact</a></li>
        </ul>
      </nav>
  )
}

export default Navbar
