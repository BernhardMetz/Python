import { authRoles } from 'app/auth';

import Login from './Login';
import ForgotPasswordPage from './ForgotPasswordPage';

export const LoginConfig = {
    settings: {
        layout: {
            config: {
                navbar        : {
                    display: false
                },
                toolbar       : {
                    display: false
                },
                footer        : {
                    display: false
                },
                leftSidePanel : {
                    display: false
                },
                rightSidePanel: {
                    display: false
                }
            }
        }
    },
    auth    : authRoles.onlyGuest,
    routes  : [
        {
            path     : '/login',
            component: Login
        },
        {
            path     : '/forgot-password',
            component: ForgotPasswordPage
        }
    ]
};

