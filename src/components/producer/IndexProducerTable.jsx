import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { deleteAction } from '../../redux/actions/MyAction';

import './ProducerCss.css';

export const IndexProducerTable = props => {
    const dispatch = useDispatch();
    let myimage = [];
    
    const handleDelete = (id) =>{
        dispatch(deleteAction('/producer/', id));
    }


    if(props.data.images){
        props.data.images.forEach((image) => {
            myimage.push(image)
        });
    }

    return (
        <tr>
            <td>{props.data.name}</td>
            <td>{props.data.email}</td>
            <td>{props.data.website}</td>
            <td><div className='row'>
            {myimage.map(d => (
                <span className="col-sm-3 rounded" key={d.public_id}>
                    <img src={d.url} className="rounded p-1" key={d.public_id} id="ViewImages"/>
                </span>
            ))} 
            </div></td>
            <td>{moment(props.data.createdAt).fromNow()}</td>
            <td className="text-center">
                <Link className="btn btn-small btn-primary" to={'/producer/view/'+props.data._id}><i className="fas fa-eye"></i></Link>
                <Link className="btn btn-small btn-warning h-100" to={'/producer/'+props.data._id}><i className="fas fa-edit"></i></Link>
                <button className="btn btn-small btn-danger h-100"  onClick={()=>{handleDelete(props.data._id)}}><i className="fas fa-trash-alt"></i></button>
            </td>
        </tr>
    )
}
