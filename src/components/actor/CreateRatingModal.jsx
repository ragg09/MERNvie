import React, {useEffect, useState} from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Rating from '@mui/material/Rating';
import { updateRating } from '../../redux/actions/ExtraAction';

export const CreateRatingModal = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    //modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const getActor = useSelector((state) => state.extra.actor);

    const currentData = getActor?.find(
        (kuha) => kuha._id === id
    );

    const [ data, setData ] = useState({
        comment: '',
        rate: 0,
        thisURL: '/actor/'+id,
    })

    //console.log(user.result.imageUrl);

    const handleSubmit = e => {
        e.preventDefault();
        currentData?.reviews.push({user: id, name: user.result.name, rating: data.rate, comment: data.comment, image: user.result.imageUrl})
        //console.log(currentData.reviews);
        const formData = new FormData();
        formData.set("reviews", JSON.stringify(currentData.reviews));

        handleClose();
        dispatch(updateRating(formData, data.thisURL));
        setData({
            comment: '',
            rate: 0,
        })
        
    }
    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Give Feedback
            </Button>

            
                <Modal show={show} onHide={handleClose}>
                    <form onSubmit={handleSubmit}>
                        <Modal.Header closeButton>
                            <Modal.Title>GIVE FEEBACK!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className='d-flex justify-content-center'>
                                <Rating
                                    size="large"
                                    name="simple-controlled"
                                    value={parseInt(data.rate)}
                                    onChange={(e)=>setData({...data, rate: e.target.value})}
                                    
                                />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="comment">Comment</label>
                                <input type="text" className="form-control" id="comment" data-name="comment" value={data.comment} onChange={(e)=>setData({...data, comment: e.target.value})}/>

                            </div>
                            
                        
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                            <Button variant="primary" type="submit">Submit</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
        </div>
    )
}
