import { toast } from 'react-toastify';

const FilmReducer = (state = [], action) => {
    switch(action.type){
        case "getAllFilm":
            return action.res.data;  
        case "deleteDataFilm":
            toast.success("DATA HAS BEEN DELETED",{
                position: toast.POSITION.TOP_CENTER
            })
            return state.filter(data => data._id !== action.id);
        default: 
            return state;
    }

}

export default FilmReducer;