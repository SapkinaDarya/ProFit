import React, { useState } from 'react'
import { useAuth } from '../../../hooks/use-auth'
import UnLogForm from '../../UnLogForm/UnLogForm'
import { useDispatch, useSelector } from 'react-redux'
import './SportPage.css'
import Button from '../../Button/Button'
import ModalWindow from '../../ModalWindow/ModalWindow'
import CreateWorkoutForm from '../../CreateWorkoutForm/CreateWorkoutForm'
import WorkoutForm from '../../WorkoutForm/WorkoutForm'
import { openModal } from '../../../store/slices/modalActiveSlice'

function SportPage() {
	const { isAuth } = useAuth()
	const userData = useSelector(state => state.user)
	const modal = useSelector(state => state.modal)
	const dispatch = useDispatch()

	const [workout, setWorkout] = useState(null);

	const work = (item) => {
		setWorkout(item)
		dispatch(openModal({name: 'showWorkout'}))
	}

	return isAuth ? (
		<div className='sport-page'>
			<p className='sport-page__title'>Список тренировок</p>
			{userData.sport.length > 0 ? (
				<div className='sport-page__list'>
					<ul>
					{userData.sport.map((item) => (
						<li key={item.name} className='sport-page__item'>
							<button className='sport-page__btn' onClick={() => work(item)}>
								<p className='sport-page__btn-date'>{item.date}</p>
								<p className='sport-page__btn-name'>{item.name}</p>
							</button>
						</li>
					))}
					</ul>
				</div>
			) : (
				<div className='sport-page__no-work'>
					<p className='sport-page__no-work-title'>Пока что у вас нет тренировок</p>
				</div>
			)}
			<Button 
				className='purple' 
				text='Создать тренировку'
				onClick={() => dispatch(openModal({name: 'createWorkoutModal'}))}
			/>

			<ModalWindow active={modal.createWorkoutModal} name='createWorkoutModal'>
				<CreateWorkoutForm />
			</ModalWindow>
			<ModalWindow active={modal.showWorkout} name='showWorkout'>
				<WorkoutForm workout={workout}/>
			</ModalWindow>
		</div>
	) : (
		<div className='un-log'>
			<UnLogForm />
		</div>
	)
}

export default SportPage
