import React, {useEffect, useState, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActorProducer } from '../../redux/actions/ExtraAction';
import { getAllAction, getAllFilm } from '../../redux/actions/MyAction';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';

export const TopRatedMovies = () => {
    const dispatch = useDispatch();
    let ratingMovies = [];

    //getting the data of users
    useEffect(()=>{
        dispatch(getAllAction("/user"));
        dispatch(getAllFilm());
        dispatch(getActorProducer());
    },[dispatch]);

    
    
    //action comedy fantasy adventure horror

    //const getUser = useSelector((state) => state.data);
    const getFilm = useSelector((state) => state.film);

    getFilm?.forEach((e) => {
        if(e.rating){
            ratingMovies.push(e)
        }
    });

    ratingMovies.sort((a, b) => (parseInt(a.rating) > parseInt(b.rating)) ? -1 : 1)


    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      );

      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Top 10 Movies',
          },
        },
      };
      
    const labels = [ratingMovies[0]?.title, ratingMovies[1]?.title, ratingMovies[2]?.title, ratingMovies[3]?.title, ratingMovies[4]?.title, ratingMovies[5]?.title, ratingMovies[6]?.title, ratingMovies[7]?.title, ratingMovies[8]?.title, ratingMovies[9]?.title];

    const data = {
      labels: labels,
      datasets: [{
        axis: 'y',
        label: 'Ratings',
        data: [ratingMovies[0]?.rating,ratingMovies[1]?.rating,ratingMovies[2]?.rating,ratingMovies[3]?.rating,ratingMovies[4]?.rating,ratingMovies[5]?.rating,ratingMovies[6]?.rating,ratingMovies[7]?.rating,ratingMovies[8]?.rating,ratingMovies[9]?.rating,],
        fill: false,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    };
      

    return (
        <div>
            {/* TOPRATED MOVIES */}
            <Bar options={options} data={data} />
        </div>
    )
}
