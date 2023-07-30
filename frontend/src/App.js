import './App.css';
import SignUp from './component/signup';
import ResponsiveAppBar from './component/ResponsiveAppBar';
import{BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './component/login';
import Ticket from './component/ticket';
import Create from './component/create';
import Edit from './component/edit';
import Ticketsort from './component/ticketsort';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <nav>
      <ResponsiveAppBar/>
      </nav>
      <Routes>
        <Route path='/' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/ticket' element={<Ticket/>}/>
        <Route path='/ticket/:id' element={<Ticketsort/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/edit/:id' element={<Edit/>}/>
      </Routes>

    </div>
    </BrowserRouter>
  );
}

export default App;
