import React from 'react'
import './DateForm.css'

function DataForm() {
	const days = ["Воскр", "Понед", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]
	let date = new Date()
	const nowDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`

	return (
		<div className='data-form'>
			<p>Сегодня</p>
			<p className='data-form__date'>{nowDate}</p>
			<p>{`${days[date.getDay()]}`}</p>
		</div>
	)
}

export default DataForm
