import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../Input/Input'
import './CreateWorkoutForm.css'
import ModalWindow from '../ModalWindow/ModalWindow'
import CreateExercise from '../CreateExercise/CreateExercise'
import Button from '../Button/Button'
import { getDocs, query, where } from 'firebase/firestore'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase'
import { removeEx, removeExs } from '../../store/slices/exSlice'
import { addSport } from '../../store/slices/userSlice'
import { closeModal, openModal } from '../../store/slices/modalActiveSlice'

function CreateWorkoutForm() {
  const userData = useSelector(state => state.user)
  const exercises = useSelector(state => state.exercise)
  const modal = useSelector(state => state.modal)
  const [error, setError] = useState('')
  const [correct, setCorrect] = useState('')
  const dispatch = useDispatch()
  let date = new Date()
  const nowDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
  const [trLogin, setTrLogin] = useState('Я')
  const [nameWorkout, setNameWorkout] = useState('')
  const [dateWorkout, setDateWorkout] = useState('')

  const createWorkout = async () => {
    if (!nameWorkout && !dateWorkout && !trLogin){
      setError('Не все поля заполнены')
      return;
    }
    let id = userData.id;
    if (trLogin !== 'Я') {
      const q1 = query(collection(db, "Client"), where("client_login", "==", trLogin))
      const docSnap1 = await getDocs(q1);
      docSnap1.forEach(async (docum) => {
        id = docum.data().client_id;
      })
      if (id === userData.id) {
        setError('Такого польщователя не существует')
        return
      }
    }
    const docRef = await addDoc(collection(db, "Workout"), {
      workout_date: dateWorkout,
      workout_done: false,
      workout_name: nameWorkout,
      workout_userId: id,
      workout_exercises: exercises.exercise
    })
    dispatch(addSport({
      id: docRef.id,
      name: nameWorkout,
      date: dateWorkout,
      exercises: exercises.exercise,
      done: false,
    }))
    dispatch(removeExs())
    setCorrect('Тренировка создана')
    dispatch(closeModal({name:'createWorkoutModal'}))
  }

  const deleteEx = (item) => {
    dispatch(removeEx({
      name: item.name,
      repetitions: item.repetitions,
      sets: item.sets,
    }))
  }
	
  return (
    <div className='create-workout-form'>
      <p className='create-workout-form__title'>Создать тренировку</p>
      <div className="create-workout-form__inputs">
        {userData.role === 'ТРЕНЕР'? (
          <Input 
            className='transp-black create-workout-form__inp' 
            placeholder='Я/Логин клиента'
            value={trLogin}
            onValueChange={setTrLogin}
          />
        ) : (
          ''
        )}
        <Input 
          className='transp-black create-workout-form__inp' 
          placeholder='Название тренировки' 
          value={nameWorkout}
          onValueChange={setNameWorkout}
        />
        <Input 
          className='transp-black create-workout-form__inp' 
          placeholder={nowDate} 
          value={dateWorkout}
          onValueChange={setDateWorkout}
        />
      </div>
      <div className='create-workout-form__exe'>
        <ul className='create-workout-form__list'>
          {exercises.exercise.map((item)=>(
            <li className='create-workout-form__item' key={item.name}>
              <div>
                <p className='create-workout-form__name'>{item.name}</p>
                <p className='create-workout-form__desc'>{`Повторения: ${item.repetitions}, Подходы: ${item.sets}`}</p>
              </div>
              <button className='create-workout-form__del' onClick={() => deleteEx(item)}><img src="/icons/trash.svg" alt="" /></button>
            </li>
          ))}
        </ul>
        <hr className='create-workout-form__hr'/>
        <button onClick={() => dispatch(openModal({name:'createExercise'}))} className='create-workout-form__btn'>+</button>
      </div>
      <div className="create-workout-form__button">
        {error? <p className='error'>{error}</p> : <p className='correct'>{correct}</p>}
        <Button className='purple' text='Создать тренировку' onClick={() => createWorkout()}/>
      </div>
      <ModalWindow active={modal.createExercise} name='createExercise'>
        <CreateExercise />
      </ModalWindow>
    </div>
  )
}

export default CreateWorkoutForm
