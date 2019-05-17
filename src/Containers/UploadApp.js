import React, { useState } from 'react';

import Dropzone from '../Components/Dropzone/Dropzone';
import Button from '../Components/Button/Button';
import axios from 'axios';

function UploadApp(props) {
	const [file, setFile] = useState(null);
	const [text, setText] = useState(
		'Drop .zip file off your app, or click to upload!'
	);
	const [appUrl, setAppUrl] = useState('');

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
				`https://heroku-deployment-api.herokuapp.com/deployApp?app=${
					props.appName
				}&token=${props.herokuToken}`,
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
		<div>
			<Dropzone
				chooseFile={chooseFileHandler}
				file={file}
				changeText={changeText}
				text={text}
			/>
			{file && props.appName && props.herokuToken ? (
				<Button buttonClicked={deployAppHandler} text="upload" />
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

export default UploadApp;
