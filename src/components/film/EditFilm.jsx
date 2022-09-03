import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { updateAction } from '../../redux/actions/MyAction';
import moment from 'moment';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

export const EditFilm = () => {
    const dispatch = useDispatch();
    const animatedComponents = makeAnimated();
    const {id} = useParams();
    const [imagePreview, setimagePreview] = useState([]);
    const [images, setImages] = useState([]);
    const [selectedProducer, setSelectedProducer] = useState([]);
    const [selectedActor, setSelectedActor] = useState([]);
    
    const getAll = useSelector((state) => state.film);

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

    let defaultActors = ['lelouch lamperouge', 'kallen stadtfeld']
    
    const currentData = getAll.find(
        (kuha) => kuha._id === id
    );
    

    if(currentData){
        var [ data, setData ] = useState({
            title: currentData.title,
            plot: currentData.plot,
            genre: currentData.genre,
            date_released: currentData.date_released,
            runtime: currentData.runtime,
            thisURL: '/film/'+id,
        }) 
    }
    

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

        formData.set("title", data.title);
        formData.set("plot", data.plot);
        formData.set("genre", data.genre);
        formData.set("date_released", data.date_released);
        formData.set("runtime", data.runtime);

         images.forEach((image) => {
           formData.append("images", image);
         });

         dispatch(updateAction(formData, data.thisURL));
    }

    let count = 0;

    return (
        <div className="container">
            {getAll?(
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input type="text" className="form-control" id="title" data-name="title" value={data.title} onChange={(e)=>setData({...data, title: e.target.value})}/>

                                <label htmlFor="plot">Plot</label>
                                <input type="text" className="form-control" id="plot" data-name="plot" value={data.plot} onChange={(e)=>setData({...data, plot: e.target.value})}/>

                                <label htmlFor="genre">Genre</label>
                                <input type="text" className="form-control" id="genre" data-name="genre" value={data.genre} onChange={(e)=>setData({...data, genre: e.target.value})}/>

                                <label htmlFor="date_released">Released</label>
                                <input type="date" className="form-control" id="date_released" data-name="date_released" defaultValue={moment(data.date_released).format('YYYY-MM-DD')} onChange={(e)=>setData({...data, date_released: e.target.value})}/>

                                {/* <label htmlFor="actor">Actor</label>
                                <Select 
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    isMulti
                                    onChange={onChangeActor}
                                    options={myActors} 
                                    defaultValue={myActors[2]}
                                />

                                <label htmlFor="producer">Producer</label>
                                <Select 
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    isMulti
                                    onChange={onChangeProducer}
                                    options={myProducers} 
                                /> */}

                                

                                <label htmlFor="runtime">Runtime</label>
                                <input type="text" className="form-control" id="runtime" data-name="runtime" value={data.runtime} onChange={(e)=>setData({...data, runtime: e.target.value})}/>

                                <label htmlFor="formFileMultiple" className="form-label">Multiple files input example</label>
                                <input className="form-control" type="file" id="formFileMultiple" multiple onChange={onChangeImg}/>
                                
                                {imagePreview.map((img) => (
                                    <div className="row-cols-3" key={img}>
                                         <img src={img} className="rounded float-start p-1" key={img}/>
                                    </div>
                                ))}

                            </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                
            ):(
                <h1>DIRECT ACCESS IS PROHIBITED, USE THE EDIT BUTTON INSTEAD</h1>
            )}
        </div>
    )  
}
