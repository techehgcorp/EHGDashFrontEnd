import React from 'react'

export default function AuthLayout({children}) {
  return (
    <div>
        <nav className='bg-red-500 text-white'>
            This is the Navbar without the url path prefix
        </nav>
        {children}
    </div>
  )
}
