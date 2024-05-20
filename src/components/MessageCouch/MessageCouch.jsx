import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { db } from '../../firebase';
import Input from '../Input/Input';
import Button from '../Button/Button';
import './MessageCouch.css'

function MessageCouch() {
	const userData = useSelector(state => state.user)
	let date = new Date();
	const nowDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`;

	const [clientLog, setClientLog] = useState('')
	const [text, setText] = useState('')
	const [error, setError] = useState('')
	const [correct, setComplete] = useState('')

	const sendMess = async() => {
		setError('');
		setComplete('');
		if (!clientLog && !text) {
			setError('Есть незаполненные поля')
			return;
		}

		const q1 = query(collection(db, "Client"), where("client_login", "==", clientLog))
		const docSnap1 = await getDocs(q1);
		if (!docSnap1.empty){
			docSnap1.forEach(async (docum1) => {
				if (docum1.data().client_couchId === userData.id){
					await addDoc(collection(db, "Message"), {
						mes_clientId: docum1.data().client_id,
						mes_couchId: userData.id,
						mes_date: nowDate,
						mes_text: text,
					})
					setComplete('Сообщение отправлено')
				} else {
					setError('Данный клиент не ваш')
				}
			})
		} else {
			setError('Клиент не найден')
		}
		setText('')
		setClientLog('')
	}

	return (
		<div className='message-couch'>
			<p className='message-couch__title'>Написать сообщение для ученика</p>
			<div className="message-couch__inputs">
				<Input 
					className='white message-couch__input-login' 
					placeholder='Логин клиента'
					type="text"
					onValueChange={setClientLog}
					value={clientLog}
				/>
				<textarea 
					className='message-couch__input-text'
					type="text" 
					onChange={(e) => setText(e.target.value)}
					value={text}
					placeholder='Ваше сообщение...'
				/>
			</div>
			<div className="message-couch__button">
				{error? <p className='error'>{error}</p> : <p className='correct'>{correct}</p>}
				<Button 
					className='purple' 
					text='Отправить сообщение'
					onClick={() => sendMess()}
				/>
			</div>
		</div>
	)
}

export default MessageCouch
