import { combineReducers } from 'redux';

import areas from './areas.reducer';
import companies from './companies.reducer';

const globalReducers = combineReducers({
    areas,
    companies
});

export default globalReducers;
