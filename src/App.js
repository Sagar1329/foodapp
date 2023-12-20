import Navbar from './components/Navbar';
import './App.css';
import Home from './screens/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './screens/Login';
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import Signup from './screens/Signup';
import MyOrder from "./screens/MyOrder.js"
import { CartProvider } from './components/ContextReducer.js';
function App() {
  return (
   <CartProvider>
        <BrowserRouter>
      <div >
        <Routes>
          <Route exact path='/' element={ <Home /> } />
          <Route exact path='/login' element={ <Login /> } />
          <Route exact path='/CreateUser' element={ <Signup /> } />
          <Route exact path='/myOrder' element={ <MyOrder /> } />
        </Routes>

      </div>
    </BrowserRouter>
    
    </CartProvider>

  );
}

export default App;
