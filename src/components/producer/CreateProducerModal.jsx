import React, {useEffect, useState} from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createAction } from '../../redux/actions/MyAction';
// import { ImageList } from '@mui/material';
// import { ImageListItem } from '@mui/material';
export const CreateProducerModal = () => {
     //modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
 
    const dispatch = useDispatch();

    const [imagePreview, setimagePreview] = useState([]);
    const [images, setImages] = useState([]);
     
    const [ data, setData ] = useState({
         name: '',
         email: '',
         website: '',
         thisURL: '/producer',
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
        formData.set("email", data.email);
        formData.set("website", data.website);

         images.forEach((image) => {
           formData.append("images", image);
         });
         
        //console.log(formData);
         handleClose();
         dispatch(createAction(formData, '/producer'));
         setData({
            name: '',
            email: '',
            website: '',
            image: '',
            thisURL: '/producer',
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
                            <Modal.Title>Create Producer</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control" id="name" data-name="name" value={data.name} onChange={(e)=>setData({...data, name: e.target.value})}/>
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" id="email" data-name="email" value={data.email} onChange={(e)=>setData({...data, email: e.target.value})}/>
                                <label htmlFor="website">Website</label>
                                <input type="text" className="form-control" id="website" data-name="website" value={data.website} onChange={(e)=>setData({...data, website: e.target.value})}/>

                                <label htmlFor="formFileMultiple" className="form-label">Multiple files input example</label>
                                <input className="form-control" type="file" id="image" multiple onChange={onChangeImg}/>
                                
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
