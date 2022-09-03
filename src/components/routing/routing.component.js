import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import { ToastContainer} from 'react-toastify';

import MyNavbar from './navbar.component';


import { MyIndex } from '../MyIndex';
//producer
import { IndexProducer } from '../producer/IndexProducer';
import { EditProducer } from '../producer/EditProducer';
import { ViewProducer } from '../producer/ViewProducer';
//actor
import { IndexActor } from '../actor/IndexActor';
import { EditActor } from '../actor/EditActor';
import { ViewActor } from '../actor/ViewActor';
//film
import { ViewFilm } from '../film/ViewFilm';
import { EditFilm } from '../film/EditFilm';
//dashboard
import { DashboardView } from '../dashboard/DashboardView';



export default function NavRouting() {
    return (
      <Router>
          <ToastContainer/>
          <MyNavbar/>
          <br/>
  
          <Routes>
                <Route path="/" exact element={<MyIndex/>}/>

                <Route path="/dashboard" element={<DashboardView/>}/>

                <Route path="/producer" element={<IndexProducer/>}/>
                <Route path="/producer/:id" element={<EditProducer/>}/>
                <Route path="/producer/view/:id" element={<ViewProducer/>}/>

                <Route path="/actor" element={<IndexActor/>}/>
                <Route path="/actor/:id" element={<EditActor/>}/>
                <Route path="/actor/view/:id" element={<ViewActor/>}/>

                <Route path="/film/view/:id" element={<ViewFilm/>}/>
                <Route path="/film/:id" element={<EditFilm/>}/>
          </Routes>
          
      </Router>
        
      
    );
}
  
// export default NavRouting;
  