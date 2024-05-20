import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './ClientPageForTr.css'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../firebase'

function ClientPageForTr() {
	const {id}=useParams()
	const clientId = id.split('-')[0].split(':')[1]
	const clientLogin = id.split('-')[1]

	const [workout, setWorkout] = useState([])
	const [dishes, setDishes] = useState([])
	const [clientData, setClientData] = useState({
		name: '',
		surname: '',
		heigth: 0,
		weight: 0,
		sex: '',
	})

	const coef1 = clientData.sex === 'Ж' ? 655.1 : 66.5
	const coef2 = clientData.sex === 'Ж' ? 9.563 : 13.75
	const coef3 = clientData.sex === 'Ж' ? 1.85 : 5.003
	const coef4 = clientData.sex === 'Ж' ? 4.676 : 6.775
	const normaCal = ((coef1 + coef2*clientData.weight + coef3*clientData.heigth - coef4*30) * 1.55).toFixed(0);

	const compareDates = (a, b) => {
		const dateA = new Date(`${a.date.split('.')[1]}.${a.date.split('.')[0]}.${a.date.split('.')[2]}`);
		const dateB = new Date(`${b.date.split('.')[1]}.${b.date.split('.')[0]}.${b.date.split('.')[2]}`);
		return dateA - dateB;
	};

	const date = new Date()

	let sevenDaysBefore = []
	sevenDaysBefore.unshift(`${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`)
	for (let i=0; i<6; i++){
		date.setDate(date.getDate()-1)
		sevenDaysBefore.unshift(`${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`)
	}

	useEffect(()=>{
		const getDataAboutClient = async() => {
			const q1 = query(collection(db, "Workout"), where("workout_userId", "==", clientId))
			const docSnap1 = await getDocs(q1)
			let workout = []
			docSnap1.forEach((docum) => {
				let index = sevenDaysBefore.find(item => item === docum.data().workout_date)
				if (index){
					workout.push({
						name: docum.data().workout_name,
						date: docum.data().workout_date,
						done: docum.data().workout_done
					})
				}
			})
			workout.sort(compareDates)
			setWorkout(workout)

			const q2 = query(collection(db, "Dishes"), where("dishes_userId", "==", clientId))
			const docSnap2 = await getDocs(q2)
			let dishes = []
			docSnap2.forEach(async (docum) => {
				let index = sevenDaysBefore.find(item => item === docum.data().dishes_date)
				if (index){
					dishes.push({
						name: docum.data().dishes_name,
						date: docum.data().dishes_date,
						cal: docum.data().dishes_cal,
						b: docum.data().dishes_b,
						g: docum.data().dishes_g,
						u: docum.data().dishes_u,
						type: docum.data().dishes_type,
					})
				}
			})
			dishes.sort(compareDates)
			setDishes(dishes)

			const docRef1 = doc(db, "Client", clientId);
			const docSnap3 = await getDoc(docRef1);
			setClientData({
				name: docSnap3.data().client_name,
				surname: docSnap3.data().client_surname,
				heigth: docSnap3.data().client_heigth,
				weight: docSnap3.data().client_weight,
				sex: docSnap3.data().client_sex,
			})
		}
		getDataAboutClient()
	},[clientId])

	return (
		<div className='client-page-for-tr'>
			<div className="client-page-for-tr__logOut">
				{clientLogin}
				<Link to='/home/' className='client-page-for-tr__link'>
					<img src="/icons/logOut.svg" alt="" className='client-page-for-tr__svg'/>
				</Link>
			</div>
			<div className="client-page-for-tr__dataOfClient">
				<p className='client-page-for-tr__title-food'>Основная информация о клиенте</p>
				<div className="client-page-for-tr__data">
					<p>{ `Имя: ${clientData.name} `}</p>
					<p>{ `Фамилия: ${clientData.surname} `}</p>
					<p>{ `Рост: ${clientData.heigth} `}</p>
					<p>{ `Вес: ${clientData.weight} `}</p>
					<p>{ `Норма калорий: ${normaCal}`}</p>
				</div>
			</div>
			<div className="client-page-for-tr__workouts">
				<p className='client-page-for-tr__title'>Тренировки</p>
				<p className='client-page-for-tr__desc'>Если клиент выполнил тренировку обводка <span className='client-page-for-tr__desc--green'>зеленая</span>, если нет - <span className='client-page-for-tr__desc--red'>красная</span></p>
				<ul>
					{workout.map(item => (
						<li key={item.name} className={`client-page-for-tr__workout client-page-for-tr__workout--${item.done? 'red' : 'green'}`}>
							<p className='client-page-for-tr__workout-date'>{item.date}</p>
							<p className='client-page-for-tr__workout-name'>{item.name}</p>
						</li>
					))}
				</ul>
			</div>
			<div className='client-page-for-tr__dishes'>
				<p className='client-page-for-tr__title-food'>Питание</p>
				{sevenDaysBefore.map(item => (
					<ul key={item} className='client-page-for-tr__list'>
						<p className='client-page-for-tr__dishes-date'>{item}</p>
						<div className="client-page-for-tr__cbgu-modul">
							<p className='client-page-for-tr__bgu'>{`Кал: ${Number(dishes.filter(dish => dish.date === item).reduce((acc, elem) => acc + elem.cal, 0)).toFixed(0)}гр`}</p>
							<p className='client-page-for-tr__bgu'>{`Б: ${Number(dishes.filter(dish => dish.date === item).reduce((acc, elem) => acc + elem.b, 0)).toFixed(0)}гр`}</p>
							<p className='client-page-for-tr__bgu'>{`Ж: ${Number(dishes.filter(dish => dish.date === item).reduce((acc, elem) => acc + elem.g, 0)).toFixed(0)}гр`}</p> 
							<p className='client-page-for-tr__bgu'>{`У: ${Number(dishes.filter(dish => dish.date === item).reduce((acc, elem) => acc + elem.u, 0)).toFixed(0)}гр`}</p>
						</div>
						<p className='client-page-for-tr__dishes-type'>Завтрак</p>
						{dishes.filter(dish => dish.date === item && dish.type === 'ЗАВТРАК').length > 0 ? 
							<div>
								<div className="client-page-for-tr__cbgu-modul">
									<p className='client-page-for-tr__bgu'>{`Кал: ${Number(dishes.filter(dish => dish.date === item && dish.type === 'ЗАВТРАК').reduce((acc, elem) => acc + elem.cal, 0)).toFixed(0)}гр`}</p>
									<p className='client-page-for-tr__bgu'>{`Б: ${Number(dishes.filter(dish => dish.date === item && dish.type === 'ЗАВТРАК').reduce((acc, elem) => acc + elem.b, 0)).toFixed(0)}гр`}</p>
									<p className='client-page-for-tr__bgu'>{`Ж: ${Number(dishes.filter(dish => dish.date === item && dish.type === 'ЗАВТРАК').reduce((acc, elem) => acc + elem.g, 0)).toFixed(0)}гр`}</p> 
									<p className='client-page-for-tr__bgu'>{`У: ${Number(dishes.filter(dish => dish.date === item && dish.type === 'ЗАВТРАК').reduce((acc, elem) => acc + elem.u, 0)).toFixed(0)}гр`}</p>
								</div>
								{dishes.filter(dish => dish.date === item && dish.type === 'ЗАВТРАК').map(dish => (
									<li key={dish.name} className="client-page-for-tr__item">
										{dish.name}
										<div className="client-page-for-tr__cbgu-modul">
											<p className='client-page-for-tr__bgu'>{`Кал: ${Number(dish.cal).toFixed(1)}гр`}</p>
											<p className='client-page-for-tr__bgu'>{`Б: ${Number(dish.cal).toFixed(1)}гр`}</p>
											<p className='client-page-for-tr__bgu'>{`Ж: ${Number(dish.cal).toFixed(1)}гр`}</p>
											<p className='client-page-for-tr__bgu'>{`У: ${Number(dish.cal).toFixed(1)}гр`}</p>
										</div>
									</li>
								))}
							</div>
							:
							<p className='client-page-for-tr__nothing'>Ничего не найдено</p>
						}
						<p className='client-page-for-tr__dishes-type'>Обед</p>
						{dishes.filter(dish => dish.date === item && dish.type === 'ОБЕД').length > 0 ? 
							<div>
								<div className="client-page-for-tr__cbgu-modul">
									<p className='client-page-for-tr__bgu'>{`Кал: ${Number(dishes.filter(dish => dish.date === item && dish.type === 'ЗАВТРАК').reduce((acc, elem) => acc + elem.cal, 0)).toFixed(0)}гр`}</p>
									<p className='client-page-for-tr__bgu'>{`Б: ${Number(dishes.filter(dish => dish.date === item && dish.type === 'ЗАВТРАК').reduce((acc, elem) => acc + elem.b, 0)).toFixed(0)}гр`}</p>
									<p className='client-page-for-tr__bgu'>{`Ж: ${Number(dishes.filter(dish => dish.date === item && dish.type === 'ЗАВТРАК').reduce((acc, elem) => acc + elem.g, 0)).toFixed(0)}гр`}</p> 
									<p className='client-page-for-tr__bgu'>{`У: ${Number(dishes.filter(dish => dish.date === item && dish.type === 'ЗАВТРАК').reduce((acc, elem) => acc + elem.u, 0)).toFixed(0)}гр`}</p>
								</div>
								{dishes.filter(dish => dish.date === item && dish.type === 'ОБЕД').map(dish => (
									<li key={dish.name} className="client-page-for-tr__item">
										{dish.name}
										<div className="client-page-for-tr__cbgu-modul">
											<p className='client-page-for-tr__bgu'>{`Кал: ${Number(dish.cal).toFixed(1)}гр`}</p>
											<p className='client-page-for-tr__bgu'>{`Б: ${Number(dish.cal).toFixed(1)}гр`}</p>
											<p className='client-page-for-tr__bgu'>{`Ж: ${Number(dish.cal).toFixed(1)}гр`}</p>
											<p className='client-page-for-tr__bgu'>{`У: ${Number(dish.cal).toFixed(1)}гр`}</p>
										</div>
									</li>
								))}
							</div>
							:
							<p className='client-page-for-tr__nothing'>Ничего не найдено</p>
						}
						<p className='client-page-for-tr__dishes-type'>Ужин</p>
						{dishes.filter(dish => dish.date === item && dish.type === 'УЖИН').length > 0 ? 
						<div>
							<div className="client-page-for-tr__cbgu-modul">
								<p className='client-page-for-tr__bgu'>{`Кал: ${Number(dishes.filter(dish => dish.date === item && dish.type === 'ЗАВТРАК').reduce((acc, elem) => acc + elem.cal, 0)).toFixed(0)}гр`}</p>
								<p className='client-page-for-tr__bgu'>{`Б: ${Number(dishes.filter(dish => dish.date === item && dish.type === 'ЗАВТРАК').reduce((acc, elem) => acc + elem.b, 0)).toFixed(0)}гр`}</p>
								<p className='client-page-for-tr__bgu'>{`Ж: ${Number(dishes.filter(dish => dish.date === item && dish.type === 'ЗАВТРАК').reduce((acc, elem) => acc + elem.g, 0)).toFixed(0)}гр`}</p> 
								<p className='client-page-for-tr__bgu'>{`У: ${Number(dishes.filter(dish => dish.date === item && dish.type === 'ЗАВТРАК').reduce((acc, elem) => acc + elem.u, 0)).toFixed(0)}гр`}</p>
							</div>
							{dishes.filter(dish => dish.date === item && dish.type === 'УЖИН').map(dish => (
								<li key={dish.name} className="client-page-for-tr__item">
									{dish.name}
									<div className="client-page-for-tr__cbgu-modul">
										<p className='client-page-for-tr__bgu'>{`Кал: ${Number(dish.cal).toFixed(1)}гр`}</p>
										<p className='client-page-for-tr__bgu'>{`Б: ${Number(dish.cal).toFixed(1)}гр`}</p>
										<p className='client-page-for-tr__bgu'>{`Ж: ${Number(dish.cal).toFixed(1)}гр`}</p>
										<p className='client-page-for-tr__bgu'>{`У: ${Number(dish.cal).toFixed(1)}гр`}</p>
									</div>
								</li>
							))}
						</div>
							:
							<p className='client-page-for-tr__nothing'>Ничего не найдено</p>
						}
					</ul>
				))}
			</div>
		</div>
	)
}

export default ClientPageForTr
