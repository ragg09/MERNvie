import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { updateAction } from '../../redux/actions/MyAction';
import { getAllFilm } from '../../redux/actions/MyAction';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Rating from '@mui/material/Rating';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { CreateRatingModal } from './CreateRatingModal';
import './FilmCss.css';


export const ViewFilm = () => {
    //profanity filter
    var filter = require("profanity-filter")
    var badword = ['shit', 'ass', 'fuck'];
    badword.forEach((profanity)=>{
        filter.addWord(profanity);
    });

    const dispatch = useDispatch();
    const {id} = useParams();
    const [imagePreview, setimagePreview] = useState([]);
    const [images, setImages] = useState([]);
    let myActors = [];
    let myProducers = [];
    let myReviews = [];

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [showMore, setShowMore] = useState(false);

     useEffect(()=>{
        dispatch(getAllFilm());

        // fetchData();
    },[dispatch]);


    const getFilm = useSelector((state) => state.film);

    const currentData = getFilm.find(
        (kuha) => kuha._id === id
    );
    
    currentData?.producers.forEach((producer)=>{
        myProducers.push(producer)
    });

    currentData?.actors.forEach((actor)=>{
        myActors.push(actor)
    });

    currentData?.reviews.forEach((review)=>{
        myReviews.push(review)
    });

    return (
        <div className='container'>
            <div className='row' >
                <div className='col-lg-4'>
                    <div className='border border-1 p-2 mb-2' id='boxColor'>
                        <h1 className='font-weight-bold d-flex justify-content-center'>{currentData?.title}</h1>
                        <h5><i className="fa fa-address-book" aria-hidden="true"></i> {currentData?.genre}</h5>
                        <h5><i className="fa fa-calendar" aria-hidden="true"></i> {moment(currentData?.date_released).format('YYYY-MM-DD')}</h5>
                        <h5><i className="far fa-clock"></i> {currentData?.runtime} mins</h5>
                        <h5><i className="fas fa-money-bill-alt"></i> {currentData?.gross} gross amount</h5>
                        {currentData?.rating ? <Rating name="half-rating-read" precision={0.5}  value={parseFloat(currentData?.rating)} readOnly /> : (<><p><i className="fa fa-star" aria-hidden="true"></i> No Ratings Yet</p></>)}
                        
                        {user? <CreateRatingModal/>:""}
                        
                        
                    </div>
                </div>

                <div className='col-lg-8'>
                    <div className='border border-1 p-1' id='boxColor'>
                        {showMore ? currentData?.plot : `${currentData?.plot.substring(0, 250)}`}
                        <Link to='' onClick={(e) =>{e.preventDefault; setShowMore(!showMore)}}> See more . . .</Link>
                    </div>
                    <div className=' row mt-2'>
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
                    <div className='row mt-1 p-3'>
                        <div className='col-lg-6 p-1 mb-2'>
                            <h2 className='d-flex justify-content-center'>Producers</h2>
                                {myProducers?.map(d => (
                                    <span className="" key={d._id}>
                                        
                                        <Link to={'/producer/view/'+d.user}><img src={d.image}  key={d._id} className="rounded-circle" id="ViewImagesFilm" title={d.name}/></Link>
                                    </span>
                                ))}
                        </div>
                        <div className='col-lg-6 p-1 mb-2'>
                            <h2 className='d-flex justify-content-center'>Casts</h2>
                                {myActors?.map(d => (
                                    <span className="" key={d._id}>
                                        <Link to={'/actor/view/'+d.user}><img src={d.image}  key={d._id} className="rounded-circle" id="ViewImagesFilm" title={d.name}/></Link>
                                    </span>
                                ))}
                        </div>
                    </div>
                    
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
