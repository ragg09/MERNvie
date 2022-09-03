import axios from "axios";
const urlCall = "http://localhost:5000";

export const getActorProducer = (getURL) => async (dispatch) => {
    await axios.get(`${urlCall}/actor_producer`)
        .then(res => { dispatch({ type: "getActorProducer", res}) })
        .catch(err => { console.log(err) });
}

//update, data must contain URL
export const updateRating = (updatedData, thisURL) => async (dispatch, getState)=> {
    await axios.post(`${urlCall}`+`${thisURL}`, updatedData)
        .then(res => { dispatch({type: "updateRating", res}) })
        .catch(err => { console.log(err) });
}

