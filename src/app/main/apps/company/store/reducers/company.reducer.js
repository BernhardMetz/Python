import * as Actions from '../actions';

const initialState = {
    data: null,
    companyDialog: {
        type: 'new',
        props: {
            open: false
        },
        data: null
    }
};

const companyReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_COMPANY:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.SAVE_COMPANY:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.OPEN_NEW_COMPANY_DIALOG:
        {
            return {
                ...state,
                companyDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
        case Actions.CLOSE_NEW_COMPANY_DIALOG:
        {
            return {
                ...state,
                companyDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_COMPANY_DIALOG:
        {
            return {
                ...state,
                companyDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_COMPANY_DIALOG:
        {
            return {
                ...state,
                companyDialog: {
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

export default companyReducer;
