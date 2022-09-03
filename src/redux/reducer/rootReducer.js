import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import MyReducer from './MyReducer';
import FilmReducer from './FilmReducer';
import ExtraReducer from './ExtraReducer';

const rootReducer = combineReducers({
    google: AuthReducer,
    data: MyReducer,
    film: FilmReducer,
    extra: ExtraReducer,
});

export default rootReducer;