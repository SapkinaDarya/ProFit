import React from 'react'
import './WorkoutForm.css'
import { useDispatch, useSelector } from 'react-redux'
import { removeDoneWorkout, setDoneExercise } from '../../store/slices/userSlice'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { closeModal } from '../../store/slices/modalActiveSlice'

function WorkoutForm({workout}) {
	const dispatch = useDispatch()
	const userData = useSelector(state => state.user)

	let sportIndex = userData.sport.findIndex(sport => sport.id === (workout && workout.id));

	const done = async (item, index) => {
		let done = item.done ? false : true
		dispatch(setDoneExercise({
			sportId: workout && workout.id,
			exerciseIndex: index,
			done: done,
		}))
		const docRef1 = doc(db, "Workout", workout.id);
		const docSnapshot = await getDoc(docRef1);
		const data = docSnapshot.data();
		data['workout_exercises'][index].done = done;
		await updateDoc(docRef1, data)

		if(data['workout_exercises'].every(item => item.done === true)){
			data.workout_done = true
			await updateDoc(docRef1, data)
			dispatch(closeModal({name:'showWorkout'}))
			dispatch(removeDoneWorkout({id: workout.id}))
		} else {
			data.workout_done = false
			await updateDoc(docRef1, data)
		}
	}
	return (
		<div className='workout-form'>
			<p className='workout-form__title'>{userData.sport[sportIndex] && userData.sport[sportIndex].name}</p>
			<ul className='workout-form__list'>
				{userData.sport[sportIndex] && userData.sport[sportIndex].exercises.map((item,index) => (
					<li className='workout-form__item' key={index}>
						<div className='workout-form__desc'>
							<p className='workout-form__name'>{item.name}</p>
							<p className='workout-form__decs'>{`Повторения: ${item.repetitions}, Подходы: ${item.sets}`}</p>
						</div>
						<button 
							className={`workout-form__redio workout-form__redio--${item.done}`} 
							onClick={() => done(item, index, item.done)}
						/>
					</li>
				))}
			</ul>
		</div>
	)
}

export default WorkoutForm
