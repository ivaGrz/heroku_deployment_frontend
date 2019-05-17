import React from 'react';
import './Input.css';

function Input(props) {
	return (
		<div className="input-box">
			<input
				name={props.name}
				className="input"
				placeholder={props.placeholder}
				onChange={props.handleChange}
			/>
		</div>
	);
}

export default Input;
