import './App.css';
import { Layout } from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import { Login } from './components/Login';
import { WorkInProgess } from './components/WorkInProgess';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index path="/" element={<Login/>}/>
        <Route path="*" element={<WorkInProgess/>}/>
      </Route>
    </Routes>
  );
}

export default App;
