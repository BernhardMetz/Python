import * as Actions from '../actions';
import { USER } from 'app/consts';

const initialState = {
    data: null
};

const userReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_USER:
        {
            if (action.payload) {
                if (action.payload.type === 'undefined') {
                    action.payload.type = USER;
                }
                if (action.payload.carLimit === 'undefined') {
                    action.payload.carLimit = 0;
                }
                if (action.payload.company === 'undefined') {
                    action.payload.company = 1;
                }

                action.payload.userType = action.payload.type;
                action.payload.plateLimit = action.payload.carLimit;
            }
            
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.SAVE_USER:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        default:
        {
            return state;
        }
    }
};

export default userReducer;
