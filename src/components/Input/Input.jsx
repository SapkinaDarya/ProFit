import React from 'react'
import './Input.css'

function Input({ className, placeholder, type, onValueChange }) {
	return (
		<input 
			className={`input input--${className}`} 
			placeholder={placeholder} 
			type={type} 
			onChange={(e) => onValueChange(e.target.value)}
		/>
	)
}

export default Input