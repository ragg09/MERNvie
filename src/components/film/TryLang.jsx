import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFilm } from '../../redux/actions/MyAction';
// import { getAllAction, getAllFilm } from '../redux/actions/MyAction';

export const TryLang = () => {
    const dispatch = useDispatch();
    //const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    //console.log(user);

    //getting the data of users
    useEffect(()=>{
        //dispatch(getAllAction("/user"));
        //dispatch(getAllFilm("/film"));
    },[dispatch]);


    //const getAll = useSelector((state) => state.data);

    //console.log(getAll);

    // const userData = getAll.find(
    //     (kuha) => kuha.email === user?.result.email
    // );

    //useEffect(()=>{
        //const token = user?.token;
        //setUser(JSON.parse(localStorage.getItem('profile')))
    //},[]);

    return (
        <div>
            <h1>TESTINGAN NG FILM</h1>
        </div>
    )
}
