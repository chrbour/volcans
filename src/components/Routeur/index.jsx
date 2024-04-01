import React, {useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Presentation from '../../pages/Presentation';
import Photos from '../../pages/Photos';
import Contribution from '../../pages/Contribution';
import Accueil from '../../pages/Accueil';
import Connexion from '../../pages/Connexion';
import Inscription from '../../pages/Inscription';
import Error from '../../pages/Error';


function Routeur() {
	const [connected, setConnected] = useState('Not Connected');
	console.log('Routeur: ',connected);
	return (
		<Router>
			<Routes>
				<Route path = '/' element = {<Presentation />} />
				<Route path = '/Photos' element = {<Photos connected = {connected}/>} />
				<Route path = '/Contribution' element = {<Contribution connected = {connected}/>} />
				<Route path = '/Accueil' element = {<Accueil connected = {connected}/>} />
				<Route path = '/Connexion' element = {<Connexion connected ={connected} setConnected = {setConnected}/>}/>
				<Route path = '/Inscription' element = {<Inscription connected = {connected} setConnected = {setConnected}/>} />
				<Route path = '*' element = {<Error />} />
			</Routes>
		</Router>
	);
}

export default Routeur;
