import './App.css';
import Home from './components/Home';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='About' element={<h1>About</h1>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
