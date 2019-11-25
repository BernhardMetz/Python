import React, { useEffect, useState } from 'react';
import { Button, Tab, Tabs, TextField, Icon, Typography } from '@material-ui/core';
import { FuseAnimate, FusePageCarded, FuseChipSelect, FuseLoading } from '@fuse';
import { useForm } from '@fuse/hooks';
import { Link } from 'react-router-dom';
import _ from '@lodash';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';

function Company(props)
{
    const dispatch = useDispatch();
    const company = useSelector(({companyApp}) => companyApp.company);

    const [tabValue, setTabValue] = useState(0);
    const {form, handleChange, setForm} = useForm(null);

    useEffect(() => {
        function updateCompanyState()
        {
            const params = props.match.params;
            const { companyId } = params;

            if (companyId === 'new') {
                dispatch(Actions.newCompany());
            } else {
                dispatch(Actions.getCompany(props.match.params));
            }
        }

        updateCompanyState();
    }, [dispatch, props.match.params]);

    useEffect(() => {
        if (
            (company.data && !form) ||
            (company.data && form && company.data.id !== form.id)
        )
        {
            setForm(company.data);
        }
    }, [form, company.data, setForm]);

    function handleChangeTab(event, tabValue)
    {
        setTabValue(tabValue);
    }

    function handleChipChange(value, name)
    {
        setForm(_.set({...form}, name, value.map(item => item.value)));
    }

    function canBeSubmitted()
    {
        return (
            form.name.length > 0 &&
            !_.isEqual(company.data, form)
        );
    }

    if ( (!company.data || (company.data && props.match.params.companyId !== company.data.id)) && props.match.params.companyId !== 'new' ) {
        return <FuseLoading/>;
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
                                <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/apps/company/companies" color="inherit">
                                    <Icon className="mr-4 text-20">arrow_back</Icon>
                                    Companies
                                </Typography>
                            </FuseAnimate>

                            <div className="flex items-center max-w-full">
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    { form.images && form.images.length > 0 && form.featuredImageId ? (
                                        <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src={_.find(form.images, {id: form.featuredImageId}).url} alt={form.name}/>
                                    ) : (
                                        <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src="assets/images/company/company-image-placeholder.png" alt={form.name}/>
                                    ) }
                                </FuseAnimate>
                                <div className="flex flex-col min-w-0">
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography className="text-16 sm:text-20 truncate">
                                            {form.name ? form.name : 'New Company'}
                                        </Typography>
                                    </FuseAnimate>
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography variant="caption">Company Detail</Typography>
                                    </FuseAnimate>
                                </div>
                            </div>
                        </div>
                        <FuseAnimate animation="transition.slideRightIn" delay={300}>
                            <Button
                                className="whitespace-no-wrap"
                                variant="contained"
                                disabled={!canBeSubmitted()}
                                onClick={() => dispatch(Actions.saveCompany(form))}
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
                                    id="description"
                                    name="description"
                                    onChange={handleChange}
                                    label="Description"
                                    type="text"
                                    value={form.description}
                                    multiline
                                    rows={5}
                                    variant="outlined"
                                    fullWidth
                                />

                                <FuseChipSelect
                                    className="mt-8 mb-24"
                                    value={
                                        form.categories && form.categories.map(item => ({
                                            value: item,
                                            label: item
                                        }))
                                    }
                                    onChange={(value) => handleChipChange(value, 'categories')}
                                    placeholder="Select multiple categories"
                                    textFieldProps={{
                                        label          : 'Categories',
                                        InputLabelProps: {
                                            shrink: true
                                        },
                                        variant        : 'outlined'
                                    }}
                                    isMulti
                                />

                                <FuseChipSelect
                                    className="mt-8 mb-16"
                                    value={
                                        form.tags && form.tags.map(item => ({
                                            value: item,
                                            label: item
                                        }))
                                    }
                                    onChange={(value) => handleChipChange(value, 'tags')}
                                    placeholder="Select multiple tags"
                                    textFieldProps={{
                                        label          : 'Tags',
                                        InputLabelProps: {
                                            shrink: true
                                        },
                                        variant        : 'outlined'
                                    }}
                                    isMulti
                                />
                            </div>
                        ) }
                    </div>
                )
            }
            innerScroll
        />
    )
}

export default withReducer('companyApp', reducer)(Company);