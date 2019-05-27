import React, { useState } from 'react';

import './App.css';
import UploadApp from './Containers/UploadApp';
import CreateDB from './Containers/CreateDB';
import Input from './Components/Input/Input';
import ErrorMsg from './Components/ErrorMsg/ErrorMgs';

function App() {
	const [dbPage, setDbPage] = useState(false);
	const [appName, setAppName] = useState('');
	const [herokuToken, setHerokuToken] = useState('');
	const [configDB, setconfigDB] = useState(null);
	const [errMsg, setErrMsg] = useState('');

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

	const errorMsgHandler = msg => {
		setErrMsg(msg);
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
				<UploadApp
					appName={appName}
					herokuToken={herokuToken}
					errMsg={errorMsgHandler}
				/>
			) : (
				<CreateDB
					appName={appName}
					herokuToken={herokuToken}
					DBConfigData={configDB}
					saveConfigData={saveConfigDataHandler}
					errMsg={errorMsgHandler}
				/>
			)}
			{errMsg ? <ErrorMsg msg={errMsg} /> : null}

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
