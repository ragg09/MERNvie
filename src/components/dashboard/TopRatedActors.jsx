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

export const TopRatedActors = () => {
    const dispatch = useDispatch();
    let ratingActors = [];

    //getting the data of users
    useEffect(()=>{
        dispatch(getAllAction("/user"));
        dispatch(getAllFilm());
        dispatch(getActorProducer());
    },[dispatch]);

    const getActors = useSelector((state) => state.extra.actor);

    getActors?.forEach((e) => {
        if(e.rating){
            ratingActors.push(e)
        }
    });

    ratingActors.sort((a, b) => (parseInt(a.rating) > parseInt(b.rating)) ? -1 : 1)


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
            text: 'Top Rated Actors',
          },
        },
      };
      
    const labels = [ratingActors[0]?.name, ratingActors[1]?.name, ratingActors[2]?.name, ratingActors[3]?.name, ratingActors[4]?.name, ratingActors[5]?.name, ratingActors[6]?.name, ratingActors[7]?.name, ratingActors[8]?.name, ratingActors[9]?.name];

    const data = {
      labels: labels,
      datasets: [{
        axis: 'y',
        label: 'Ratings',
        data: [ratingActors[0]?.rating,ratingActors[1]?.rating,ratingActors[2]?.rating,ratingActors[3]?.rating,ratingActors[4]?.rating,ratingActors[5]?.rating,ratingActors[6]?.rating,ratingActors[7]?.rating,ratingActors[8]?.rating,ratingActors[9]?.rating,],
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
