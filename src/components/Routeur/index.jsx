import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Presentation from '../../pages/Presentation';
import Accueil from '../../pages/Accueil';
import Connexion from '../../pages/Connexion';
import Inscription from '../../pages/Inscription';
import Error from '../../pages/Error';


function Routeur() {
	return (
		<Router>
			<Routes>
				<Route path='/' element = {<Presentation />} />
				<Route path = '/Accueil/' element = {<Accueil/>} />
				<Route path = '/Connexion' element = {<Connexion/>}/>
				<Route path = '/Inscription' element = {<Inscription/>} />
				<Route path='*' element = {<Error />} />
			</Routes>
		</Router>
	);
}

export default Routeur;
