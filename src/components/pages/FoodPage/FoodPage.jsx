import React from 'react'
import DateForm from '../../DateForm/DateForm'
import './FoodPage.css'
import { useAuth } from '../../../hooks/use-auth'
import UnLogForm from '../../UnLogForm/UnLogForm'
import MainDataFood from '../../MainDataFood/MainDataFood'
import Button from '../../Button/Button'
import DishesForm from '../../DishesForm/DishesForm'
import ModalWindow from '../../ModalWindow/ModalWindow'
import AddWaterForm from '../../AddWaterForm/AddWaterForm'
import SearchDishesForm from '../../SearchDishesForm/SearchDishesForm'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../../../store/slices/modalActiveSlice'

function FoodPage() {
	const { isAuth } = useAuth()

	const dispatch = useDispatch()
	const modal = useSelector(state => state.modal)

	return isAuth ? (
		<div className='food-page'>
			<DateForm />
			<MainDataFood />
			<div className="food-page__buttons">
				<Button className='white' text='Добавить воду' onClick={() => dispatch(openModal({name: 'addWaterModal'}))}/>
				<Button className='purple' text='Добавить блюдо' onClick={() => dispatch(openModal({name: 'chooseDishModal'}))}/>
			</div>
			<div className="food-page__dishes-forms">
				<DishesForm type='Завтрак'/>
				<DishesForm type='Обед'/>
				<DishesForm type='Ужин'/>
			</div>
			<ModalWindow active={modal.addWaterModal} name='addWaterModal'>
				<AddWaterForm />
			</ModalWindow>
			<ModalWindow active={modal.chooseDishModal} name='chooseDishModal'>
				<SearchDishesForm />
			</ModalWindow>
		</div>
	) : (
		<div className='un-log'>
			<UnLogForm />
		</div>
	)
}

export default FoodPage
