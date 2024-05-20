import React from 'react'
import './Button.css'

function Button({className, text, onClick}) {
	return (
		<button 
			className={`button button--${className}`}
			onClick={onClick}
		> 
			{text} 
		</button>
	)
}

export default Button