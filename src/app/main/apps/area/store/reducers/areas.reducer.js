import * as Actions from '../actions';

const initialState = {
    recordsTotal: 1,
    recordsDisplay: 1,
    page: 0,
    pagesTotal: 1,
    data: [],
    searchText: ''
};

const areasReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_AREAS:
        {
            return {
                ...state,
                recordsTotal: action.payload.recordsTotal,
                recordsDisplay: action.payload.recordsDisplay,
                page: action.payload.page,
                pagesTotal: action.payload.pagesTotal,
                data: action.payload.area
            };
        }
        case Actions.SET_AREAS_SEARCH_TEXT:
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

export default areasReducer;