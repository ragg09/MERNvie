import React, {useEffect, useState, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActorProducer } from '../../redux/actions/ExtraAction';
import { getAllAction, getAllFilm } from '../../redux/actions/MyAction';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

export const TotalMovies = () => {
    const dispatch = useDispatch();

    let genreAction = [];
    let genreComedy = [];
    let genreFantasy = [];
    let genreAdventure = [];
    let genreHorror = [];

    //getting the data of users
    useEffect(()=>{
        dispatch(getAllAction("/user"));
        dispatch(getAllFilm());
        dispatch(getActorProducer());
    },[dispatch]);
    
    //action comedy fantasy adventure horror

    //const getUser = useSelector((state) => state.data);
    const getFilm = useSelector((state) => state.film);

    getFilm?.filter(val =>{
        if(val.genre === 'action'){
            genreAction.push(val)
        }
        if(val.genre === 'comedy'){
            genreComedy.push(val)
        }
        if(val.genre === 'fantasy'){
            genreFantasy.push(val)
        }
        if(val.genre === 'adventure'){
            genreAdventure.push(val)
        }
        if(val.genre === 'horror'){
            genreHorror.push(val)
        }
    })

    //getFilm.sort((a, b) => (parseInt(a.rating) > parseInt(b.rating)) ? -1 : 1)
    //console.log(getFilm);

    const data = {
        labels: ['Action', 'Comedy', 'Fantasy', 'Adventure', 'Horror'],
        datasets: [
          {
            label: 'Top Genre',
            data: [genreAction.length, genreComedy.length, genreFantasy.length, genreAdventure.length, genreHorror.length],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

    //console.log(getFilm[0].images[0].url);

    ChartJS.register(ArcElement, Tooltip, Legend);

    return (
        <div>
            
            <div className="row justify-content-center">
                TOTAL MOVIES: {getFilm.length}
                <div className="col-lg-8">
                    <Doughnut data={data} />
                </div>
            </div>
        </div>
    )
}
