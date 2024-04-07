import React from 'react';
import imageVolcan from '../../assets/imageVolcan.png';
import letterV from '../../assets/lettre-v-feu.webp';
import letterO from '../../assets/lettre-o-feu.webp';
import letterL from '../../assets/lettre-l-feu.webp';
import letterC from '../../assets/lettre-c-feu.webp';
import letterA from '../../assets/lettre-a-feu.webp';
import letterN from '../../assets/lettre-n-feu.webp';
import letterS from '../../assets/lettre-s-feu.webp';
import {Link} from 'react-router-dom';

function Presentation() {
	const title = [
		{
			letter: 'V',
			name: letterV,
		},
		{
			letter: 'O',
			name: letterO,
		},
		{
			letter: 'L',
			name: letterL,
		},
		{
			letter: 'C',
			name: letterC,
		},
		{
			letter: 'A',
			name: letterA,
		},
		{
			letter: 'N',
			name: letterN,
		},
		{
			letter: 'S',
			name: letterS,
		},
	];
	let $i = -1;
	let titleLetter;
	let keyLetter;
	const word = title.map(letters => {
		{
			$i++;
			titleLetter = 'title__Letter--' + $i;
			keyLetter = 'Letter' + $i;
		}
		return (
			<img
				className={titleLetter}
				key={keyLetter}
				src = {letters.name}
				alt = "letters"
			>
			</img>
		);
	});
	sessionStorage.setItem("connexion", 0);
	return (
		<>
			<h1 className='title__ContainerLetters'>{word}</h1>
			<p className='title__Paragraph'>
				Bienvenue sur le site des plus beaux volcans du monde !
			</p>
			<div className='imgPresentation__Container'>
				<Link to='/Accueil' ClassName="lienAccueil">
					<img
						className='imgPresentation__Image'
						src = {imageVolcan}
						alt= "Un volcan"
					></img>
				</Link>
			</div>
			<p className='title__Paragraph'>Cliquez sur l'image</p>
		</>
	);
}

export default Presentation;
