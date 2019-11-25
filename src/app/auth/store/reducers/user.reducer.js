import * as Actions from '../actions';

const initialState = {
    role: [], // guest
    data: {
        'displayName': 'John Doe',
        'photoURL'   : 'assets/images/avatars/Velazquez.jpg',
        'email'      : 'johndoe@withinpixels.com',
        shortcuts    : [
            'calendar',
            'mail',
            'contacts',
            'todo'
        ]
    }
};

const user = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.SET_USER_DATA:
        {
            action.payload.role = [];
            if (action && action.payload && action.payload.type) {
                action.payload.role = ['admin', 'staff', 'user'];
            }

            // for test ...
            action.payload.type = 1;
            //
            
            return {
                ...initialState,
                ...action.payload,
                data: {
                    displayName: 'Super Admin',
                    email: action.payload.mail,
                    photoURL: 'assets/images/avatars/Velazquez.jpg',
                    shortcuts: [
                        'calendar',
                        'mail',
                        'contacts',
                        'todo'
                    ]
                }
            };
        }
        case Actions.REMOVE_USER_DATA:
        {
            return {
                ...initialState
            };
        }
        case Actions.USER_LOGGED_OUT:
        {
            return initialState;
        }
        default:
        {
            return state
        }
    }
};

export default user;
