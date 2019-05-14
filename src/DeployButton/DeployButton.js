import React from 'react';
import './DeployButton.css';
// import { FaCloudUploadAlt } from 'react-icons/fa';

function DeployButton(props) {
	return (
		<div className="button-box">
			<button className="button" onClick={props.deployApp}>
				upload
			</button>
		</div>
	);
}

export default DeployButton;
