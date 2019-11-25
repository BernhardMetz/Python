import React from 'react';
import { Redirect } from 'react-router-dom';
import { FuseUtils } from '@fuse';

import { appsConfigs } from 'app/main/apps/appsConfigs';
import { LoginConfig } from 'app/main/login/LoginConfig';

const routeConfigs = [
    ...appsConfigs,
    LoginConfig
];

const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin', 'staff', 'user']),
    {
        path     : '/',
        exact    : true,
        component: () => <Redirect to="/apps/home"/>
    },
    {
        component: () => <Redirect to="/apps/home"/>
    }
];

export default routes;
