import React from 'react'
import './DishesForm.css'
import { useSelector } from 'react-redux'

function DishesForm({type}) {
  const userData = useSelector(state => state.user)
  let date = new Date()
  const nowDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
  let dish = userData.dishes.filter(item => item.nowDate === nowDate && item.type === String(type).toUpperCase())
	
  return (
    <div className='dishes-form'>
      <div className='dishes-form__header'>
        <div className='dishes-form__main-data'>
          <p className='dishes-form__type'>{type}</p>
          <div className='dishes-form__bgu-modul'>
            <p className='dishes-form__bgu-b'>{`Б: ${Number(dish.reduce((acc, elem) => acc + elem.bDish, 0)).toFixed(0)}гр`}</p>
            <p className='dishes-form__bgu-g'>{`Ж: ${Number(dish.reduce((acc, elem) => acc + elem.gDish, 0)).toFixed(0)}гр`}</p>
            <p className='dishes-form__bgu-u'>{`У: ${Number(dish.reduce((acc, elem) => acc + elem.uDish, 0)).toFixed(0)}гр`}</p>
          </div>
        </div>
        <div className="dishes-form__cal">{Number(dish.reduce((acc, elem) => acc + elem.callDish, 0)).toFixed(0)}</div>
      </div>
      <ul className='dishes-form__list'>
        {dish.map((item) => (
          <li key={item.name} className='dishes-form__item'>
            <div className='dishes-form__item-left'>
              <p className='dishes-form__item-name'>{item.name}</p>
              <div className='dishes-form__bgu-modul'>
                <p>{`Б: ${Number(item.bDish).toFixed(0)}гр`}</p>
                <p>{`Ж: ${Number(item.gDish).toFixed(0)}гр`}</p>
                <p>{`У: ${Number(item.uDish).toFixed(0)}гр`}</p>
              </div>
            </div>
            <p className='dishes-form__call-bold'>{Number(item.callDish).toFixed(0)}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DishesForm
