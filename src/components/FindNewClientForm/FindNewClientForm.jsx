import React, { useState } from 'react'
import Button from '../Button/Button'
import Input from '../Input/Input'
import { useSelector } from 'react-redux';
import './FindNewClientForm.css'
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '../../firebase';

function FindNewClientForm() {

	const userData = useSelector(state => state.user)

	const [correct, setCorrect] = useState('')
	const [error, setError] = useState('')
	const [login, setLogin] = useState('')

	const addCooperation = async () => {
		setCorrect('')
		setError('')
		const findUserRole = userData.role === 'КЛИЕНТ' ? 'Couch' : 'Client'
		const field = findUserRole.toLowerCase() + '_login'
		const q1 = query(collection(db, findUserRole), where(field, "==", login))
		const docSnap1 = await getDocs(q1)
		if(!docSnap1.empty){
			docSnap1.forEach(async (docum) => {
				const documCoopId = userData.role === 'КЛИЕНТ'? String(docum.id +'-'+userData.id) : String(userData.id+'-'+docum.id)
				const docRef = doc(db, "RequestsForCooperation", String(documCoopId))
				const docSnap = await getDoc(docRef)
				if (docSnap.exists()){
					if ((userData.role === 'КЛИЕНТ' && docSnap.data().client_answ === true) || (userData.role === 'ТРЕНЕР' && docSnap.data().couch_answ === true)){
						setCorrect('Вы уже отправили запрос пользователю')
					} else {
						setCorrect('Пользователь уже отправил вам запрос')
					}
				} else {
					await setDoc(doc(db, "RequestsForCooperation", documCoopId), {
						client_id: userData.role === 'КЛИЕНТ' ? userData.id : docum.id,
						client_login: userData.role === 'КЛИЕНТ' ? userData.login : login,
						couch_id: userData.role === 'ТРЕНЕР' ? userData.id : docum.id,
						couch_login: userData.role === 'ТРЕНЕР' ? userData.login : login,
						client_answ: userData.role === 'КЛИЕНТ' ? true : false,
						couch_answ: userData.role === 'ТРЕНЕР' ? true : false,
						request_id: documCoopId,
					})
					setCorrect('Пользователю отправлен запрос')
				}
			})
		} else {
			setError('Пользователь не найден')
		}
	}

	return (
		<div className='find-new-client-form'>
			{userData.role === 'КЛИЕНТ' ? (
				userData.couchId === '' ? (
					<p className='find-new-client-form__title'>Найти тренера</p>
				) : (
					<p className='find-new-client-form__title'>Поменять тренера</p>
				)
			) : ( 
				<p className='find-new-client-form__title'>Найти клиента</p>
			)}
			<Input 
				className="transp-white find-new-client-form__find-input" 
				placeholder="Логин" 
				type='text' 
				value={login}
				onValueChange={setLogin}
			/>
			{error? 
				<p className='error'>{error}</p> 
			: 
				<p className='correct'>{correct}</p>
			}
			<Button 
				className='purple find-new-client-form__find-btn' 
				text='Найти'
				onClick={() => addCooperation()}
			/>
		</div>
	)
}

export default FindNewClientForm
