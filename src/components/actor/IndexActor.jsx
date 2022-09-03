import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAction } from '../../redux/actions/MyAction';
import { IndexActorTable } from './IndexActorTable';
import { CreateActorModal } from './CreateActorModal';


export const IndexActor = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    console.log(user);
    const thisURL = "/actor";

    const dispatch = useDispatch();

    //getting data from state || varaible at rootReducer
    const getAll = useSelector((state) => state.data);

    //mapping through the data from request
    function actorGetAll(){
        return getAll.map(currentData => {
            return <IndexActorTable data={currentData} key={currentData._id} />
        })
    }

    useEffect(()=>{
        dispatch(getAllAction(thisURL));
    },[dispatch]);

    return (
        <div className="container">
            <CreateActorModal/>
            <table className="table table-border table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Bio</th>
                        <th>Image</th>
                        <th>Added</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* simple if else trapping to prevent error */}
                    {getAll.length > 0 ? actorGetAll() : console.log('wala pa')}
                </tbody>
            </table>
        </div>
    )
}
