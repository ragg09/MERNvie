import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAction } from '../../redux/actions/MyAction';
import { IndexProducerTable } from './IndexProducerTable';
import { CreateProducerModal } from './CreateProducerModal';


export const IndexProducer = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    console.log(user);
    const thisURL = "/producer";

    const dispatch = useDispatch();

    //getting data from state || varaible at rootReducer
    const getAll = useSelector((state) => state.data);

    //mapping through the data from request
    function producerGetAll(){
        return getAll.map(currentData => {
            return <IndexProducerTable data={currentData} key={currentData._id} />
        })
    }

    useEffect(()=>{
        dispatch(getAllAction(thisURL));
    },[dispatch]);

    

    return (
        <div className="container">
            <CreateProducerModal/>
            <table className="table table-border table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Website</th>
                        <th>Image</th>
                        <th>Added</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* simple if else trapping to prevent error */}
                    {getAll.length > 0 ? producerGetAll() : console.log('wala pa')}
                </tbody>
            </table>
        </div>
    )
}
