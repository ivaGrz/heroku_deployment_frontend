import React, { useState } from 'react';

import './App.css';
import UploadApp from './Containers/UploadApp';
import CreateDB from './Containers/CreateDB';
import Input from './Components/Input/Input';

function App() {
	const [dbPage, setDbPage] = useState(false);
	const [appName, setAppName] = useState('');
	const [herokuToken, setHerokuToken] = useState('');
	const [configDB, setconfigDB] = useState(null);

	const saveConfigDataHandler = data => {
		setconfigDB(data);
	};

	const handleInputChange = e => {
		const value = e.target.value;
		const placeholder = e.target.placeholder;
		if (placeholder === 'heroku app name') {
			setAppName(value);
		} else if (placeholder === 'heroku token') {
			setHerokuToken(value);
		}
	};

	return (
		<div className="app">
			<h1>
				{dbPage ? 'Create MySQL DB on Heroku' : 'Deploy app to Heroku'}
			</h1>
			<Input
				placeholder="heroku app name"
				handleChange={handleInputChange}
			/>
			<Input
				placeholder="heroku token"
				handleChange={handleInputChange}
			/>
			{!dbPage ? (
				<UploadApp appName={appName} herokuToken={herokuToken} />
			) : (
				<CreateDB
					appName={appName}
					herokuToken={herokuToken}
					DBConfigData={configDB}
					saveConfigData={saveConfigDataHandler}
				/>
			)}

			<button
				className="switch_btn"
				onClick={() => {
					setDbPage(!dbPage);
				}}>
				{dbPage ? 'Back to Deploy App' : 'Create ClearDB first'}
			</button>
		</div>
	);
}

export default App;
