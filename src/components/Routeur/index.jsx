import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConnectedProvider } from '../../utils/context/ConnectedProvider';
import Presentation from '../../pages/Presentation';
import Photos from '../../pages/Photos';
import Contribution from '../../pages/Contribution';
import Accueil from '../../pages/Accueil';
import Connexion from '../../pages/Connexion';
import Inscription from '../../pages/Inscription';
import Error from '../../pages/Error';


function Routeur() {
	return (
		<React.StrictMode>
			<Router>
				<ConnectedProvider>
					<Routes>
						<Route path = '/' element = {<Presentation />} />
						<Route path = '/Photos' element = {<Photos />} />
						<Route path = '/Contribution' element = {<Contribution />} />
						<Route path = '/Accueil' element = {<Accueil />} />
						<Route path = '/Connexion' element = {<Connexion />}/>
						<Route path = '/Inscription' element = {<Inscription />} />
						<Route path = '*' element = {<Error />} />
					</Routes>
				</ConnectedProvider>
			</Router>
		</React.StrictMode>
	);
}

export default Routeur;
