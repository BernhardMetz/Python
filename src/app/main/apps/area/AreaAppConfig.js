import React from 'react';
import { Redirect } from 'react-router-dom';

export const AreaAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/area/areas/:areaId/:areaHandle?',
            component: React.lazy(() => import('./area/Area'))
        },
        {
            path     : '/apps/area/areas',
            component: React.lazy(() => import('./areas/Areas'))
        },
        {
            path     : '/apps/area',
            component: () => <Redirect to="/apps/area/areas"/>
        }
    ]
};
