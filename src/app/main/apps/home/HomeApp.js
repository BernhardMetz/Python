import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FusePageSimple, DemoContent } from '@fuse';

import store from 'app/store';

import jwtService from 'app/services/jwtService';
import { SUPER_ADMIN, ADMIN } from 'app/consts';

import * as GlobalActions from 'app/store/actions';

const styles = theme => ({
    layoutRoot: {}
});

class HomeApp extends Component {

    componentDidMount() {
        if (jwtService.getUserType() === ADMIN) {
            store.dispatch(GlobalActions.removeNavigationItem('company'));
            store.dispatch(GlobalActions.removeNavigationItem('area'));
        } else if (jwtService.getUserType() !== SUPER_ADMIN && jwtService.getUserType() !== ADMIN) {
            store.dispatch(GlobalActions.removeNavigationItem('user'));
            store.dispatch(GlobalActions.removeNavigationItem('company'));
            store.dispatch(GlobalActions.removeNavigationItem('area'));
        }
    }

    render()
    {
        const { classes } = this.props;

        return (
            <FusePageSimple
                classes={{
                    root: classes.layoutRoot
                }}
                header={
                    <div className="p-24"><h4>Home</h4></div>
                }
                contentToolbar={
                    <div className="px-24"><h4>Content Toolbar</h4></div>
                }
                content={
                    <div className="p-24">
                        <h4>Content</h4>
                        <br/>
                        <DemoContent/>
                    </div>
                }
            />
        )
    }
}

export default withStyles(styles, {withTheme: true})(HomeApp);