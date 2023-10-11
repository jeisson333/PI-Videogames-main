import './App.css'
import { Routes, Route} from 'react-router-dom'
import Home from './Views/Home/Home'
import Details from './Views/Details/Details'
import Create from './Views/Create/Create'
import Landing from './Views/Landing/Landing'
import Navbar from './Components/Navbar/Navbar'



function App() {
  
  return (
   <div>
    
    
      <Routes>
      
        <Route exact path="/" element={<Landing />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/details/:id" element={<Details />}/>
        <Route path="/create" element={<Create />}/>
 
      </Routes>

   </div>
  )
}

export default App
