import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Presentation from '../../pages/Presentation';
import Error from '../../pages/Error';

function Routeur() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Presentation />} />
				<Route path='*' element={<Error />} />
			</Routes>
		</Router>
	);
}

export default Routeur;
