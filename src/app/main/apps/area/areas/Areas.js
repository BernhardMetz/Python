import React from 'react';
import { FusePageCarded } from '@fuse';
import withReducer from 'app/store/withReducer';
import AreasTable from './AreasTable';
import AreasHeader from './AreasHeader';
import reducer from '../store/reducers';
import AreaDialog from '../area/AreaDialog';

function Areas()
{
    return (
        <React.Fragment>
            <FusePageCarded
                classes={{
                    content: "flex",
                    header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header={
                    <AreasHeader/>
                }
                content={
                    <AreasTable/>
                }
                innerScroll
            />
            <AreaDialog />
        </React.Fragment>
    );
}

export default withReducer('areaApp', reducer)(Areas);
