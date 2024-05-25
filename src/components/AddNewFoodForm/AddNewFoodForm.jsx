import React, { useState } from 'react'
import Input from '../Input/Input'
import Button from '../Button/Button';
import './AddNewFoodForm.css'
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../store/slices/modalActiveSlice';

function AddNewFoodForm() {
  const [newFoodName, setNewFoodName] = useState('');
  const [newFoodCal, setNewFoodCal] = useState('');
  const [newFoodB, setNewFoodB] = useState('');
  const [newFoodG, setNewFoodG] = useState('');
  const [newFoodU, setNewFoodU] = useState('');
  const [error, setError] = useState('');
  const [correct, setCorrect] = useState('');
  const dispatch = useDispatch()

  const saveNewFood = async () => {
    setError('')
    setCorrect('')
    if (!newFoodName && !newFoodCal && !newFoodB && !newFoodG && !newFoodU){
      setError('Не все поля заполнены')
      return;
    }
    await addDoc(collection(db, "Food"), {
      food_name: newFoodName,
      food_cal: Number(newFoodCal),
      food_b: Number(newFoodB),
      food_g: Number(newFoodG),
      food_u: Number(newFoodU),
    }).then(() =>{
			setCorrect('Новое блюдо добавлено')
      setNewFoodName('')
      setNewFoodCal('')
      setNewFoodB('')
      setNewFoodG('')
      setNewFoodU('')
			dispatch(closeModal({name:'addNewDishModal'}))
    })
  }
	
  return (
    <div className='add-new-food-form'>
      <p className='add-new-food-form__title'>Новое блюдо</p>
      <div className="add-new-food-form__inputs">
        <Input 
          className='transp-black add-new-food-form__inp' 
          placeholder='Название' 
          type='text' 
          value={newFoodName}
          onValueChange={setNewFoodName}
        />
        <Input 
          className='transp-black add-new-food-form__inp' 
          placeholder='Калорийность в 100гр: 100' 
          type='text' 
          value={newFoodCal}
          onValueChange={setNewFoodCal}
        />
        <Input 
          className='transp-black add-new-food-form__inp' 
          placeholder='Белков в 100гр: 15' 
          type='text' 
          value={newFoodB}
          onValueChange={setNewFoodB}
        />
        <Input 
          className='transp-black add-new-food-form__inp' 
          placeholder='Жиров в 100гр: 15' 
          type='text' 
          value={newFoodG}
          onValueChange={setNewFoodG}
        />
        <Input 
          className='transp-black add-new-food-form__inp' 
          placeholder='Углеводов в 100гр: 15' 
          type='text' 
          value={newFoodU}
          onValueChange={setNewFoodU}
        />
      </div>
      {error? <p className='error'>{error}</p> : <p className='correct'>{correct}</p>}
      <Button 
        className='purple add-new-food-form__btn' 
        text='Добавить блюдо' 
        onClick={()=>saveNewFood()}
      />
    </div>
  )
}

export default AddNewFoodForm
