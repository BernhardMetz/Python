import React, { useEffect, useCallback } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar, FormControlLabel, Switch } from '@material-ui/core';
import { useForm} from '@fuse/hooks';
import * as Actions from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';

const defaultFormState = {
    id: 0,
    name: '',
    total: 0,
    active: 1
};

function AreaDialog(props)
{
    const IOSSwitch = withStyles(theme => ({
        root: {
            width: 42,
            height: 26,
            padding: 0,
            margin: theme.spacing(1),
        },
        switchBase: {
            padding: 1,
            '&$checked': {
                transform: 'translateX(16px)',
                color: theme.palette.common.white,
                '& + $track': {
                    backgroundColor: '#52d869',
                    opacity: 1,
                    border: 'none',
                },
            },
            '&$focusVisible $thumb': {
                color: '#52d869',
                border: '6px solid #fff',
            },
        },
        thumb: {
            width: 24,
            height: 24,
        },
        track: {
            borderRadius: 26 / 2,
            border: `1px solid ${theme.palette.grey[400]}`,
            backgroundColor: theme.palette.grey[50],
            opacity: 1,
            transition: theme.transitions.create(['background-color', 'border']),
        },
        checked: {},
        focusVisible: {},
    }))(({ classes, ...props }) => {
        return (
            <Switch
                focusVisibleClassName={classes.focusVisible}
                disableRipple
                classes={{
                    root: classes.root,
                    switchBase: classes.switchBase,
                    thumb: classes.thumb,
                    track: classes.track,
                    checked: classes.checked,
                }}
                {...props}
            />
        );
    });

    const dispatch = useDispatch();
    const areaDialog = useSelector(({areaApp}) => areaApp.area.areaDialog);

    const { form, handleChange, setForm } = useForm(defaultFormState);

    const [activeStatus, setActiveStatus] = React.useState(true);
    
    const handleToggle = event => {
        setActiveStatus(event.target.checked);
    };

    const initDialog = useCallback(
        () => {
            /**
             * Dialog type: 'edit'
             */
            if (areaDialog.type === 'edit' && areaDialog.data) {
                setForm({...areaDialog.data});
                setActiveStatus(areaDialog.data.active);
            }

            /**
             * Dialog type: 'new'
             */
            if (areaDialog.type === 'new') {
                setForm({
                    ...defaultFormState,
                    ...areaDialog.data,
                    id: 0
                });
            }
        },
        [areaDialog.data, areaDialog.type, setForm],
    );

    useEffect(() => {
        /**
         * After Dialog Open
         */
        if (areaDialog.props.open) {
            initDialog();
        }

    }, [areaDialog.props.open, initDialog]);

    function closeComposeDialog()
    {
        areaDialog.type === 'edit' ? dispatch(Actions.closeEditAreaDialog()) : dispatch(Actions.closeNewAreaDialog());
    }

    function canBeSubmitted()
    {
        return (
            form.name && form.name.length > 0 &&
            form.total && form.total > 0
        );
    }

    function handleSubmit(event)
    {
        event.preventDefault();

        form.active = activeStatus;
        
        dispatch(Actions.saveArea(form));
        closeComposeDialog();
    }

    function handleRemove()
    {
        // dispatch(Actions.removeArea(form.id));
        closeComposeDialog();
    }

    return (
        <Dialog
            classes={{
                paper: "m-24"
            }}
            {...areaDialog.props}
            onClose={closeComposeDialog}
            fullWidth
            maxWidth="xs"
        >

            <AppBar position="static" elevation={1}>
                <Toolbar className="flex w-full">
                    <Typography variant="subtitle1" color="inherit">
                        { areaDialog.type === 'new' ? 'New Area' : 'Edit Area' }
                    </Typography>
                </Toolbar>
            </AppBar>
            <form noValidate onSubmit={handleSubmit} className="flex flex-col md:overflow-hidden">
                <DialogContent classes={{root: "p-24"}}>
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">account_circle</Icon>
                        </div>

                        <TextField
                            className="mb-24"
                            label="Name"
                            autoFocus
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">note_add</Icon>
                        </div>
                        <TextField
                            className="mb-24"
                            label="Total"
                            id="total"
                            name="total"
                            value={form.total}
                            onChange={handleChange}
                            variant="outlined"
                            type="number"
                            inputProps={{ min: 0, step: 1 }}
                            required
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">visibility</Icon>
                        </div>
                        <FormControlLabel
                            className="mt-6 ml-6"
                            control={
                            <IOSSwitch
                                checked={activeStatus}
                                onChange={handleToggle}
                                value="activeStatus"
                            />
                            }
                            label="Visibility"
                        />
                    </div>
                </DialogContent>

                { areaDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            type="submit"
                            disabled={!canBeSubmitted()}
                        >
                            Add
                        </Button>
                    </DialogActions>
                ) : (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={handleSubmit}
                            disabled={!canBeSubmitted()}
                        >
                            Save
                        </Button>
                        <IconButton
                            onClick={handleRemove}
                        >
                            <Icon>delete_forever</Icon>
                        </IconButton>
                    </DialogActions>
                )}
            </form>
        </Dialog>
    );
}

export default AreaDialog;
