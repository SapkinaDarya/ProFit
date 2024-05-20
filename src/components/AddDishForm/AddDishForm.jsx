import React, { useState } from 'react'
import Input from '../Input/Input'
import './AddDishForm.css'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../Button/Button'
import { addDish } from '../../store/slices/userSlice'
import { closeAll } from '../../store/slices/modalActiveSlice'

function AddDishForm({dishName}) {
	const [gr, setGr] = useState('')
	const [type, setType] = useState('')
	const [error, setError] = useState('')
	const [correct, setCorrect] = useState('')

	const dispatch = useDispatch()
	const userData = useSelector(state => state.user)

	let date = new Date();
	const nowDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`

	const addDishes = async () => {
		setError('')
		setCorrect('')
		if (!gr && !type){
			setError('Не все поля заполнены')
			return;
		}
		if (String(type).toUpperCase()!== 'ЗАВТРАК' && String(type).toUpperCase()!== 'ОБЕД' && String(type).toUpperCase()!== 'УЖИН'){
			setError('Не правильный период: Завтрак/Обед/Ужин')
			return;
		}
		let callDish, bDish, gDish, uDish
		const q1 = query(collection(db, "Food"), where("food_name", "==", dishName))
		const docSnap1 = await getDocs(q1)
		docSnap1.forEach(async (docum) => {
			callDish = docum.data().food_cal
			bDish = docum.data().food_b
			gDish = docum.data().food_g
			uDish = docum.data().food_u
		})
		callDish = gr*callDish/100;
		bDish = gr*bDish/100;
		gDish = gr*gDish/100;
		uDish = gr*uDish/100;
		await addDoc(collection(db, "Dishes"), {
			dishes_name: dishName,
			dishes_cal: Number(callDish),
			dishes_b: Number(bDish),
			dishes_g: Number(gDish),
			dishes_u: Number(uDish),
			dishes_date: nowDate,
			dishes_userId: String(userData.id),
			dishes_type: String(type).toUpperCase()
		})
		dispatch(addDish({
			name: dishName,
			callDish: Number(callDish),
			bDish: Number(bDish),
			gDish: Number(gDish),
			uDish: Number(uDish),
			nowDate: nowDate,
			type: String(type).toUpperCase()
		}))
		setCorrect('Блюдо добавлено')
		dispatch(closeAll())
	}

	return (
		<div className='add-dish-form'>
			<p className='add-dish-form__title'>{dishName}</p>
			<div className="add-dish-form__inputs">
				<Input 
					className='transp-black add-dish-form__inp' 
					placeholder='100гр' 
					type='text'
					value={gr}
					onValueChange={setGr}
				/>
				<Input 
					className='transp-black add-dish-form__inp' 
					placeholder='Завтрак/Обед/Ужин' 
					type='text'
					value={type}
					onValueChange={setType}
				/>
			</div>
			<div className="add-dish-form__button">
				{error ? <p className='error'>{error}</p> : <p className='correct'>{correct}</p>}
				<Button 
					className='purple' 
					text='Добавить блюдо' 
					onClick={() => addDishes()}
				/>
			</div>
		</div>
	)
}

export default AddDishForm
