import React, { useState } from 'react'
import Button from '../Button/Button'
import Input from '../Input/Input'
import Logo from '../Logo/Logo'
import { auth } from '../../firebase'
import { signInWithEmailAndPassword } from "firebase/auth"
import { Link, useNavigate } from 'react-router-dom'
import { signInLoadMainData } from '../../services/signInLoadMainData'
import { loadCoop } from '../../services/loadCoop'
import { loadClients } from '../../services/loadClients'
import { loadCouchLogin } from '../../services/loadCouchLogin'
import { useDispatch } from 'react-redux'
import { setUser } from '../../store/slices/userSlice'

import './FormSignIn.css'
import { loadDishes } from '../../services/loadDishes'
import { loadWater } from '../../services/loadWater'
import { loadSport } from '../../services/loadSport'
import { loadMessage } from '../../services/loadMessage'

function FormSignIn() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('')

	let date = new Date()
	const nowDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`

	const dispatch = useDispatch();
	const nav = useNavigate();

	const signIn = async () => {
		setError('')
		if(!email || !password){
			setError('Неправильные логин или пароль');
			return
		}
		const {role, id, name, surname, sex, login, heigth, weight, couchId } = await signInLoadMainData(email)
		const coop = await loadCoop(id, role)
		const dishes = await loadDishes(id)
		const water = await loadWater(id, nowDate)
		const sport = await loadSport(id)
		let message = []
		let clients = []
		let couchLogin = ''
		if (role === 'ТРЕНЕР')
			clients = await loadClients(id)
		else {
			message = await loadMessage(id)
			couchLogin = await loadCouchLogin(couchId)
		}
		dispatch(setUser({
			role: role,
			id: id,
			name: name,
			surname: surname,
			sex: sex,
			login: login,
			email: email,
			heigth: heigth,
			weight: weight,
			couchId: couchId,
			couchLogin: couchLogin,
			coop: coop,
			clients: clients,
			water: water,
			dishes: dishes,
			sport: sport,
			message: message,
		}))
		signInWithEmailAndPassword(auth, email, password)
		.then(() => {
			setEmail('');
			setPassword('');
			setError('');
			nav('/home/');
		})
		.catch(() =>{
			setError('Неправильные логин или пароль');
		})
	}

	return (
		<div className='form-sign-in'>
			<Logo color='purple'/>
			<div className='form-sign-in__inputs'>
				<Input 
					className='transp-white form-sign-in__input' 
					placeholder='E-mail' 
					type='email' 
					value={email} 
					onValueChange={setEmail}
				/>
				<Input 
					className='transp-white form-sign-in__input' 
					placeholder='Пароль' 
					type='password' 
					value={password} 
					onValueChange={setPassword}
				/>
			</div>
			<div className='form-sign-in__buttons'>
				{error ? <p className='error'>{error}</p> : ''}
				<Button 
					className='white form-sign-in__btn' 
					text="Войти" 
					onClick={() => signIn()}
				/>
				<Link className='form-sign-in__link' to='/signUp'>Зарегистироваться</Link>
			</div>
		</div>
	)
}

export default FormSignIn
