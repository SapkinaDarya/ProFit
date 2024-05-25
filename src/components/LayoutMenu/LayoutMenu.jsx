import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Apple from '../icons/Apple'
import Bike from '../icons/Bike'
import Envelope from '../icons/Envelope'
import User from '../icons/User'
import './LayoutMenu.css'

function LayoutMenu() {
  const location = useLocation();
	
  return (
    <div className='layout-menu'>
      <Link className='layout-menu__link' to='/home/message'>
        <Envelope className='layout-menu__icon' color={`${location.pathname === '/home/message' ? '#DF83FF' : 'white'}`} />
      </Link>
      <Link className='layout-menu__link' to='/home/sport'>
        <Bike className='layout-menu__icon' color={`${location.pathname === '/home/sport' ? '#DF83FF' : 'white'}`} />
      </Link>
      <Link className='layout-menu__link' to='/home/food'>
        <Apple className='layout-menu__icon' color={`${location.pathname === '/home/food' ? '#DF83FF' : 'white'}`} />
      </Link>
      <Link className='layout-menu__link' to='/home/'>
        <User className='layout-menu__icon' color={`${location.pathname === '/home/' ? '#DF83FF' : 'white'}`} />
      </Link>
    </div>
  )
}

export default LayoutMenu
