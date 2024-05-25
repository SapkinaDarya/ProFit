import React from 'react'
import Button from '../../Button/Button'
import Logo from '../../Logo/Logo'
import { Link } from 'react-router-dom'
import './FirstPage.css'

function FirstPage() {
  return (
    <div className='first-page'>
      <Logo circle='circle' />
      <div className='first-page__buttons'>
        <Link to='/signIn'>
          <Button className='white' text='Войти'/>
        </Link>
        <Link to='/signUp'>
          <Button className='purple'text='Зарегистрироваться'/>
        </Link>
      </div>
    </div>
  )
}

export default FirstPage
