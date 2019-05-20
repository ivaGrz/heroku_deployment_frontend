import React, { useState } from 'react';
import axios from 'axios';

import Button from '../Components/Button/Button';
import Dropzone from '../Components/Dropzone/Dropzone';
import Spinner from '../Components/Spinner/Spinner';

function CreateDB(props) {
	const [isChecked, setIsChecked] = useState(false);
	const [file, setFile] = useState(null);
	const [text, setText] = useState('Drop .sql file, or click to upload!');
	const [creatingDB, setCreatingDB] = useState(false);

	const changeText = text => {
		setText(text);
	};

	const chooseFileHandler = file => {
		setFile(file);
		// console.log(file);
		changeText(file[0].name);
	};

	const createDB = async () => {
		if (!props.appName || !props.herokuToken) {
			console.log('App name and token are required!');
			return;
		}
		setCreatingDB(true);
		try {
			if (file) {
				const data = new FormData();
				data.append('file', file[0]);
				await axios.post(`http://localhost:3000/upload/sql`, data);
			}
			const res = await axios.post(
				`http://localhost:3000/createClearDB?app=${
					props.appName
				}&token=${props.herokuToken}`
			);
			console.log('DB created');
			props.saveConfigData(res.data);

			if (file) {
				const fileName = file[0].name;
				await axios.post(
					`http://localhost:3000/dumpSQLFile?host=${
						res.data.host
					}&user=${res.data.username}&password=${
						res.data.password
					}&db=${res.data.database}&file=${fileName}`
				);
			}

			changeText('Drop .sql file, or click to upload!');
			setIsChecked(false);
			setCreatingDB(false);
		} catch (err) {
			console.log(err);
			changeText('An error occurred!');
			setCreatingDB(false);
		}
	};

	return (
		<div>
			<input
				type="checkbox"
				checked={isChecked}
				onChange={e => setIsChecked(e.target.checked)}
			/>
			Upload .sql file
			{isChecked ? (
				<Dropzone
					chooseFile={chooseFileHandler}
					file={file}
					changeText={changeText}
					text={text}
				/>
			) : null}
			<Button text="create DB" buttonClicked={createDB} />
			{creatingDB ? <Spinner /> : null}
			{props.DBConfigData ? (
				<div>
					<h2>DB created</h2>
					<span className="desc">host </span>
					<span>{props.DBConfigData.host}</span>
					<br />
					<span className="desc">username </span>
					<span>{props.DBConfigData.username}</span>
					<br />
					<span className="desc">password </span>
					<span>{props.DBConfigData.password}</span>
					<br />
					<span className="desc">DB name </span>
					<span>{props.DBConfigData.database}</span>
				</div>
			) : null}
		</div>
	);
}

export default CreateDB;
