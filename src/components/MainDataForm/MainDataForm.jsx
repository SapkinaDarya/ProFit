import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { removeUser } from '../../store/slices/userSlice'
import Button from '../Button/Button';
import ModalWindow from '../ModalWindow/ModalWindow'
import ShowFriendForm from '../ShowFriendForm/ShowFriendForm'
import './MainDataForm.css'
import { openModal } from '../../store/slices/modalActiveSlice';

function MainDataForm() {
  const userData = useSelector(state => state.user)
  const modal = useSelector(state => state.modal)
  const dispatch = useDispatch()
	
  return (
    <div className='main-data-form'>
      <div className="main-data-form__header">
        <p className='main-data-form__login'>{userData.login}</p>
        <button className='main-data-form__btn-log-out' onClick={()=>dispatch(removeUser())}>
          <img src="/icons/logOut.svg" alt="" />
        </button>
      </div>
      <div className="main-data-form__main">
        <p className='main-data-form__field'>
          <span className='main-data-form__label'>Имя:</span>
          {userData.name}
        </p>
        <p className='main-data-form__field'>
          <span className='main-data-form__label'>Фамилия:</span>
          {userData.surname}
        </p>
        <p className='main-data-form__field'>
          <span className='main-data-form__label'>Рост:</span>
          {userData.heigth}
        </p>
        <p className='main-data-form__field'>
          <span className='main-data-form__label'>Вес:</span>
          {userData.weight}
        </p>
        <p className='main-data-form__field'>
          <span className='main-data-form__label'>Email:</span>
          {userData.email}
        </p>
      </div>
      <Button 
        className='transp main-data-form__btn-change' 
        text={userData.role === 'КЛИЕНТ'? (<p>Логин тренера</p>) : (<p>Список клиентов</p>) } 
        onClick={()=>dispatch(openModal({name:'showFriendModal'}))}
      />
      <ModalWindow active={modal.showFriendModal} name='showFriendModal'>
        <ShowFriendForm />
      </ModalWindow>
    </div>
  )
}

export default MainDataForm
