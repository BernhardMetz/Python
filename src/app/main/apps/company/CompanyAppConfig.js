import React from 'react';
import { Redirect } from 'react-router-dom';

export const CompanyAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/company/companies/:companyId/:companyHandle?',
            component: React.lazy(() => import('./company/Company'))
        },
        {
            path     : '/apps/company/companies',
            component: React.lazy(() => import('./companies/Companies'))
        },
        {
            path     : '/apps/company',
            component: () => <Redirect to="/apps/company/companies"/>
        }
    ]
};