import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { createAuthAction, getAllAction } from '../../redux/actions/MyAction';

export const GoogleAuth = () => {
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(getAllAction("/user"));
    },[dispatch]);

    const getAll = useSelector((state) => state.data);
    //console.log(getAll);

    // //to use logged in user, call it from local storage
    // const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    
    const responseGoogle = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        console.log(token);
        const curentData = getAll.find(
            (kuha) => kuha.email === result.email
        );

        try {
            if(curentData){
                console.log("MERON");
                dispatch({type: 'AUTH', data: {result, token}});
                window.location = '/';
            }else{
                //pass token for middleware trappings and authorizatio || to follow
                dispatch(createAuthAction(result));
                dispatch({type: 'AUTH', data: {result, token}});
                window.location = '/';
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <GoogleLogin
                buttonText="Login"
                clientId="664094427410-dbk53uac5c7i598rqliqqc610c4m7867.apps.googleusercontent.com"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            /> 
        </div>
    )
}
