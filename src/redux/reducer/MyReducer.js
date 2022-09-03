import { toast } from 'react-toastify';
import { Redirect } from 'react-router';

const MyReducer = (state = [], action) => {
    switch(action.type){
        case "getAllData":
            return action.res.data
        case "getOneData":
            return action.res.data
        case "createData":   
            toast.success("NEW RECORD ADDED",{
                position: toast.POSITION.TOP_CENTER
            })
            if(action.res.data.title){
                setTimeout(() => {
                    window.location = '/film/view/'+action.res.data._id;
                }, 3000);
                return [action.res.data, ...state]
            }else{
                
                return [action.res.data, ...state]
            }
            break;
        case "updateData":
            //window.location = '/';
            toast.success("DATA HAS BEEN UPDATED",{
                position: toast.POSITION.TOP_CENTER
            })
            history.back()
            return state;
        case "deleteData":
            toast.success("DATA HAS BEEN DELETED",{
                position: toast.POSITION.TOP_CENTER
            })
            return state.filter(data => data._id !== action.id)
        default: 
            return state;
    }

}

export default MyReducer;