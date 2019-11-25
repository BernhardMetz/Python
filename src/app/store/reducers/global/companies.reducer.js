import * as Actions from 'app/store/actions/global';

const initialState = {
    recordsTotal: 1,
    recordsDisplay: 1,
    page: 0,
    pagesTotal: 1,
    data: [],
    searchText: ''
};

const companies = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_GLOBAL_COMPANIES:
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
        default:
        {
            return state;
        }
    }
};

export default companies;
