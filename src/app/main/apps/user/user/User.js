import React, { useEffect, useState } from 'react';
import { Button, Tab, Tabs, TextField, Icon, Typography, FormControl, InputLabel, Select, Input, MenuItem, Checkbox, ListItemText } from '@material-ui/core';

import { FuseAnimate, FusePageCarded, FuseLoading } from '@fuse';
import { useForm } from '@fuse/hooks';
import { Link } from 'react-router-dom';

import _ from '@lodash';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import jwtService from 'app/services/jwtService';
import * as Actions from '../store/actions';
import * as AreaActions from '../../area/store/actions';
import * as CompanyActions from '../../company/store/actions';
import * as GlobalActions from 'app/store/actions';
import reducer from '../store/reducers';

import { SUPER_ADMIN, ADMIN } from 'app/consts';

function User(props)
{
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        }
    };

    const dispatch = useDispatch();

    const authUser = useSelector(state => state.auth.user);
    const user = useSelector(({userApp}) => userApp.user);
    const areas = useSelector(state => state.global.areas.data);
    const companies = useSelector(state => state.global.companies.data);
    
    let types = [];
    if (authUser.type === SUPER_ADMIN) {
        types.push({ id: 1, name: 'super admin' });
    }

    types.push({ id: 2, name: 'admin' });
    types.push({ id: 3, name: 'user' });
    
    const [tabValue, setTabValue] = useState(0);
    const { form, handleChange, setForm } = useForm(null);

    useEffect(() => {
        if (jwtService.getUserType() === ADMIN) {
            dispatch(GlobalActions.removeNavigationItem('company'));
            dispatch(GlobalActions.removeNavigationItem('area'));
        } else if (jwtService.getUserType() !== SUPER_ADMIN && jwtService.getUserType() !== ADMIN) {
            dispatch(GlobalActions.removeNavigationItem('user'));
            dispatch(GlobalActions.removeNavigationItem('company'));
            dispatch(GlobalActions.removeNavigationItem('area'));
        }
    });

    useEffect(() => {
        function updateUserState()
        {
            const params = props.match.params;
            const { userId } = params;

            if (userId === 'new') {
                dispatch(Actions.newUser());
            } else {
                dispatch(Actions.getUser(userId));
            }
        }

        updateUserState();
    }, [dispatch, props.match.params]);

    useEffect(() => {
        const searchParams = {
            page: 0,
            limit: 100,
            orderBy: null,
            order: 0
        };
        dispatch(CompanyActions.getCompanies(searchParams));
    }, [dispatch]);

    useEffect(() => {
        const searchParams = {
            page: 0,
            limit: 100,
            orderBy: null,
            order: 0
        };
        dispatch(AreaActions.getAreas(searchParams));
    }, [dispatch]);

    useEffect(() => {
        const params = props.match.params;
        const { userId } = params;

        if (
            (user.data && !form) ||
            (user.data && form && user.data.id !== form.id && userId !== 'new')
        )
        {
            setForm(user.data);
        }
    }, [form, user.data, setForm, props.match.params]);

    function handleChangeTab(event, tabValue)
    {
        setTabValue(tabValue);
    }

    function canBeSubmitted()
    {
        return (
            form.name && form.name.length > 0 &&
            form.mail && form.mail.length > 0 &&
            form.password && form.password.length > 0 &&
            form.phone && form.phone.length > 0 &&
            form.plateLimit && form.plateLimit.length > 0 &&
            form.plate && form.plate.length > 0 &&
            form.plate2 && form.plate2.length > 0 &&
            form.plate3 && form.plate3.length > 0 &&
            form.area && form.area.length > 0 &&
            form.userType &&
            !_.isEqual(user.data, form)
        );
    }

    if (!user.data && props.match.params.userId !== 'new') {
        return <FuseLoading />;
    }

    return (
        <FusePageCarded
            classes={{
                toolbar: "p-0",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                form && (
                    <div className="flex flex-1 w-full items-center justify-between">

                        <div className="flex flex-col items-start max-w-full">

                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/apps/user/users" color="inherit">
                                    <Icon className="mr-4 text-20">arrow_back</Icon>
                                    Users
                                </Typography>
                            </FuseAnimate>

                            <div className="flex items-center max-w-full">
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    { form.images && form.images.length > 0 && form.featuredImageId ? (
                                        <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src={_.find(form.images, {id: form.featuredImageId}).url} alt={form.name}/>
                                    ) : (
                                        <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src="assets/images/user/user-image-placeholder.png" alt={form.name}/>
                                    ) }
                                </FuseAnimate>
                                <div className="flex flex-col min-w-0">
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography className="text-16 sm:text-20 truncate">
                                            {form.name ? form.name : 'New User'}
                                        </Typography>
                                    </FuseAnimate>
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography variant="caption">User Detail</Typography>
                                    </FuseAnimate>
                                </div>
                            </div>
                        </div>
                        <FuseAnimate animation="transition.slideRightIn" delay={300}>
                            <Button
                                className="whitespace-no-wrap"
                                variant="contained"
                                disabled={!canBeSubmitted()}
                                onClick={() => dispatch(Actions.saveUser(form))}
                            >
                                Save
                            </Button>
                        </FuseAnimate>
                    </div>
                )
            }
            contentToolbar={
                <Tabs
                    value={tabValue}
                    onChange={handleChangeTab}
                    indicatorColor="secondary"
                    textColor="secondary"
                    variant="scrollable"
                    scrollButtons="auto"
                    classes={{root: "w-full h-64"}}
                >
                    <Tab className="h-64 normal-case" label="Basic Info"/>
                </Tabs>
            }
            content={
                form && (
                    <div className="p-16 sm:p-24 max-w-2xl">
                        { tabValue === 0 &&
                        (
                            <div>

                                <TextField
                                    className="mt-8 mb-16"
                                    error={form.name === ''}
                                    required
                                    label="Name"
                                    autoFocus
                                    id="name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                />

                                <TextField
                                    className="mt-8 mb-16"
                                    error={form.mail === ''}
                                    required
                                    label="E-mail"
                                    id="mail"
                                    name="mail"
                                    value={form.mail}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                />

                                <TextField
                                    className="mt-8 mb-16"
                                    error={form.password === ''}
                                    required
                                    label="Password"
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                />

                                <TextField
                                    className="mt-8 mb-16"
                                    error={form.phone === ''}
                                    required
                                    label="Phone"
                                    id="phone"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                />

                                <TextField
                                    className="mt-8 mb-16"
                                    label="Plate Limit"
                                    id="plateLimit"
                                    name="plateLimit"
                                    value={form.plateLimit}
                                    onChange={handleChange}
                                    type="number"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    inputProps={{ min: "0", max: "3", step: "1" }}
                                />

                                <TextField
                                    className="mt-8 mb-16"
                                    error={form.plate === ''}
                                    required
                                    label="Plate"
                                    id="plate"
                                    name="plate"
                                    value={form.plate}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                />

                                <TextField
                                    className="mt-8 mb-16"
                                    error={form.plate2 === ''}
                                    required
                                    label="Plate 2"
                                    id="plate2"
                                    name="plate2"
                                    value={form.plate2}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                />

                                <TextField
                                    className="mt-8 mb-16"
                                    error={form.plate3 === ''}
                                    required
                                    label="Plate 3"
                                    id="plate3"
                                    name="plate3"
                                    value={form.plate3}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                />

                                <FormControl className='MuiFormControl-fullWidth mt-8 mb-16'>
                                    <InputLabel id="area-label">Area</InputLabel>
                                    <Select
                                        labelId="area-label"
                                        id="area"
                                        name="area"
                                        multiple
                                        value={form.area}
                                        onChange={handleChange}
                                        input={<Input />}
                                        renderValue={selected => selected.join(', ')}
                                        MenuProps={MenuProps}
                                        required
                                        fullWidth
                                        >
                                        { areas && areas.map(area => (
                                            <MenuItem key={area.id} value={area.id}>
                                                <Checkbox checked={(form.area && form.area.indexOf(area.id)) > -1} />
                                                <ListItemText primary={area.name} />
                                            </MenuItem>
                                        )) }
                                    </Select>
                                </FormControl>

                                { authUser.type === SUPER_ADMIN &&
                                    <FormControl className='MuiFormControl-fullWidth mt-8 mb-16'>
                                        <InputLabel id="company-label">Company</InputLabel>
                                        <Select
                                            labelId="company-label"
                                            id="company"
                                            name="company"
                                            value={form.company}
                                            onChange={handleChange}
                                            >
                                            { companies && companies.map(company => (
                                                <MenuItem key={company.id} value={company.id}>{company.name}</MenuItem>
                                            )) }
                                        </Select>
                                    </FormControl>
                                }

                                <FormControl className='MuiFormControl-fullWidth mt-8 mb-16'>
                                    <InputLabel id="user-type-label">User Type</InputLabel>
                                    <Select
                                        labelId="user-type-label"
                                        id="userType"
                                        name="userType"
                                        value={form.userType}
                                        required
                                        onChange={handleChange}
                                        >
                                        { types && types.map(type => (
                                            <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
                                        )) }
                                    </Select>
                                </FormControl>
                            </div>
                        ) }
                    </div>
                )
            }
            innerScroll
        />
    )
}

export default withReducer('userApp', reducer)(User);