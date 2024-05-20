import React from 'react'
import './MessageClient.css'
import { useSelector } from 'react-redux'

function MessageClient() {
	const userData = useSelector(state => state.user)

	return (
		<div className='message-client'>
			{userData.couchId === '' ? (
				<div className='message-client--no-couch'>
					<p className='message-client--no-couch__title'>У вас пока что нет тренера</p>
				</div>
			) : (
				<div className='message-client--has-couch'>
					<p className='message-client--has-couch__title'>Ваши сообщения</p>
					<ul className='message-client--has-couch__list'>
						{userData.message.map((item) => (
							<li key={item.text} className='message-client--has-couch__item'>
								<p className='message-client--has-couch__date'>{item.date}</p>
								<p className='message-client--has-couch__text'>{item.text}</p>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}

export default MessageClient
