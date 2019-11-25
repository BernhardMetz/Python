import React from 'react';
import { FusePageCarded } from '@fuse';
import withReducer from 'app/store/withReducer';
import CompaniesTable from './CompaniesTable';
import CompaniesHeader from './CompaniesHeader';
import reducer from '../store/reducers';
import CompanyDialog from '../company/CompanyDialog';

function Companies()
{
    return (
        <React.Fragment>
            <FusePageCarded
                classes={{
                    content: "flex",
                    header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header={
                    <CompaniesHeader/>
                }
                content={
                    <CompaniesTable/>
                }
                innerScroll
            />
            <CompanyDialog />
        </React.Fragment>
    );
}

export default withReducer('companyApp', reducer)(Companies);
