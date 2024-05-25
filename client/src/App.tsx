import React from 'react';
import ResponsiveAppBar from './components/Navbar';
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';
import CreateWatchList from './components/CreateWatchList'
import Dashboard from './components/Dashboard';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import useStore  from './store';

function App() {
  const {isAuthenticated} = useStore();
  return (
    <div >
     <ResponsiveAppBar/>
     <Router>
      <Routes>
        <Route path='/createwatchlist' element={isAuthenticated?<CreateWatchList/>:<SignIn/>} ></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/' element={isAuthenticated?<Dashboard/>:<SignIn/>}></Route>
        <Route path='/signup' element={isAuthenticated?<Dashboard/>:<SignUp/>}></Route>
      </Routes>
     </Router>

    </div>
  );
}

export default App;
