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
import { CreateRatingModal } from './CreateRatingModal';
import moment from 'moment';


import './ActorCss.css';

export const ViewActor = () => {
     //profanity filter
     var filter = require("profanity-filter")
     var badword = ['shit', 'ass', 'fuck'];
     badword.forEach((profanity)=>{
         filter.addWord(profanity);
     });
     
    const dispatch = useDispatch();
    const {id} = useParams();
    let myActors = [];
    let myReviews = [];

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    //getting the data of users
    useEffect(()=>{
        dispatch(getAllAction("/user"));
        dispatch(getAllFilm());
        dispatch(getActorProducer());

    },[dispatch]);

    const getActor = useSelector((state) => state.extra.actor);
    const getFilm = useSelector((state) => state.film);


    const currentData = getActor?.find(
        (kuha) => kuha._id === id
    );

    // const currentMovie = getFilm?.find(
    //     (kuha) => {
    //         console.log(kuha.actors._id === id);
    //     }
    // );

    getFilm.forEach((e) => {
        e.actors.forEach(act =>{
            if(act.user === id){
                myActors.push(e)
            }
        })
    });

    console.log(currentData);

    currentData?.reviews.forEach((review)=>{
        myReviews.push(review)
    });

    
    //console.log(currentData);
    // console.log(currentMovie);

    return (
        <div className='container'>
            <div className='row' >
                <div className='col-lg-4'>
                    <div className='border border-1 p-2 mb-2' id='boxColor'>
                        <h1 className='font-weight-bold d-flex justify-content-center'>{currentData?.name}</h1>
                        <p><i className="fas fa-sticky-note"></i> {currentData?.bio}</p> 

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
                        
                        {currentData?.rating ? <Rating name="half-rating-read" precision={0.5}  value={parseFloat(currentData?.rating)} readOnly /> : (<><p><i className="fa fa-star" aria-hidden="true"></i> No Ratings Yet</p></>)}

                        {user? <CreateRatingModal/>:""}
                        
                    </div>
                </div>

                <div className='row col-lg-8 p-2 mb-2'>
                    <h1>Cast of: </h1>
                    {myActors.map(d => (
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

            <div className='row'>
                <p>{myReviews.length} Comment/s</p>
                
                {myReviews?.map(d => (
                    <div className='col-lg-12 m-1' id='boxColor' key={d._id + myReviews.length++}>

                        <img src={d.image} className="rounded-circle" id="ImgComment" key={d._id + myReviews.length++}/>
                        <p id='commentElement' key={d._id + myReviews.length++}><span id='commentName' key={d._id + myReviews.length++}>{d.name} </span> <span id='commentDate' key={d._id + myReviews.length++}> <i className="far fa-clock"></i>{moment(d.timestamp).fromNow()} </span></p>
                        <br></br>
                        <p id='commentText' key={d._id + myReviews.length++}>{filter.clean(d.comment)}</p>
                    </div>              
                ))}
            </div>

        </div>
    )
}
