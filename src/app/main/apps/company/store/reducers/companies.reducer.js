import * as Actions from '../actions';

const initialState = {
    recordsTotal: 10,
    recordsDisplay: 10,
    page: 0,
    pagesTotal: 1,
    data: [],
    searchText: ''
};

const companiesReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_COMPANIES:
        {
            return {
                ...state,
                recordsTotal: action.payload.recordsTotal,
                recordsDisplay: action.payload.recordsDisplay,
                page: action.payload.page,
                pagesTotal: action.payload.pagesTotal,
                data: action.payload.company
            };
        }
        case Actions.SET_COMPANIES_SEARCH_TEXT:
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

export default companiesReducer;
