import React, {useEffect, useState, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import {Link} from 'react-router-dom';
import { updateAction } from '../../redux/actions/MyAction';
import { getAllAction } from '../../redux/actions/MyAction';
import { getAllFilm } from '../../redux/actions/MyAction';
import { getActorProducer } from '../../redux/actions/ExtraAction';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Rating from '@mui/material/Rating';
import moment from 'moment';


export const ViewProducer = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    let myProducers = [];
    let myReviews = [];

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    //getting the data of users
    useEffect(()=>{
        dispatch(getAllAction("/user"));
        dispatch(getAllFilm());
        dispatch(getActorProducer());

    },[dispatch]);

    const getProducer = useSelector((state) => state.extra.producer);
    const getFilm = useSelector((state) => state.film);


    const currentData = getProducer?.find(
        (kuha) => kuha._id === id
    );

     getFilm?.forEach((e) => {
        e.producers.forEach(prod =>{
            if(prod.user === id){
                myProducers.push(e)
            }
        })
    });


    //console.log(getFilm);
    console.log(myProducers);


    return (
        <div className='container'>
            <div className='row' >
                <div className='col-lg-4'>
                    <div className='border border-1 p-2 mb-2' id='boxColor'>
                        <h1 className='font-weight-bold d-flex justify-content-center'>{currentData?.name}</h1>
                        <p><i class="fas fa-at"></i> {currentData?.email}</p> 
                        <p><i class="fas fa-window-maximize"></i> {currentData?.website}</p> 

                        <div className='row'>
                            <div className='col-lg-12'>
                                <Carousel dynamicHeight="true" autoPlay="true" infiniteLoop>
                                    {currentData?.images.map(d => (
                                        <span className="" key={d.public_id}>
                                            <img src={d.url}  key={d.public_id}/>
                                        </span>
                                    ))}
                                </Carousel>
                            </div>
                        </div>
                        
                    </div>
                </div>

                <div className='row col-lg-8 p-2 mb-2'>
                    <h1>Produced Movie: </h1>
                    {myProducers.map(d => (
                        <div className='col-lg-6 p-1' key={d._id}>
                            <div className='border rounded' id="filmItem" key={d._id}>
                                
                                <Link to={'/film/view/'+d._id}><img className='w-100' src={d.images[0].url}  id="filmItemImage"/></Link>

                                <div className='m-1' key={d._id}>
                                    <h1>{d.title}</h1>
                                    <p>Genre: {d.genre}</p>
                                    {d.rating ? <Rating name="half-rating-read" precision={0.5} value={parseFloat(d.rating)} readOnly /> : 'No ratings yet'}
                                    <br></br>

                                    
                                </div>

                            </div>
                        </div>
                    ))}
                </div>   
            </div>
        </div>
    )
}
