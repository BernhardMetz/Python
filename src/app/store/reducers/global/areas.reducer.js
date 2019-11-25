import * as Actions from 'app/store/actions/global';

const initialState = {
    recordsTotal: 1,
    recordsDisplay: 1,
    page: 0,
    pagesTotal: 1,
    data: [],
    searchText: ''
};

const areas = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_GLOBAL_AREAS:
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
        default:
        {
            return state;
        }
    }
};

export default areas;
