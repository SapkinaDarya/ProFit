import React from 'react'
import { useAuth } from '../../../hooks/use-auth'
import { useSelector } from 'react-redux'
import MessageCouch from '../../MessageCouch/MessageCouch'
import UnLogForm from '../../UnLogForm/UnLogForm'
import './MessagePage.css'
import MessageClient from '../../MessageClient/MessageClient'

function MessagePage() {
  const { isAuth } = useAuth()
  const userData = useSelector(state => state.user)
  return isAuth? (
    <div className='message-page'>
      {userData.role === 'КЛИЕНТ' ?
        <MessageClient />
      : (
        <MessageCouch />
      )}
    </div>
  ) : (
    <div className='un-log'>
      <UnLogForm />
    </div>
  )
}

export default MessagePage
