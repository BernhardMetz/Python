import React from 'react';
import { Paper, Button, Input, Icon, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';

function CompaniesHeader(props)
{
    const dispatch = useDispatch();
    const searchText = useSelector(({companyApp}) => companyApp.companies.searchText);
    const mainTheme = useSelector(({fuse}) => fuse.settings.mainTheme);

    return (
        <div className="flex flex-1 w-full items-center justify-between">

            <div className="flex items-center">
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <Icon className="text-32 mr-0 sm:mr-12">business</Icon>
                </FuseAnimate>
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography className="hidden sm:flex" variant="h6">Companies</Typography>
                </FuseAnimate>
            </div>

            <div className="flex flex-1 items-center justify-center px-12">

                <ThemeProvider theme={mainTheme}>
                    <FuseAnimate animation="transition.slideDownIn" delay={300}>
                        <Paper className="flex items-center w-full max-w-512 px-8 py-4 rounded-8" elevation={1}>

                            <Icon className="mr-8" color="action">search</Icon>

                            <Input
                                placeholder="Search"
                                className="flex flex-1"
                                disableUnderline
                                fullWidth
                                value={searchText}
                                inputProps={{
                                    'aria-label': 'Search'
                                }}
                                onChange={ev => dispatch(Actions.setCompaniesSearchText(ev))}
                            />
                        </Paper>
                    </FuseAnimate>
                </ThemeProvider>

            </div>
            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <Button 
                    className="whitespace-no-wrap"
                    variant="contained"
                    onClick={ev => dispatch(Actions.openNewCompanyDialog())}
                >
                    <span className="hidden sm:flex">Add New Company</span>
                    <span className="flex sm:hidden">New</span>
                </Button>
            </FuseAnimate>
        </div>
    );
}

export default CompaniesHeader;
