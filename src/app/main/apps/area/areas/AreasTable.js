import React, { useEffect, useState } from 'react';
import { 
    Table, TableBody, TableCell, TablePagination, TableRow,
    Checkbox, IconButton, DialogTitle, DialogContent, 
    DialogContentText, DialogActions, Button, Icon } from '@material-ui/core';
import { FuseScrollbars, FuseLoading } from '@fuse';
import { withRouter} from 'react-router-dom';
import _ from '@lodash';
import AreasTableHead from './AreasTableHead';
import * as Actions from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';

import jwtService from 'app/services/jwtService';
import { SUPER_ADMIN, ADMIN } from 'app/consts';

import * as GlobalActions from 'app/store/actions';

function AreasTable(props)
{
    const dispatch = useDispatch();

    const areas = useSelector(({areaApp}) => areaApp.areas.data);
    const recordsTotal = useSelector(({areaApp}) => areaApp.areas.recordsTotal);

    const searchText = useSelector(({areaApp}) => areaApp.areas.searchText);

    const [selected, setSelected] = useState([]);
    const [data, setData] = useState(areas);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState({
        direction: 'asc',
        id       : null
    });

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
        const searchParams = {
            page: page,
            limit: rowsPerPage,
            orderBy: order.id,
            order: order.direction === 'desc' ? 0 : 1
        };
        dispatch(Actions.getAreas(searchParams));
    }, [page, order, rowsPerPage, dispatch]);

    useEffect(() => {
        setData(searchText.length === 0 ? areas : _.filter(areas, item => item.name.toLowerCase().includes(searchText.toLowerCase())))
    }, [areas, searchText]);

    function handleRequestSort(event, property)
    {
        const id = property;
        let direction = 'desc';

        if (order.id === property && order.direction === 'desc') {
            direction = 'asc';
        }

        setOrder({
            direction,
            id
        });
    }

    function handleSelectAllClick(event)
    {
        if (event.target.checked) {
            setSelected(data.map(n => n.id));
            return;
        }
        setSelected([]);
    }

    function handleClick(item)
    {
        dispatch(Actions.openEditAreaDialog(item));
    }

    function handleCheck(event, id)
    {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    }

    function handleChangePage(event, page)
    {
        setData([]);
        setPage(page);
    }

    function handleChangeRowsPerPage(event)
    {
        setData([]);
        setPage(0);
        setRowsPerPage(event.target.value);
    }

    if (!data || data.length === 0) {
        return <FuseLoading />;
    }

    return (
        <div className="w-full flex flex-col">

            <FuseScrollbars className="flex-grow overflow-x-auto">

                <Table className="min-w-xl" aria-labelledby="tableTitle">

                    <AreasTableHead
                        numSelected={selected.length}
                        selected={selected}
                        order={order}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={data.length}
                    />

                    <TableBody>
                        {_.orderBy(data, [
                            (o) => {
                                return o[order.id];
                            }
                        ], [order.direction])
                            .map(n => {
                                const isSelected = selected.indexOf(n.id) !== -1;
                                return (
                                    <TableRow
                                        className="h-64 cursor-pointer"
                                        hover
                                        role="checkbox"
                                        aria-checked={isSelected}
                                        tabIndex={-1}
                                        key={n.id}
                                        selected={isSelected}
                                        onClick={event => handleClick(n)}
                                    >
                                        <TableCell className="w-48 px-4 sm:px-12" padding="checkbox">
                                            <Checkbox
                                                checked={isSelected}
                                                onClick={event => event.stopPropagation()}
                                                onChange={event => handleCheck(event, n.id)}
                                            />
                                        </TableCell>

                                        <TableCell component="th" scope="row">
                                            { n.id }
                                        </TableCell>

                                        <TableCell component="th" scope="row">
                                            { n.name }
                                        </TableCell>

                                        <TableCell component="th" scope="row">
                                            { n.total }
                                        </TableCell>

                                        <TableCell component="th" scope="row">
                                            <div className="flex items-right">
                                                <IconButton
                                                    onClick={(ev) => {
                                                        ev.stopPropagation();

                                                        dispatch(GlobalActions.openDialog({
                                                            children: (
                                                                <React.Fragment>
                                                                    <DialogTitle id="alert-dialog-title">Confirm</DialogTitle>
                                                                    <DialogContent>
                                                                        <DialogContentText id="alert-dialog-description">
                                                                            Are you sure to remove this area?
                                                                        </DialogContentText>
                                                                    </DialogContent>
                                                                    <DialogActions>
                                                                        <Button
                                                                            onClick={(ev) => {
                                                                                    ev.stopPropagation();
                                                                                    dispatch(GlobalActions.closeDialog());
                                                                                    dispatch(Actions.deleteArea(n.id));
                                                                                }
                                                                            }
                                                                            color="primary"
                                                                        >
                                                                            Yes
                                                                        </Button>
                                                                        <Button
                                                                            onClick={(ev) => {
                                                                                    ev.stopPropagation();
                                                                                    dispatch(GlobalActions.closeDialog());
                                                                                }
                                                                            }
                                                                            color="primary" autoFocus
                                                                        >
                                                                            No
                                                                        </Button>
                                                                    </DialogActions>
                                                                </React.Fragment>
                                                            )
                                                        }))
                                                    }}
                                                >
                                                    <Icon>delete</Icon>
                                                </IconButton>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </FuseScrollbars>

            <TablePagination
                component="div"
                count={recordsTotal}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'Previous Page'
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page'
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    );
}

export default withRouter(AreasTable);
