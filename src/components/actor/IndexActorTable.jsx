import React from 'react';
import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { deleteAction } from '../../redux/actions/MyAction';

import './ActorCss.css';

export const IndexActorTable = props => {
    const dispatch = useDispatch();
    let myimage = [];
    const handleDelete = (id) =>{
        dispatch(deleteAction('/actor/', id));
    }

    if(props.data.images){
        props.data.images.forEach((image) => {
            myimage.push(image)
        });
    }

    return (
        <tr>
            <td>{props.data.name}</td>
            <td>{props.data.bio}</td>
            <td><div className='row'>
                {myimage.map(d => (
                    <span className="col-sm-3 rounded" key={d.public_id}>
                        <img src={d.url} className="rounded p-1" key={d.public_id} id="ViewImages"/>
                    </span>
                ))} 
            </div></td>
            <td>{moment(props.data.createdAt).fromNow()}</td>
            <td className="text-center">
                <Link className="btn btn-small btn-primary" to={'/actor/view/'+props.data._id}><i className="fas fa-eye"></i></Link>
                <Link className="btn btn-small btn-warning" to={'/actor/'+props.data._id}><i className="fas fa-edit"></i></Link>
                <button className="btn btn-small btn-danger"  onClick={()=>{handleDelete(props.data._id)}}><i className="fas fa-trash-alt"></i></button>
            </td>
        </tr>
    )
}
