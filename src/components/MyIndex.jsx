import React, {useEffect, useState, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAction, getAllFilm } from '../redux/actions/MyAction';
import {CreateFilmModal} from '../components/film/CreateFilmModal';
import { getActorProducer } from '../redux/actions/ExtraAction';
import {Link} from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { deleteActionFilm } from '../redux/actions/MyAction';
import Rating from '@mui/material/Rating';
import './film/FilmCss.css'

export const MyIndex = () => {
    const dispatch = useDispatch();
    const ref1 = useRef();
    const ref2 = useRef();
    const ref3 = useRef();
    let count = 1;

    const [searchTerm, setSearchTerm] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [movieRating, setMovieRating] = useState("");
    const [movieList, setmovieList] = useState("");
    
    
    // var currentRate = "";

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    //console.log(user);

    

    //getting the data of users
    useEffect(()=>{
        dispatch(getAllAction("/user"));
        dispatch(getAllFilm());
        dispatch(getActorProducer());
        
        const GetMovies = async () => {
            const res = await fetch(
                `http://localhost:5000/film`
            );
            const data = await res.json();
            //console.log(data);
            setmovieList(data);
        };
        GetMovies();
    },[dispatch]);


    const getUser = useSelector((state) => state.data);
    let getFilm = useSelector((state) => state.film);


    const userData = getUser.find(
        (kuha) => kuha.email === user?.result.email
    );

    //console.log(userData);

    const GetMovies = async () => {
        const res = await fetch(
            `http://localhost:5000/film`
        );
        const data = await res.json();
        //console.log(data);
        return data;
    };

    const handleDelete = async (id) =>{
        dispatch(deleteActionFilm('/film/', id));
        // const GetMovies = async () => {
        //     const res = await fetch(
        //         `http://localhost:5000/film`
        //     );
        //     const data = await res.json();
        //     //console.log(data);
        //     setmovieList(data);
        // };
        // GetMovies();

        const newData = movieList.filter(data => data._id !== id)

        setmovieList([...movieList, ...newData]);

    }

    const fetchData = async () =>  {
        const getMovieAgain = await GetMovies();
        setmovieList([...movieList, ...getMovieAgain]);
        
    }

     // Reset Input Field handler
    const resetInputField = () => {
        setEndDate("");
        setStartDate("");
        setMovieRating("")
        ref1.current.value = "";
        ref2.current.value = "";
        ref3.current.value = 0;
        //setSearchTerm("");
    };

    useEffect(()=>{
        const token = user?.token;
        setUser(JSON.parse(localStorage.getItem('profile')))
    },[]);

    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
    }
    
    //console.log(makeid(20));

    return (
        <div className="container">

            {userData?.email === "laravelmovie@gmail.com" ?
                <CreateFilmModal/>:""
            }
            

      <div className="input-group md-form form-sm form-1 pl-0">
        <div className="input-group-prepend">
          <span className="input-group-text purple lighten-3" id="basic-text1">
              <i className="fas fa-search text-white" aria-hidden="true"></i></span>
        </div>
        <input 
            className="form-control my-0 py-1" 
            type="text" placeholder="Search Movie . . ." 
            aria-label="Search" 
            onChange={(e) => {
                setSearchTerm(e.target.value);
            }}
        />
      </div>

      <div className='row d-flex justify-content-center'>
        <div className='col-lg-5'>
            <p>Filter by date: </p>
            <input type="date" 
                ref={ref1}
                defaultValue={startDate}
                onChange={(e) => {
                    setStartDate(e.target.value);
                    //console.log(e.target.value);
                }}
            />
            <input type="date"
                ref={ref2}
                defaultValue={endDate}  
                onFocus={(e) => {
                    setEndDate(e.target.value);
                    //console.log(e.target.value);
                }}
            />
        </div>
        <div className='col-lg-5'>
            <p>Filter by rating: </p>
            <input type="range" className="form-range" ref={ref3} defaultValue='0' min="0" max="5" onChange={(e) => { setMovieRating(e.target.value) }}/> 
            
        </div>
        <div className='col-lg-2'>
            <button className='btn btn-primary mx-auto d-block' onClick={resetInputField}>Reset Filter</button>
        </div>
      </div>

                {typeof movieList === 'object' ? 
                <InfiniteScroll
                style={{ padding: '20px'}}
                dataLength={movieList?.length}
                next={fetchData}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                >
                    <div className='row'>
                        {/* getFilm  movieList*/}
                        {movieList?.filter( val => {
                            if(searchTerm == "" && endDate == "" && movieRating == ""){
                                return val;
                            }else if(movieRating !== ""){
                                //console.log(movieRating);
                                return (val.rating >= parseInt(movieRating) && val.rating < parseInt(movieRating)+1) ;
                            }else if(endDate !== ""){
                                return val.date_released >= startDate+"T00:00:00.000Z" && val.date_released <= endDate+"T00:00:00.000Z";
                            }else if(val.title.toLowerCase().includes(searchTerm.toLowerCase())){
                                return val;
                            }
                        }).map(d => (
                            <div className='col-lg-4 p-1' key={makeid(20)}>
                                <div className='border rounded' id="filmItem" key={makeid(20)}>
                                    
                                    <Link to={'/film/view/'+d._id}><img className='w-100' src={d.images[0].url}  id="filmItemImage"/></Link>

                                    <div className='m-1' key={makeid(20)}>
                                        <h1>{d.title}</h1>
                                        <p>Genre: {d.genre}</p>
                                        {d.rating ? <Rating name="half-rating-read" precision={0.5} value={parseFloat(d.rating)} readOnly /> : 'No ratings yet'}
                                        <br></br>
                                        
                                        {userData?.email === "laravelmovie@gmail.com" ?
                                            <>
                                            <Link className="btn btn-small btn-warning" to={'/film/'+d._id}><i className="fas fa-edit"></i></Link>
                                            <Link className="btn btn-small btn-danger" to={''}  onClick={()=>{handleDelete(d._id);}} ><i className="fas fa-trash-alt"></i></Link>
                                            </>
                                            :
                                            ''
                                        }
                                        
                                        
                                    </div>

                                </div>
                            </div>
                        ))} 
                        
                    </div>
            </InfiniteScroll>:
            'Waiting' }

            
            
        </div>
    )
}
