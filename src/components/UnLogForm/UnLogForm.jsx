import React from 'react'
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import './UnLogForm.css'

function UnLogForm() {
	return (
		<div className='un-log-form'>
			<p className='un-log-form__descripton'>
				Вы не вошли в аккаунт 
				<br /> 
				Зарегистрируйтесь или войдите
			</p>
			<Link to='/signIn'>
				<Button className='white un-log-form__btn' text="Войти"></Button>
			</Link>
			<Link to='/signUp'>
				<Button className='purple' text="Зарегистрироваться"></Button>
			</Link>
		</div>
	)
}

export default UnLogForm
