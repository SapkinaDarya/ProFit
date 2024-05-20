import React, { useState } from 'react'
import Input from '../Input/Input'
import Button from '../Button/Button'
import './AddWaterForm.css'
import { useDispatch, useSelector } from 'react-redux'
import { addWaterMl } from '../../store/slices/userSlice'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase'
import { closeModal } from '../../store/slices/modalActiveSlice'

function AddWaterForm() {
	const [water, setWater] = useState('')
	const [correct, setCorrect] = useState('')
	const userData = useSelector(state => state.user)
	let date = new Date()
	const nowDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
	const dispatch = useDispatch()

	const addWater = async () => {
		setCorrect('')
		await addDoc(collection(db, "Water"),{
			water_id: userData.id + '-' + nowDate,
			water_ml: water,
			water_date: nowDate,
			water_userId: userData.id,
		})
		dispatch(addWaterMl(water))
		setCorrect('Вода добавлена')
		dispatch(closeModal({name:'addWaterModal'}))
	}

	return (
		<div className='add-water-form'>
			<p className='add-water-form__title'>Добавить воду</p>
			<Input 
				className='transp-black add-water-form__input' 
				placeholder='300мл'
				type='text'
				value={water}
				onValueChange={setWater}
			/>
			{correct ? <p className='correct'>{correct}</p> : ''}
			<Button 
				className='purple' 
				text='Добавить воду'
				onClick={()=>addWater()}
			/>
		</div>
	)
}

export default AddWaterForm
