import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800  '>
      <div className="flex justify-between items-center px-4 h-14 py-5 mycontainer text-white">
        <div className="logo font-bold text-white text-2xl">
          <span className="text-green-700">&lt;</span>Pass op
          <span className="text-green-700">&gt;</span></div>
        <ul><li className='flex gap-4'>
            <a className='hover:font-bold' href="#"> Home</a>
            <a className='hover:font-bold' href="#"> About</a>
            
            <a className='hover:font-bold' href="#"> Contact</a>
            </li></ul></div>
    </nav>
  )
}

export default Navbar
