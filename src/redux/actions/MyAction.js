import axios from "axios";
const urlCall = "http://localhost:5000";

//MY TEMPLATE CRUD LOGIC
//Get all getURL must set from eg /url
export const getAllAction = (getURL) => async (dispatch) => {
    await axios.get(`${urlCall}`+getURL)
        .then(res => { dispatch({ type: "getAllData", res}) })
        .catch(err => { console.log(err) });
}

export const getAllFilm = () => async (dispatch) => {
    await axios.get(`${urlCall}/film`)
        .then(res => { dispatch({ type: "getAllFilm", res}) })
        .catch(err => { console.log(err) });
}

//create, data must contain URL
export const createAction = (data, thisURL) => async (dispatch, getState)=> {
    await axios.post(`${urlCall}`+`${thisURL}`, data)
        .then(res => { dispatch({ type: "createData", res}) })
        .catch(err => { console.log(err) });
}

//update, data must contain URL
export const updateAction = (updatedData, thisURL) => async (dispatch, getState)=> {
    await axios.post(`${urlCall}`+`${thisURL}`, updatedData)
        .then(res => { dispatch({type: "updateData", res}) })
        .catch(err => { console.log(err) });
}

//delete, data must contain URL and id
export const deleteAction = (getURL, id) => async (dispatch)=> {
    await axios.delete(`${urlCall}`+getURL+id)
        .then(() => {dispatch({ type: "deleteData", id}) })
        .catch(err => { console.log(err) });
}



















//delete, data must contain URL and id
export const deleteActionFilm = (getURL, id) => async (dispatch)=> {
    await axios.delete(`${urlCall}`+getURL+id)
        .then(() => {dispatch({ type: "deleteDataFilm", id}) })
        .catch(err => { console.log(err) });
}

//FOR GOOGLE AUTH
//craete, data must contain URL
export const createAuthAction = (data) => async (dispatch, getState)=> {
    await axios.post(`${urlCall}/user`, data)
        .then(res => { console.log(res) })
        .catch(err => { console.log(err) });
}

export const getActorMovie = (getURL) => async (dispatch) => {
    await axios.get(`${urlCall}/actor/`+getURL)
        .then(res => { dispatch({ type: "getActorMovie", res}) })
        .catch(err => { console.log(err) });
}
