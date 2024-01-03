import React from 'react';
import image from '../../assets/tetiana-grypachevska.webp';
import {Link} from 'react-router-dom';

function Error() {
	return (
		<div className="pageError">
			<img src={image} alt="Coulée de lave"/>
			<div className = 'textError'>
				<h1>Erreur 404</h1>
				<h2>Cette page n'existe pas !</h2>
				<Link to="/" className = "lienPresentation">
					<h2>Cliquez ici</h2>
				</Link>
			</div>
		</div>
	);
}

export default Error;
