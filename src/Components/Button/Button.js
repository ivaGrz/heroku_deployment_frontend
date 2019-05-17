import React from 'react';
import './Button.css';

function Button(props) {
	return (
		<div className="button-box">
			<button className="button" onClick={props.buttonClicked}>
				{props.text}
			</button>
		</div>
	);
}

export default Button;
