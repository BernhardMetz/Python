import React from 'react';
import { Redirect } from 'react-router-dom';

export const UserAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/user/users/:userId/:userHandle?',
            component: React.lazy(() => import('./user/User'))
        },
        {
            path     : '/apps/user/users',
            component: React.lazy(() => import('./users/Users'))
        },
        {
            path     : '/apps/user',
            component: () => <Redirect to="/apps/user/users"/>
        }
    ]
};
