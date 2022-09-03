import React, {useEffect, useState} from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createAction } from '../../redux/actions/MyAction';

export const CreateActorModal = () => {
    //modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();

    const [imagePreview, setimagePreview] = useState([]);
    const [images, setImages] = useState([]);
    
    const [ data, setData ] = useState({
        name: '',
        bio: '',
        thisURL: '/actor',
    })

    const onChangeImg = (e) =>{
        console.log(e.target.files);
        const files = Array.from(e.target.files);
        setimagePreview([]);
        console.log(files[0]);
        files.forEach((file) => {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setimagePreview((oldArray) => [...oldArray, reader.result]);
              setImages((oldArray) => [...oldArray, reader.result]);
            }
          };
    
          reader.readAsDataURL(file);
        });
    };


    const handleSubmit = e => {
        e.preventDefault();

        const formData = new FormData();

        formData.set("name", data.name);
        formData.set("bio", data.bio);

        images.forEach((image) => {
           formData.append("images", image);
        });

        handleClose();
        dispatch(createAction(formData, '/actor'));
        setData({
            name: '',
            bio: '',
            image: '',
            thisURL: '/actor',
        })
    }

    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                CREATE
            </Button>

            
                <Modal show={show} onHide={handleClose}>
                    <form onSubmit={handleSubmit}>
                        <Modal.Header closeButton>
                            <Modal.Title>Create Actor</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control" id="name" data-name="name" value={data.name} onChange={(e)=>setData({...data, name: e.target.value})}/>
                                <label htmlFor="bio">Bio</label>
                                <input type="text" className="form-control" id="bio" data-name="bio" value={data.bio} onChange={(e)=>setData({...data, bio: e.target.value})}/>

                                <label htmlFor="formFileMultiple" className="form-label">Multiple files input example</label>
                                <input className="form-control" type="file" id="formFileMultiple" multiple onChange={onChangeImg}/>
                                
                                {imagePreview.map((img) => (
                                    <div className="row-cols-3" key={img}>
                                         <img src={img} className="rounded float-start p-1" key={img}/>
                                    </div>
                                ))}

                            </div>
                            
                        
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                            <Button variant="primary" type="submit">CREATE</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
        </div>
    )
}
