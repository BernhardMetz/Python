import { combineReducers } from 'redux';
import areas from './areas.reducer';
import area from './area.reducer';

const reducer = combineReducers({
    areas,
    area
});

export default reducer;
