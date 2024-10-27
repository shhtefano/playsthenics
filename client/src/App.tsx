import './App.css';
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import { WorkInProgess } from './components/WorkInProgess';
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Profile } from './components/Profile';
import API from './API';
import ParkMap from './components/ParkMap';

interface Credentials {
  username: string;
  password: string;
}

function App() {
  const [username, setUser] = useState<string|undefined>(''); // Tipi per username
  const [role, setRole] = useState<string|undefined>(''); // Tipi per username
  const [loggedIn, setLoggedIn] = useState<boolean>(false); // Tipi per loggedIn
  const navigate = useNavigate();

  // const checkAuth = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3001/current-user', {
  //       method: 'GET',
  //       credentials: 'include', // Includi i cookie nella richiesta
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       setUser(data);
  //     } else {
  //       console.error('Not authenticated');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching user:', error);
  //   }
  // };

  // useEffect(() => {
  //   checkAuth(); // Controlla lo stato di autenticazione al caricamento dell'app
  // }, []);

  const handleLogin = async (credentials: Credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLoggedIn(true);
      setUser(user.username);      
      setRole(user.role);
      navigate('/profile');
    } catch (err: any) { // Tipizzazione di err come `any`
      // setMessage({ msg: err.toString(), type: 'danger' });
      console.log(err);
    }
  };

  const handleLogout = async () => {
    try {
      await API.logOut();
      setLoggedIn(false);
      setUser(undefined);
      setRole(undefined);
      navigate('/');
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Layout loggedIn={loggedIn}/>}>
      <Route index path="/" element={loggedIn ? <Navigate to="/profile" /> : <Navigate to="/login" />}/>
      <Route path="/login" element={loggedIn ? <Navigate to="/profile" /> : <Login handleLogin={handleLogin} />}/>
      <Route path="/profile" element={loggedIn ? <Profile username={username} role={role} handleLogout={handleLogout} /> : <Navigate to="/login" />} />
      <Route path="/map" element={<ParkMap/>} />
        <Route path="*" element={<WorkInProgess/>}/>

      </Route>
    </Routes>
  );
}

export default App;
