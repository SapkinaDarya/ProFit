import React, { useState } from 'react'
import Input from '../Input/Input'
import Button from '../Button/Button'
import './CreateExercise.css'
import { useDispatch } from 'react-redux'
import { addEx } from '../../store/slices/exSlice'
import { closeModal } from '../../store/slices/modalActiveSlice'

function CreateExercise() {
  const [name, setName] = useState('')
  const [repetitions, setRepetitions] = useState('')
  const [sets, setSets] = useState('')
  const [error, setError] = useState('')
  const [correct, setCorrect] = useState('')
  const dispatch = useDispatch()
  const createEx = () => {
    setError('')
    setCorrect('')
    if(!name || !repetitions || !sets){
      setError('Не все поля заполнены')
      return 
    }
    dispatch(addEx({
      name: name,
      repetitions: repetitions,
      sets: sets,
      done: false,
    }))
    setCorrect('Упражнение создано')
    dispatch(closeModal({name:'createExercise'}))
  }
  return (
    <div className='create-exercise'>
      <p className='create-exercise__title'>Добавить упражнение</p>
      <div className="create-exercise__inputs">
        <Input 
          className='transp-black sports-page__modal-new-workout-inp' 
          placeholder='Название упражнения' 
          value={name}
          onValueChange={setName}
        />
        <Input 
          className='transp-black sports-page__modal-new-workout-inp' 
          placeholder='Количество повторений'
          value={repetitions}
          onValueChange={setRepetitions}
        />
        <Input 
          className='transp-black sports-page__modal-new-workout-inp' 
          placeholder='Количество подходов' 
          value={sets}
          onValueChange={setSets}
        />
      </div>
      <div className="sports-page__button">
        {error ? <p className='error'>{error}</p> : <p className='correct'>{correct}</p>}
        <Button 
          className='purple' 
          text='Добавить упржнение'
          onClick={() => createEx()} 
        />
      </div>
    </div>
  )
}

export default CreateExercise
