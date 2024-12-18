import React from 'react'

function Layout({children}:{children:React.ReactNode}) {
    // React.ReactNode is a TypeScript type that represents anything that can be rendered by React. This includes:
  return (
    <main className='auth'>{children}</main>
  )
}

export default Layout