import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { updateAction } from '../../redux/actions/MyAction';

export const EditActor = () => {
    const dispatch = useDispatch();
    const {id} = useParams();

    
    const [imagePreview, setimagePreview] = useState([]);
    const [images, setImages] = useState([]);
    
    const getAll = useSelector((state) => state.data);

    const curentData = getAll.find(
        (kuha) => kuha._id === id
    );

    const [ data, setData ] = useState({
        name: curentData.name,
        bio: curentData.bio,
        thisURL: '/actor/'+id,
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

         dispatch(updateAction(formData, data.thisURL));
    }

    return (
        <div className="container">
            {getAll?(
                <form onSubmit={handleSubmit}>
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
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                
            ):(
                <h1>DIRECT ACCESS IS PROHIBITED, USE THE EDIT BUTTON INSTEAD</h1>
            )}
        </div>
    )
}
