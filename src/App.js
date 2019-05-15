import React, { useState } from 'react';
import './App.css';
import Dropzone from './Dropzone/Dropzone';
import Input from './Input/Input';
import DeployButton from './DeployButton/DeployButton';
import axios from 'axios';

function App() {
	const [appName, setAppName] = useState('');
	const [herokuToken, setHerokuToken] = useState('');
	const [file, setFile] = useState(null);
	const [text, setText] = useState(
		'Drop .zip file off your app, or click to upload!'
	);
	const [appUrl, setAppUrl] = useState('');

	const handleInputChange = e => {
		const value = e.target.value;
		const placeholder = e.target.placeholder;
		if (placeholder === 'heroku app name') {
			setAppName(value);
		} else if (placeholder === 'heroku token') {
			setHerokuToken(value);
		}
	};

	const changeText = text => {
		setText(text);
	};

	const chooseFileHandler = file => {
		setFile(file);
		// console.log(file);
		changeText(file[0].name);
	};

	const deployAppHandler = async () => {
		const data = new FormData();
		data.append('file', file[0]);

		setFile(null);
		changeText('Uploading');

		try {
			const res = await axios.post(
				`http://localhost:3000/deployApp?app=${appName}&token=${herokuToken}`,
				data
			);
			console.log(res);
			setAppUrl(res.data);
			changeText(
				'Drop .zip file off your app, or click to upload!',
				res.data
			);
		} catch (err) {
			console.log(err);
			const errData = err.response.data.body;
			if (errData) {
				console.log(errData);
				changeText(errData.message);
			} else {
				changeText('An error occurred');
			}
		}
	};

	return (
		<div className="app">
			<h1>Heroku deployment</h1>
			<Input
				placeholder="heroku app name"
				handleChange={handleInputChange}
			/>
			<Input
				placeholder="heroku token"
				handleChange={handleInputChange}
			/>
			<Dropzone
				chooseFile={chooseFileHandler}
				file={file}
				changeText={changeText}
				text={text}
			/>
			{file && appName && herokuToken ? (
				<DeployButton deployApp={deployAppHandler} />
			) : null}
			{appUrl ? (
				<div>
					<p>You can find your app on</p>
					<p className="url">{appUrl}</p>
					{/* <p>
						It may take a few minutes untill Heroku builds your app.
					</p> */}
				</div>
			) : null}
		</div>
	);
}

export default App;
