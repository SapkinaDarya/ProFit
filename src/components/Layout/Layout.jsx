import React from 'react'
import LayoutMenu from '../LayoutMenu/LayoutMenu'
import { Outlet } from 'react-router-dom'
import './Layout.css'

function Layout() {
  return (
    <div className='layout'>
      <div className='layout__border'>
        <Outlet className='layout__outlet' />
      </div>
      <LayoutMenu />
    </div>
  )
}

export default Layout
