import EditTask from './pages/EditTask';
import Home from './pages/Home';

import { Routes, Route } from 'react-router-dom';

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/edit/:id' element={<EditTask />} />
			</Routes>
		</>
	);
}
export default App;
