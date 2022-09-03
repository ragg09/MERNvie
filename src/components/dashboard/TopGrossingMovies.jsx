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

export const TopGrossingMovies = () => {
    const dispatch = useDispatch();

    //getting the data of users
    useEffect(()=>{
        dispatch(getAllAction("/user"));
        dispatch(getAllFilm());
        dispatch(getActorProducer());
    },[dispatch]);

    const getFilm = useSelector((state) => state.film);

    getFilm?.sort((a, b) => (parseInt(a.gross) > parseInt(b.gross)) ? -1 : 1)


    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      );

      const options = {
        indexAxis: 'y',
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Top Grossing Movies',
          },
        },
      };
      
    const labels = [getFilm[0]?.title, getFilm[1]?.title, getFilm[2]?.title, getFilm[3]?.title, getFilm[4]?.title, getFilm[5]?.title, getFilm[6]?.title, getFilm[7]?.title, getFilm[8]?.title, getFilm[9]?.title];

    const data = {
      labels: labels,
      datasets: [{
        axis: 'y',
        label: 'Ratings',
        data: [getFilm[0]?.gross,getFilm[1]?.gross,getFilm[2]?.gross,getFilm[3]?.gross,getFilm[4]?.gross,getFilm[5]?.gross,getFilm[6]?.gross,getFilm[7]?.gross,getFilm[8]?.gross,getFilm[9]?.gross,],
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
            <Bar options={options} data={data} />
        </div>
    )
}
