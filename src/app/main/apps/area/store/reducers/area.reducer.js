import * as Actions from '../actions';

const initialState = {
    data: null,
    areaDialog: {
        type: 'new',
        props: {
            open: false
        },
        data: null
    }
};

const areaReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_AREA:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.SAVE_AREA:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.OPEN_NEW_AREA_DIALOG:
        {
            return {
                ...state,
                areaDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
        case Actions.CLOSE_NEW_AREA_DIALOG:
        {
            return {
                ...state,
                areaDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_AREA_DIALOG:
        {
            return {
                ...state,
                areaDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_AREA_DIALOG:
        {
            return {
                ...state,
                areaDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        default:
        {
            return state;
        }
    }
};

export default areaReducer;
