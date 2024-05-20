import React from 'react'
import { useAuth } from '../../../hooks/use-auth'
import UnLogForm from '../../UnLogForm/UnLogForm';
import MainDataForm from '../../MainDataForm/MainDataForm';
import FindNewClientForm from '../../FindNewClientForm/FindNewClientForm';
import Button from '../../Button/Button';
import ModalWindow from '../../ModalWindow/ModalWindow';
import ChangeMainDataForm from '../../ChangeMainDataForm/ChangeMainDataForm';
import './AccountPage.css'
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../../store/slices/modalActiveSlice';

function AccountPage() {
	const { isAuth } = useAuth()
	const modal = useSelector(state => state.modal)
	const dispatch = useDispatch()

	return isAuth? (
		<div className='account-page'>
			<MainDataForm />
			<FindNewClientForm />
			<Button 
				className='white' 
				text='Изменить'
				onClick={()=>dispatch(openModal({name:'changeMainDataModal'}))}
			/>
			<ModalWindow active={modal.changeMainDataModal} name='changeMainDataModal'>
				<ChangeMainDataForm />
			</ModalWindow>
		</div>
	) : (
		<div className='un-log'>
			<UnLogForm />
		</div>
	)
}

export default AccountPage
