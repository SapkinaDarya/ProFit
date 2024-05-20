import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import Input from '../Input/Input'
import Button from '../Button/Button'
import ModalWindow from '../ModalWindow/ModalWindow'
import AddNewFoodForm from '../AddNewFoodForm/AddNewFoodForm'
import AddDishForm from '../AddDishForm/AddDishForm'
import './SearchDishesForm.css'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../../store/slices/modalActiveSlice'

function SearchDishesForm() {
	const [foodName, setFoodName] = useState([])
	const [searchTerm, setSearchTerm] = useState('')
	const [filteredFoodName, setFilteredFoodName] = useState([])
	const [dishes, setDishes] = useState('')

	const dispatch = useDispatch()
	const modal = useSelector(state => state.modal)

	useEffect(() => {
		const getOtherFoodName = async () => {
			const querySnapshot = await getDocs(collection(db, "Food"))
			const newFoodNames = [];
			querySnapshot.forEach((doc) => {
				newFoodNames.push(doc.data().food_name)
			})
			setFoodName(newFoodNames)
		}
		getOtherFoodName()
	},[])

	const handleSearch = (value) => {
		const searchTerm = value.toLowerCase();
		if (searchTerm === '') {
			setFilteredFoodName(foodName);
		}
		else {
			setSearchTerm(searchTerm);
			const filteredNames = foodName.filter(item =>
					item.toLowerCase().includes(searchTerm)
			);
			filteredNames.sort(); 
			setFilteredFoodName(filteredNames);
		}
	};

	const chooseDishes = (nameDish) => {
		dispatch(openModal({name:'addDishModal'}))
		setDishes(nameDish)
	}

	return (
		<div className='add-dishes-form'>
			<p className='add-dishes-form__title'>Выбрать блюдо</p>
			<Input 
				className='transp-black add-dishes-form__input' 
				placeholder='Поиск' 
				type='text'
				value={searchTerm}
				onValueChange={handleSearch}
			/>
			<div className='add-dishes-form__search'>
				{filteredFoodName.length === 0?(
					<ul>
						{foodName.map((item) => (
							<li className='add-dishes-form__item' key={item}>
								<button className='add-dishes-form__item-btn' onClick={() => chooseDishes(item)}>
									{item}
								</button>
							</li>
						))}
					</ul>
				):(
					<ul>
						{filteredFoodName.map((item) => (
							<li className='add-dishes-form__item' key={item}>
								<button className='add-dishes-form__item-btn' onClick={() => chooseDishes(item)}>
									{item}
								</button>
							</li>
						))}
					</ul>	
				)}
			</div>
			<Button 
				className='purple' 
				text='Добавить новое блюдо' 
				onClick={() => dispatch(openModal({name:'addNewDishModal'}))}
			/>
			<ModalWindow active={modal.addNewDishModal} name='addNewDishModal'>
				<AddNewFoodForm />
			</ModalWindow>
			<ModalWindow active={modal.addDishModal} name='addDishModal'>
				<AddDishForm dishName={dishes}/>
			</ModalWindow>
		</div>
	)
}

export default SearchDishesForm
