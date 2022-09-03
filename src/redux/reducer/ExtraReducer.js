import { toast } from 'react-toastify';

const ExtraReducer = (state = [], action) => {
    switch(action.type){
        case "getActorProducer":
            return action.res.data 
        case "getActorMovie":
            return action.res.data 
        case "updateRating":
            toast.success("New Feedback",{
                position: toast.POSITION.TOP_CENTER
            })
            // return state.map((d)=>{
            //     d._id === action.res.data._id ? action.res.data : res
            // })
            // console.log(state);
            return state;
        default: 
            return state;
    }

}

export default ExtraReducer;