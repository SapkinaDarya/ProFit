import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'
import { signUpValidation } from '../../services/signUpValidation'
import { signUpSaveMainData } from '../../services/signUpSaveMainData'
import { useDispatch } from 'react-redux'
import { setUser } from '../../store/slices/userSlice'
import Logo from '../Logo/Logo'
import Input from '../Input/Input'
import Button from '../Button/Button'
import './FormSignUp.css'

function FormSignUp() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('')
  const [sex, setSex] = useState('')
  const [heigth, setHeigth] = useState('')
  const [weight, setWeight] = useState('')
  const [clientTrainer, setClientTrainer] = useState('')
  const [login, setLogin] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const signUp = async () => {
    setError('')
    const resulValid = await signUpValidation(String(email), String(pass), String(name), String(surname), String(sex), Number(heigth), Number(weight), String(clientTrainer), String(login))
    if (resulValid){
      setError(resulValid)
      return
    }
    createUserWithEmailAndPassword(auth, email, pass)
    .then((user) => {
      dispatch(setUser({
        role: String(clientTrainer).toUpperCase(),
        id: String(user.user.uid),
        name: String(name),
        surname: String(surname),
        sex: String(sex),
        login: String(login),
        email: String(email),
        heigth: Number(heigth),
        weight: Number(weight),
        couchId: '',
        couchLogin: '',
        coop: [],
        clients: [],
        water: 0,
        dishes: [],
        sport: [],
        message: [],
      }))
      signUpSaveMainData(String(email), String(name), String(surname), String(sex), Number(heigth), Number(weight), String(clientTrainer), String(login), String(user.user.uid))
      setName('')
      setSurname('')
      setSex('')
      setHeigth('')
      setWeight('')
      setClientTrainer('')
      setLogin('')
      setEmail('')
      setPass('')
      setError('')
      navigate('/home/')
    })
    .catch((error) =>{
      String(error.code) === 'auth/invalid-email' ? setError('Некорректный Email') :
        String(error.code) === 'auth/email-already-in-use' ? setError('Email уже используется') 
      : setError('');
    })
  }
	
  return (
    <div className='form-sign-up'>
      <Logo color='purple' />
      <div className="form-sign-up__inputs">
        <Input 
          className='transp-white'
          placeholder='Имя'
          type='text'
          value={name}
          onValueChange={setName}
        />
        <Input 
          className='transp-white'
          placeholder='Фамилия'
          type='text'
          value={surname}
          onValueChange={setSurname}
        />
        <Input 
          className='transp-white'
          placeholder='Пол: М/Ж'
          type='text'
          value={sex}
          onValueChange={setSex}
        />
        <Input 
          className='transp-white'
          placeholder='Рост (в см)'
          type='text'
          value={heigth}
          onValueChange={setHeigth}
        />
        <Input 
          className='transp-white'
          placeholder='Вес (в кг)'
          type='text'
          value={weight}
          onValueChange={setWeight}
        />
        <Input 
          className='transp-white'
          placeholder='Клиент/Тренер'
          type='text'
          value={clientTrainer}
          onValueChange={setClientTrainer}
        />
        <Input 
          className='transp-white'
          placeholder='Логин'
          type='text'
          value={login}
          onValueChange={setLogin}
        />
        <Input 
          className='transp-white'
          placeholder='Email'
          type='text'
          value={email}
          onValueChange={setEmail}
        />
        <Input 
          className='transp-white'
          placeholder='Пароль'
          type='password'
          value={pass}
          onValueChange={setPass}
        />
      </div>
      <div className="form-sign-up__buttons">
        {error ? <p className='error'>{error}</p> : ''}
        <Button 
          className='purple'
          text='Зарегистироваться'
          onClick={()=>signUp()}
        />
        <Link className='form-sign-up__link' to='/signIn'>Войти</Link>
      </div>
    </div>
  )
}

export default FormSignUp
