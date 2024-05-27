import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter,Route,Routes} from 'react-router-dom'

import Main from './Main'
import Home from './Home'
import Cart from './Cart'
import Reg from './Reg'
import Login from './Login'
import Ordered from './Ordered'
import Sell from './Sell'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
        <Route path='/' element={<Main/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/ordered' element={<Ordered/>}></Route>
        <Route path='/sell' element={<Sell/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Reg/>}></Route>
        <Route path='*' element={<h1>Page Not Found</h1>}></Route>
    </Routes>
  </BrowserRouter>
);

