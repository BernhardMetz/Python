import React from 'react';

export const HomeAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/apps/home',
            component: React.lazy(() => import('./HomeApp'))
        }
    ]
};
