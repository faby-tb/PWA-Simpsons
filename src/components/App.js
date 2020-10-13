import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';

import axios from '../util/axios';

const App = () => {
	const initialState = {
		quote: '',
		character: '',
		image: '',
		characterDirection: '',
	};

	const [quote, setQuote] = useState(initialState);

	useEffect(() => {
		axios
			.get('quotes')
			.then(function (response) {
				if (response.data && response.data.length > 0) {
					setQuote(response.data[0]);
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

	return (
		<div
			className={`container-fluid content ${
				quote.characterDirection === 'Right' ? 'yellow' : 'blue'
			} `}
		>
			<div
				className={`col-12 col-sm-8 ${
					quote.characterDirection === 'Right' ? 'right' : 'left'
				}`}
			>
				<a className="reload " href="/">
					<i className="fas fa-retweet "></i>
				</a>
				<div className="">
					<p
						className={`quote ${
							quote.characterDirection === 'Right' ? 'text-left ' : 'text-right '
						}`}
					>
						{quote.quote.trim()}
					</p>
				</div>
				<p
					className={`character  ${
						quote.characterDirection === 'Right' ? 'text-left' : 'text-right'
					}`}
				>
					- {quote.character.trim()}
				</p>

				{quote.image !== '' && (
					<img className="image img-fluid" src={quote.image} alt={quote.character} />
				)}
			</div>
		</div>
	);
};

export default App;
