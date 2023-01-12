import React, {
	useEffect,
	useState
} from 'react';
import axios from 'axios';

export default function App() {
	const [desc, setDesc] = useState('');
	const [url, setUrl] = useState('');
	const [loading, setLoading] = useState(false);
	// useEffect(
	// 	() => {
	// 		console.log(desc);
	// 	},
	// 	[desc]
	// );

	const onClickHandler = () => {
		const newPrompt = {
			prompt: desc
		};
		setLoading(true);
		axios
			.post(
				'https://twisam-aigenimg-api.onrender.com/openai/genimg',
				newPrompt
			)
			.then(response => {
				if (response) {
					setLoading(false);
				}
				console.log(response);
				setUrl(response.data.data);
			})
			.catch(err => {
				console.log(err);
			});
	};
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center'
			}}>
			<div
				class="input-group mb-3"
				style={{ width: 500 }}>
				<input
					type="text"
					class="form-control"
					placeholder="Enter description"
					aria-label="Username"
					aria-describedby="basic-addon1"
					onChange={e => setDesc(e.target.value)}
					value={desc}
				/>
				<button
					type="button"
					class="btn btn-primary"
					onClick={e => onClickHandler()}>
					Submit
				</button>
			</div>
			<div>
				{loading && <p>loading...</p>}
				{url &&
					!loading &&
					<img
						src={url}
						alt="Ai"
						style={{
							width: '500px',
							height: '500px'
						}}
					/>}
			</div>
		</div>
	);
}
