import * as Actions from '../actions';

const initialState = {
    recordsTotal: 0,
    recordsDisplay: 10,
    page: 0,
    pagesTotal: 0,
    data: [],
    searchText: ''
};

const usersReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_USERS:
        {
            return {
                ...state,
                recordsTotal: action.payload.recordsTotal,
                recordsDisplay: action.payload.recordsDisplay,
                page: action.payload.page,
                pagesTotal: action.payload.pagesTotal,
                data: action.payload.users
            };
        }
        case Actions.SET_USERS_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        default:
        {
            return state;
        }
    }
};

export default usersReducer;
