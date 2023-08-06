import React from 'react';
import styled from 'styled-components';
import imageVolcan from '../../assets/imageVolcan.png';

function Presentation() {
	const title = [
		{
			letter: 'V',
			color: '#F333FF',
		},
		{
			letter: 'O',
			color: 'red',
		},
		{
			letter: 'L',
			color: 'blue',
		},
		{
			letter: 'C',
			color: 'yellow',
		},
		{
			letter: 'A',
			color: 'pink',
		},
		{
			letter: 'N',
			color: 'Orange',
		},
		{
			letter: 'S',
			color: 'purple',
		},
	];
	let $i = -1;
	let titleLetter;
	let keyLetter;
	const word = title.map((letters) => {
		{
			$i++;
			titleLetter = 'title__Letter--' + $i;
			keyLetter = 'Letter' + $i;
		}
		return (
			<div
				className={titleLetter}
				key={keyLetter}
				style={{ color: letters.color, marginRight: 5, marginLeft: 5 }}
			>
				{letters.letter}
			</div>
		);
	});

	return (
		<>
			<h1 className='title__ContainerLetters'>{word}</h1>
			<p className='title__Paragraph'>
				Bienvenue sur le site des plus beaux volcans du monde !
			</p>
			<div className='imgPresentation__Container'>
				<img
					className='imgPresentation__Image'
					src={imageVolcan}
					alt="Image d'un volcan"
				></img>
			</div>
			<p className='title__Paragraph'>Cliquez sur l'image</p>
		</>
	);
}

export default Presentation;
