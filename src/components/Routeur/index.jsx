import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConnectedProvider } from '../../utils/context/ConnectedProvider';
import { VolcanoProvider } from '../../utils/context/VolcanoProvider';
import Presentation from '../../pages/Presentation';
import Photos from '../../pages/Photos';
import Contribution from '../../pages/Contribution';
import Accueil from '../../pages/Accueil';
import Connexion from '../../pages/Connexion';
import Inscription from '../../pages/Inscription';
import Description from '../../pages/Description';
import Error from '../../pages/Error';


function Routeur() {
	return (
		<React.StrictMode>
			<Router>
				<ConnectedProvider>
				<VolcanoProvider>
					<Routes>
						<Route path = '/' element = {<Presentation />} />
						<Route path = '/Photos' element = {<Photos />} />
						<Route path = '/Contribution' element = {<Contribution />} />
						<Route path = '/Accueil' element = {<Accueil />} />
						<Route path = '/Connexion' element = {<Connexion />}/>
						<Route path = '/Inscription' element = {<Inscription />} />
						<Route path = '/Description' element = {<Description />} />
						<Route path = '*' element = {<Error />} />
					</Routes>
				</VolcanoProvider>
				</ConnectedProvider>
			</Router>
		</React.StrictMode>
	);
}

export default Routeur;
