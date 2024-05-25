import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteDoc, doc, updateDoc} from 'firebase/firestore'
import { db } from '../../firebase'
import { setCouch, removeCoop, addClient, removeClient } from '../../store/slices/userSlice'
import './ShowFriendForm.css'
import { Link } from 'react-router-dom'

function ShowFriendForm() {
  const userData = useSelector(state => state.user)
  const dispatch = useDispatch()

  const acceptCoop = async (coop) => {
    const docRef = doc(db, "Client", coop.client_id)
    await updateDoc(docRef, {
      client_couchId: coop.couch_id
    })
    if (userData.role === 'КЛИЕНТ'){
      dispatch(setCouch({
        couchId: coop.couch_id,
        couchLogin: coop.couch_login,
      }))
    } else {
      dispatch(addClient({
        client_login: coop.client_login,
        client_id: coop.client_id
      }))
    }
    await deleteDoc(doc(db, "RequestsForCooperation", coop.couch_id +'-'+coop.client_id))
    dispatch(removeCoop({
      request_id: coop.request_id
    }))
  }

  const regectCoop = async (coop) => {
    await deleteDoc(doc(db, "RequestsForCooperation", coop.couch_id+'-'+coop.client_id))
    dispatch(removeCoop({
      request_id: coop.request_id
    }))
  }

  const deleteUser = async (id) => {
    const docRef = doc(db, "Client", id)
    await updateDoc(docRef, {
      client_couchId: ''
    })
    if (userData.role === 'КЛИЕНТ'){
      dispatch(setCouch({
        couchId: '',
        couchLogin: '',
      }))
    } else {
      dispatch(removeClient({
        client_id: id
      }))
    }
  }

  return (
    <div className='show-friend-form'>
      {userData.role === 'КЛИЕНТ' ? (
        userData.couchLogin? (
          <div>
            <h1 className='show-friend-form__title'>Логин тренера</h1>
            <div className="show-friend-form__couch">
              <p className='show-friend-form__couch-login'>{userData.couchLogin}</p>
              <button className='show-friend-form__couch-btn' onClick={() => deleteUser(userData.id)}>
                <img src="/icons/trash.svg" alt="trash" />
              </button>
            </div>
          </div>
        ) : (
          userData.coop.length === 0 ? <h1 className='show-friend-form__no-friend'>У вас пока что нет тренера</h1> : ''
        )
      ) : (
        userData.clients.length > 0 ? (
          <div>
            <h1 className='show-friend-form__title'>Клиенты</h1>
            <ul className='show-friend-form__list-client'>
              {userData.clients.map((item) => (
                <li key={item.client_login} className='show-friend-form__list-item'>
                  {item.client_login}
                  <div className="show-friend-form__btns">
                    <Link className='show-friend-form__client-btn' to={`/aboutYourClient/:${item.client_id}-${item.client_login}`}>
                      <img src="/icons/airplay.svg" alt="" />
                    </Link>
                    <button className='show-friend-form__client-btn' onClick={() => deleteUser(item.client_id)}>
                      <img src="/icons/trash.svg" alt="" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          userData.coop.length === 0 ? <h1 className='show-friend-form__no-friend'>У вас пока что нет клиентов</h1> : ''
        )
      )}
      <ul className='show-friend-form__list-coop'>
        {userData.coop.map((item) => (
          <li key={item.couch_login} className='show-friend-form__list-item'>
            {userData.role === 'КЛИЕНТ' ? item.couch_login : item.client_login}
            <div className='show-friend-form__btn-acc-reg'>
              <button className='show-friend-form__btn-accept' onClick={() => acceptCoop(item)}>
                <img src="/icons/check.svg" alt="" />
              </button>
              <button className='show-friend-form__btn-regect' onClick={() => regectCoop(item)}>
                <img src="/icons/multiply.svg" alt="" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ShowFriendForm
