import React from 'react'
import './ModalWindow.css'
import { closeModal } from '../../store/slices/modalActiveSlice'
import { useDispatch } from 'react-redux'

function ModalWindow({active, name, children}) {
  const dispatch = useDispatch()
	
  return (
    <div className={active ? 'modal-window active' : 'modal-window'} onClick={()=>dispatch(closeModal({name: name}))}>
      <div className="modal-window__content" onClick={e=>e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default ModalWindow
