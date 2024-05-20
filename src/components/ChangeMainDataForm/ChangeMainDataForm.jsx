import React, { useState } from 'react'
import Input from '../Input/Input'
import { useSelector, useDispatch } from 'react-redux';
import Button from '../Button/Button';
import './ChangeMainDataForm.css'
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { changeMainData } from '../../store/slices/userSlice'
import { openModal } from '../../store/slices/modalActiveSlice';

function ChangeMainDataForm() {
	const userData = useSelector(state => state.user)
	const dispatch = useDispatch()

	const [newName, setNewName] = useState('')
	const [newSurname, setNewSurname] = useState('')
	const [newHeigth, setNewHeigth] = useState('')
	const [newWeight, setNewWeight] = useState('')

	const [correct, setCorrect] = useState('')

	const changeData = async () => {
		setCorrect('')
		if (userData.role === 'КЛИЕНТ') {
			const docRef = doc(db, "Client", userData.id)
			await updateDoc(docRef, {
				client_name: newName || userData.name,
				client_surname: newSurname || userData.surname,
				client_heigth: newHeigth || userData.heigth,
				client_weight: newWeight || userData.weight,
			})
		} else {
			const docRef = doc(db, "Couch", userData.id);
			await updateDoc(docRef, {
				couch_name: newName || userData.name,
				couch_surname: newSurname || userData.surname,
				couch_heigth: newHeigth || userData.heigth,
				couch_weight: Number(newWeight) || Number(userData.weight),
			})
		}
		dispatch(changeMainData({
			name: newName || userData.name,
			surname: newSurname || userData.surname,
			heigth: newHeigth || userData.heigth,
			weight: newWeight || userData.weight,
		}))
		setNewName('')
		setNewSurname('')
		setNewHeigth('')
		setNewWeight('')
		setCorrect('Данные сохранены')
		dispatch(openModal({name:'changeMainDataModal'}))
	}

	return (
		<div className='change-main-data-form'>
			<Input 
				className='transp-black change-main-data-form__input' 
				placeholder={userData.name}
				type='text'
				value={newName}
				onValueChange={setNewName}
			/>
			<Input 
				className='transp-black change-main-data-form__input' 
				placeholder={userData.surname}
				type='text'
				value={newSurname}
				onValueChange={setNewSurname}
			/>
			<Input 
				className='transp-black change-main-data-form__input' 
				placeholder={userData.heigth}
				type='text'
				value={newHeigth}
				onValueChange={setNewHeigth}
			/>
			<Input 
				className='transp-black change-main-data-form__input' 
				placeholder={userData.weight}
				type='text'
				value={newWeight}
				onValueChange={setNewWeight}
			/>
			{correct ? (<p className='correct'>{correct}</p>) : ('')}
			<Button 
				className='purple' 
				text='Сохранить'
				onClick={()=>changeData()}
			/>
		</div>
	)
}

export default ChangeMainDataForm
