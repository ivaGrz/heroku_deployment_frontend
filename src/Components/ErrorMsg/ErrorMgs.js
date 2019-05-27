import React from 'react';
import './ErrorMsg.css';

function ErrorMgs(props) {
	return <div className="error-msg">{props.msg}</div>;
}

export default ErrorMgs;
