import React from 'react';
import './Dropzone.css';
import ReactDropzone from 'react-dropzone';
// import { FaFileArchive } from 'react-icons/fa';
import Spinner from '../Spinner/Spinner';

function Dropzone(props) {
	const onDrop = async file => {
		props.chooseFile(file);
		// props.deployApp(data);
	};

	const content = props.text === 'Uploading' ? <Spinner /> : props.text;

	return (
		<div className="dropzone-box">
			<ReactDropzone onDrop={onDrop}>
				{({ getRootProps, getInputProps, isDragActive }) => (
					<div {...getRootProps()} className="dropzone">
						<input {...getInputProps()} />
						{/* {props.file ? (
							<FaFileArchive style={{ fontSize: '25px' }} />
						) : null} */}
						{isDragActive ? 'Drop it!!' : content}
					</div>
				)}
			</ReactDropzone>
		</div>
	);
}

export default Dropzone;
