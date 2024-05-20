import { Routes, Route } from 'react-router-dom'
import FirstPage from './components/pages/FirstPage/FirstPage'
import SignInPage from './components/pages/SignInPage/SignInPage'
import SignUpPage from './components/pages/SignUpPage/SignUpPage'
import Layout from './components/Layout/Layout'
import AccountPage from './components/pages/AccountPage/AccountPage'
import FoodPage from './components/pages/FoodPage/FoodPage'
import SportPage from './components/pages/SportPage/SportPage'
import MessagePage from './components/pages/MessagePage/MessagePage'
import ClientPageForTr from './components/pages/ClientPageForTr/ClientPageForTr'
import './App.css';

function App() {
	return (
		<Routes>
			<Route path='/' element={<FirstPage />} />
			<Route path='/signIn' element={<SignInPage />} />
			<Route path='/signUp' element={<SignUpPage />} />
			<Route path='/home/' element={<Layout />}> 
				<Route index element={<AccountPage />}/>
				<Route path='food' element={<FoodPage />}/>
				<Route path='sport' element={<SportPage />}/>
				<Route path='message' element={<MessagePage />}/>
			</Route>
			<Route path='/aboutYourClient' element={<ClientPageForTr />} />
			<Route path='/aboutYourClient/:id' element={<ClientPageForTr />} />
		</Routes>
	);
}

export default App;
