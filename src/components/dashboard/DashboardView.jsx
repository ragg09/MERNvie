import React from 'react'
import { TotalMovies } from './TotalMovies'
import { TopRatedMovies } from './TopRatedMovies'
import { TopRatedActors } from './TopRatedActors'
import { TopGrossingMovies } from './TopGrossingMovies'

export const DashboardView = () => {



    return (
        <div className='container'>
            <TotalMovies/>
            <TopRatedMovies/>
            <TopRatedActors/>
            <TopGrossingMovies/>
        </div>
    )
}
