import React from 'react';
import {Link} from 'react-router-dom';

function Error() {
	return (
		<div>
			<h1 style={{color: 'red', textAlign: "center"}}>Erreur 404</h1>
			<h2 style={{color:'red', textAlign: "center"}}>Cette page n'existe pas !</h2>
			<Link to="/" className = "lienPresentation" style={{color: 'white', textAlign: "center"}}>
				<h2>Cliquez ici</h2>
			</Link>
		</div>
	);
}

export default Error;
