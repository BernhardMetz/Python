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
    }
];

const useStyles = makeStyles(theme => ({
    actionsButtonWrapper: {
        background: theme.palette.background.paper
    }
}));

function CompaniesTableHead(props)
{
    const dispatch = useDispatch();

    const classes = useStyles(props);
    const [selectedCompaniesMenu, setSelectedCompaniesMenu] = useState(null);

    const createSortHandler = property => event => {
        props.onRequestSort(event, property);
    };

    function openSelectedCompaniesMenu(event)
    {
        setSelectedCompaniesMenu(event.currentTarget);
    }

    function closeSelectedCompaniesMenu()
    {
        setSelectedCompaniesMenu(null);
    }

    function onMultipleRemove()
    {
        setSelectedCompaniesMenu(null);

        dispatch(Actions.multipleDeleteCompanies(props.selected));
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
                    {props.numSelected > 0 && (
                        <div className={clsx("flex items-center justify-center absolute w-64 top-0 left-0 ml-68 h-64 z-10", classes.actionsButtonWrapper)}>
                            <IconButton
                                aria-owns={selectedCompaniesMenu ? 'selectedCompaniesMenu' : null}
                                aria-haspopup="true"
                                onClick={openSelectedCompaniesMenu}
                            >
                                <Icon>more_horiz</Icon>
                            </IconButton>
                            <Menu
                                id="selectedCompaniesMenu"
                                anchorEl={selectedCompaniesMenu}
                                open={Boolean(selectedCompaniesMenu)}
                                onClose={closeSelectedCompaniesMenu}
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
                {rows.map(row => {
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

export default CompaniesTableHead;
