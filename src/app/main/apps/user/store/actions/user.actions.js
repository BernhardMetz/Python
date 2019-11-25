import axios from 'axios';
// import { FuseUtils } from '@fuse';
import { showMessage } from 'app/store/actions/fuse';

import jwtService from 'app/services/jwtService';

export const GET_USER = '[USER APP] GET USER';
export const SAVE_USER = '[USER APP] SAVE USER';

export function getUser(userId)
{
    let reqUrl = process.env.REACT_APP_BACKEND_URL + '/api/users/' + userId + '?token=' + jwtService.getAccessToken();
    const request = axios.get(reqUrl);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_USER,
                payload: response.data
            })
        ).catch(error => {
            dispatch(showMessage({message: 'Failed to get user info!'}));
        });;
}

export function saveUser(data)
{
    let reqUrl = process.env.REACT_APP_BACKEND_URL + '/api/users';
    if (data.id) {
        reqUrl += '/' + data.id;
    }
    reqUrl += '?token=' + jwtService.getAccessToken();

    const request = axios.post(reqUrl, data);

    return (dispatch) =>
        request.then((response) => {
                dispatch(showMessage({message: 'User Saved!'}));

                return dispatch({
                    type   : SAVE_USER,
                    payload: response.data
                })
            }
        ).catch(error => {
            dispatch(showMessage({message: 'Failed to save user!'}));
        });
}

export function deleteUser(userId)
{
    let reqUrl = process.env.REACT_APP_BACKEND_URL + '/api/users/' + userId + '/delete?token=' + jwtService.getAccessToken();;
    const request = axios.post(reqUrl);

    return (dispatch) =>
        request.then((response) => {
                dispatch(showMessage({message: 'User Deleted!'}));
            }
        ).catch(error => {
            dispatch(showMessage({message: 'Failed to delete user!'}));
        });
}

export function multipleDeleteUsers(userIds)
{
    let reqUrl = process.env.REACT_APP_BACKEND_URL + '/api/users';
    if (userIds && userIds.length > 0) {
        reqUrl += '/' + userIds[0];
    }
    reqUrl += '/delete?token=' + jwtService.getAccessToken();

    const request = axios.post(reqUrl);

    return (dispatch) =>
        request.then((response) => {
                dispatch(showMessage({message: 'User Deleted!'}));
            }
        ).catch(error => {
            dispatch(showMessage({message: 'Failed to delete user!'}));
        });
}

export function newUser()
{
    const data = {
        // id              : FuseUtils.generateGUID(),
        name            : '',
        mail            : '',
        password        : '',
        phone           : '',
        plateLimit      : 0,
        plate           : '',
        plate2          : '',
        plate3          : '',
        area            : [],
        company         : '',
        userType        : 1,
        type            : 1,
        carLimit        : 0
    };

    return {
        type   : GET_USER,
        payload: data
    }
}
