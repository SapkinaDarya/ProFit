import React from 'react'
import './MainDataFood.css'
import { useSelector } from 'react-redux'

function MainDataFood() {
  const userData = useSelector(state => state.user)
  const coef1 = userData.sex === 'Ж' ? 655.1 : 66.5
  const coef2 = userData.sex === 'Ж' ? 9.563 : 13.75
  const coef3 = userData.sex === 'Ж' ? 1.85 : 5.003
  const coef4 = userData.sex === 'Ж' ? 4.676 : 6.775
  const normaCal = ((coef1 + coef2*userData.weight + coef3*userData.heigth - coef4*30) * 1.55).toFixed(0);
  let date = new Date()
  const nowDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
  let dish = userData.dishes.filter(item => item.nowDate === nowDate)
  return (
    <div className='main-data-food'>
      <div className='main-data-food__cal-box'>
        <div className='main-data-food__cal-coll'>
          <p className='main-data-food__cal-row'>Норма</p>
          <p>{normaCal}</p>
        </div>
        <div className='main-data-food__cal-coll'>
          <p className='main-data-food__cal-row'>Получено</p>
          <p>{Number(dish.reduce((acc, elem) => acc + elem.callDish, 0)).toFixed(0)}</p>
        </div>
        <div className='main-data-food__cal-coll'>
          <p className='main-data-food__cal-row'>Дефицит</p>
          <p className='main-data-food__cal-row--purple'>{normaCal - Number(dish.reduce((acc, elem) => acc + elem.callDish, 0)).toFixed(0)}</p>
        </div>
      </div>
      <div className="main-data-food__bgu-box">
        <p>Получено:</p>
        <p className='main-data-food__bgu'>{`Б: ${Number(dish.reduce((acc, elem) => acc + elem.bDish, 0)).toFixed(0)}гр`}</p>
        <p className='main-data-food__bgu'>{`Ж: ${Number(dish.reduce((acc, elem) => acc + elem.gDish, 0)).toFixed(0)}гр`}</p>
        <p className='main-data-food__bgu'>{`У: ${Number(dish.reduce((acc, elem) => acc + elem.uDish, 0)).toFixed(0)}гр`}</p>
      </div>
      <div className="main-data-food__water-box">
        <p>Объем воды:</p>
        <p className='main-data-food__water'>{`${(userData.water/1000).toFixed(1)}/2л`}</p>
      </div>
    </div>
  )
}

export default MainDataFood
