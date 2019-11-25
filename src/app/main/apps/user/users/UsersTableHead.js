import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TableHead, TableSortLabel, TableCell, TableRow, Checkbox, Tooltip, IconButton, Icon, Menu, MenuList, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

import * as Actions from '../store/actions';

const rows = [
    {
        id            : 'id',
        align         : 'left',
        disablePadding: false,
        label         : 'Id',
        sort          : true
    },
    {
        id            : 'name',
        align         : 'left',
        disablePadding: false,
        label         : 'Name',
        sort          : true
    },
    {
        id            : 'mail',
        align         : 'left',
        disablePadding: false,
        label         : 'E-mail',
        sort          : true
    },
    {
        id            : 'phone',
        align         : 'left',
        disablePadding: false,
        label         : 'Phone',
        sort          : true
    },
    {
        id            : 'company',
        align         : 'left',
        disablePadding: false,
        label         : 'Company',
        sort          : true
    },
    {
        id            : 'type',
        align         : 'left',
        disablePadding: false,
        label         : 'Type',
        sort          : true
    },
    {
        id            : 'carLimit',
        align         : 'left',
        disablePadding: false,
        label         : 'Car Limit',
        sort          : true
    },
    {
        id            : 'plate',
        align         : 'left',
        disablePadding: false,
        label         : 'Plate',
        sort          : true
    },
    {
        id            : 'plate2',
        align         : 'left',
        disablePadding: false,
        label         : 'Plate 2',
        sort          : true
    },
    {
        id            : 'plate3',
        align         : 'left',
        disablePadding: false,
        label         : 'Plate 3',
        sort          : true
    },
    {
        id            : 'area',
        align         : 'left',
        disablePadding: false,
        label         : 'Area',
        sort          : true
    }
];

const useStyles = makeStyles(theme => ({
    actionsButtonWrapper: {
        background: theme.palette.background.paper
    }
}));

function UsersTableHead(props)
{
    const dispatch = useDispatch();

    const classes = useStyles(props);
    const [selectedUsersMenu, setSelectedUsersMenu] = useState(null);

    const createSortHandler = property => event => {
        props.onRequestSort(event, property);
    };

    function openSelectedUsersMenu(event)
    {
        setSelectedUsersMenu(event.currentTarget);
    }

    function closeSelectedUsersMenu()
    {
        setSelectedUsersMenu(null);
    }

    function onMultipleRemove()
    {
        setSelectedUsersMenu(null);

        dispatch(Actions.multipleDeleteUsers(props.selected));
    }

    return (
        <TableHead>
            <TableRow className="h-64">
                <TableCell padding="checkbox" className="relative pl-4 sm:pl-12">
                    <Checkbox
                        indeterminate={props.numSelected > 0 && props.numSelected < props.rowCount}
                        checked={props.numSelected === props.rowCount}
                        onChange={props.onSelectAllClick}
                    />
                    { props.numSelected > 0 && (
                        <div className={clsx("flex items-center justify-center absolute w-64 top-0 left-0 ml-68 h-64 z-10", classes.actionsButtonWrapper)}>
                            <IconButton
                                aria-owns={selectedUsersMenu ? 'selectedUsersMenu' : null}
                                aria-haspopup="true"
                                onClick={openSelectedUsersMenu}
                            >
                                <Icon>more_horiz</Icon>
                            </IconButton>
                            <Menu
                                id="selectedUsersMenu"
                                anchorEl={selectedUsersMenu}
                                open={Boolean(selectedUsersMenu)}
                                onClose={closeSelectedUsersMenu}
                            >
                                <MenuList>
                                    <MenuItem
                                        onClick={() => {
                                            onMultipleRemove();
                                        }}
                                    >
                                        <ListItemIcon className="min-w-40">
                                            <Icon>delete</Icon>
                                        </ListItemIcon>
                                        <ListItemText primary="Remove"/>
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </div>
                    )}
                </TableCell>
                { rows.map(row => {
                    return (
                        <TableCell
                            key={row.id}
                            align={row.align}
                            padding={row.disablePadding ? 'none' : 'default'}
                            sortDirection={props.order.id === row.id ? props.order.direction : false}
                        >
                            {row.sort && (
                                <Tooltip
                                    title="Sort"
                                    placement={row.align === "right" ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={props.order.id === row.id}
                                        direction={props.order.direction}
                                        onClick={createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            )}
                        </TableCell>
                    );
                }, this)}
            </TableRow>
        </TableHead>
    );
}

export default UsersTableHead;
