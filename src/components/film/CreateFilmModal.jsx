import React, {useEffect, useState} from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createAction } from '../../redux/actions/MyAction';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';


export const CreateFilmModal = () => {
    const dispatch = useDispatch();
    const animatedComponents = makeAnimated();
    //modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [selectedProducer, setSelectedProducer] = useState([]);
    const [selectedActor, setSelectedActor] = useState([]);
    const [imagePreview, setimagePreview] = useState([]);
    const [images, setImages] = useState([]);
    
    const [ data, setData ] = useState({
        title: '',
        plot: '',
        genre: '',
        gross: '',
        date_released: '',
        runtime: '',
        thisURL: '/film',
    })

    const getActors = useSelector((state) => state.extra.actor);
    const getProducer = useSelector((state) => state.extra.producer);
    //console.log(getAll);

    let myActors = [];
    let myProducers = [];

    getActors?.forEach((actor) => {
        myActors.push({ value: actor._id, label: actor.name, image: actor.images[0].url})
    });

    getProducer?.forEach((prod) => {
        myProducers.push({ value: prod._id, label: prod.name, image: prod.images[0].url })
    });

    const onChangeActor = (myActors) =>{
        // console.log(myActors);
        setSelectedActor(myActors)
    }

    const onChangeProducer = (myProducers) =>{
        setSelectedProducer(myProducers)
    }

    const onChangeImg = (e) =>{
        //console.log(e.target.files);
        const files = Array.from(e.target.files);
        setimagePreview([]);
        //console.log(files[0]);
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
        const producers = [];
        const actors = [];
        const formData = new FormData();
        //looping through the array to set up the data
        selectedProducer.forEach((prod)=>{
            producers.push({ user: prod.value, name: prod.label, image: prod.image })
        });
        //looping through the array to set up the data
        selectedActor.forEach((actor)=>{
            actors.push({ user: actor.value, name: actor.label, image: actor.image  })
        });
        //looping through the array to set up the data
        images.forEach((image) => {
           formData.append("images", image);
        });


        formData.set("title", data.title);
        formData.set("plot", data.plot);
        formData.set("genre", data.genre);
        formData.set("gross", data.gross);
        formData.set("date_released", data.date_released);
        formData.set("runtime", data.runtime);
        formData.set("actors", JSON.stringify(actors));
        formData.set("producers", JSON.stringify(producers));

        handleClose();
        dispatch(createAction(formData, '/film'));
        setData({
            title: '',
            plot: '',
            genre: '',
            gross: '',
            date_released: '',
            runtime: '',
            thisURL: '/film',
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
                            <Modal.Title>Create Film</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input type="text" className="form-control" id="title" data-name="title" value={data.title} onChange={(e)=>setData({...data, title: e.target.value})}/>

                                <label htmlFor="plot">Plot</label>
                                <input type="text" className="form-control" id="plot" data-name="plot" value={data.plot} onChange={(e)=>setData({...data, plot: e.target.value})}/>

                                <label htmlFor="genre">Genre</label>
                                <input type="text" className="form-control" id="genre" data-name="genre" value={data.genre} onChange={(e)=>setData({...data, genre: e.target.value})}/>
                                

                                <label htmlFor="gross">Gross</label>
                                <input type="number" className="form-control" id="gross" data-name="gross" value={data.gross} onChange={(e)=>setData({...data, gross: e.target.value})}/>

                                <label htmlFor="date_released">Released</label>
                                <input type="date" className="form-control" id="date_released" data-name="date_released" value={data.date_released} onChange={(e)=>setData({...data, date_released: e.target.value})}/>

                                <label htmlFor="runtime">Runtime</label>
                                <input type="text" className="form-control" id="runtime" data-name="runtime" value={data.runtime} onChange={(e)=>setData({...data, runtime: e.target.value})}/>

                                <label htmlFor="actor">Actor</label>
                                <Select 
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    isMulti
                                    onChange={onChangeActor}
                                    options={myActors} 
                                />

                                <label htmlFor="producer">Producer</label>
                                <Select 
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    isMulti
                                    onChange={onChangeProducer}
                                    options={myProducers} 
                                />

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
