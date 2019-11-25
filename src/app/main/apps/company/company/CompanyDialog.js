import React, { useEffect, useCallback } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar } from '@material-ui/core';
import { useForm} from '@fuse/hooks';
import * as Actions from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';

const defaultFormState = {
    id: 0,
    name: '',
    total: 0,
    categ: 0,
    categ2: 0,
    categ3: 0,
    categ4: 0,
    categ5: 0,
    categ6: 0,
    categ7: 0,
    categ8: 0,
    categ9: 0,
    categ10: 0,
    categ11: 0,
    categ12: 0
};

function CompanyDialog(props)
{
    const dispatch = useDispatch();
    const companyDialog = useSelector(({companyApp}) => companyApp.company.companyDialog);

    const { form, handleChange, setForm } = useForm(defaultFormState);

    const initDialog = useCallback(
        () => {
            /**
             * Dialog type: 'edit'
             */
            if (companyDialog.type === 'edit' && companyDialog.data) {
                setForm({...companyDialog.data});
            }

            /**
             * Dialog type: 'new'
             */
            if (companyDialog.type === 'new') {
                setForm({
                    ...defaultFormState,
                    ...companyDialog.data,
                    id: 0
                });
            }
        },
        [companyDialog.data, companyDialog.type, setForm],
    );

    useEffect(() => {
        /**
         * After Dialog Open
         */
        if (companyDialog.props.open) {
            initDialog();
        }

    }, [companyDialog.props.open, initDialog]);

    function closeComposeDialog()
    {
        companyDialog.type === 'edit' ? dispatch(Actions.closeEditCompanyDialog()) : dispatch(Actions.closeNewCompanyDialog());
    }

    function canBeSubmitted()
    {
        return (
            form.name && form.name.length > 0 &&
            form.total && form.total > 0 &&
            form.categ && form.categ > 0
        );
    }

    function handleSubmit(event)
    {
        event.preventDefault();
        
        dispatch(Actions.saveCompany(form));
        closeComposeDialog();
    }

    function handleRemove()
    {
        // dispatch(Actions.removeCompany(form.id));
        closeComposeDialog();
    }

    return (
        <Dialog
            classes={{
                paper: "m-24"
            }}
            {...companyDialog.props}
            onClose={closeComposeDialog}
            fullWidth
            maxWidth="xs"
        >

            <AppBar position="static" elevation={1}>
                <Toolbar className="flex w-full">
                    <Typography variant="subtitle1" color="inherit">
                        { companyDialog.type === 'new' ? 'New Company' : 'Edit Company' }
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
                        </div>
                        <TextField
                            className="mb-24"
                            label="Category"
                            id="categ"
                            name="categ"
                            value={form.categ}
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
                        </div>
                        <TextField
                            className="mb-24"
                            label="Category 2"
                            id="categ2"
                            name="categ2"
                            value={form.categ2}
                            onChange={handleChange}
                            variant="outlined"
                            type="number"
                            inputProps={{ min: 0, step: 1 }}
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                        </div>
                        <TextField
                            className="mb-24"
                            label="Category 3"
                            id="categ3"
                            name="categ3"
                            value={form.categ3}
                            onChange={handleChange}
                            variant="outlined"
                            type="number"
                            inputProps={{ min: 0, step: 1 }}
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                        </div>
                        <TextField
                            className="mb-24"
                            label="Category 4"
                            id="categ4"
                            name="categ4"
                            value={form.categ4}
                            onChange={handleChange}
                            variant="outlined"
                            type="number"
                            inputProps={{ min: 0, step: 1 }}
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                        </div>
                        <TextField
                            className="mb-24"
                            label="Category 5"
                            id="categ5"
                            name="categ5"
                            value={form.categ5}
                            onChange={handleChange}
                            variant="outlined"
                            type="number"
                            inputProps={{ min: 0, step: 1 }}
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                        </div>
                        <TextField
                            className="mb-24"
                            label="Category 6"
                            id="categ6"
                            name="categ6"
                            value={form.categ6}
                            onChange={handleChange}
                            variant="outlined"
                            type="number"
                            inputProps={{ min: 0, step: 1 }}
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                        </div>
                        <TextField
                            className="mb-24"
                            label="Category 7"
                            id="categ7"
                            name="categ7"
                            value={form.categ7}
                            onChange={handleChange}
                            variant="outlined"
                            type="number"
                            inputProps={{ min: 0, step: 1 }}
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                        </div>
                        <TextField
                            className="mb-24"
                            label="Category 8"
                            id="categ8"
                            name="categ8"
                            value={form.categ8}
                            onChange={handleChange}
                            variant="outlined"
                            type="number"
                            inputProps={{ min: 0, step: 1 }}
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                        </div>
                        <TextField
                            className="mb-24"
                            label="Category 9"
                            id="categ9"
                            name="categ9"
                            value={form.categ9}
                            onChange={handleChange}
                            variant="outlined"
                            type="number"
                            inputProps={{ min: 0, step: 1 }}
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                        </div>
                        <TextField
                            className="mb-24"
                            label="Category 10"
                            id="categ10"
                            name="categ10"
                            value={form.categ10}
                            onChange={handleChange}
                            variant="outlined"
                            type="number"
                            inputProps={{ min: 0, step: 1 }}
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                        </div>
                        <TextField
                            className="mb-24"
                            label="Category 11"
                            id="categ11"
                            name="categ11"
                            value={form.categ11}
                            onChange={handleChange}
                            variant="outlined"
                            type="number"
                            inputProps={{ min: 0, step: 1 }}
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                        </div>
                        <TextField
                            className="mb-24"
                            label="Category 12"
                            id="categ12"
                            name="categ12"
                            value={form.categ12}
                            onChange={handleChange}
                            variant="outlined"
                            type="number"
                            inputProps={{ min: 0, step: 1 }}
                            fullWidth
                        />
                    </div>
                </DialogContent>

                { companyDialog.type === 'new' ? (
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

export default CompanyDialog;
