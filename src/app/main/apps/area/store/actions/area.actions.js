import axios from 'axios';
// import { FuseUtils } from '@fuse';
import { showMessage } from 'app/store/actions/fuse';

import jwtService from 'app/services/jwtService';

export const GET_AREA = '[AREA APP] GET AREA';
export const SAVE_AREA = '[AREA APP] SAVE AREA';

export const OPEN_NEW_AREA_DIALOG = '[AREA APP] OPEN NEW AREA DIALOG';
export const CLOSE_NEW_AREA_DIALOG = '[AREA APP] CLOSE NEW AREA DIALOG';

export const OPEN_EDIT_AREA_DIALOG = '[AREA APP] OPEN EDIT AREA DIALOG';
export const CLOSE_EDIT_AREA_DIALOG = '[AREA APP] CLOSE EDIT AREA DIALOG';

export function getArea(params)
{
    const request = axios.get('/api/area/area', { params });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_AREA,
                payload: response.data
            })
        );
}

export function saveArea(data)
{
    let reqUrl = process.env.REACT_APP_BACKEND_URL + '/api/areas';
    if (data.id && data.id > 0) {
        reqUrl += '/' + data.id;
    }
    reqUrl += '?token=' + jwtService.getAccessToken();

    const request = axios.post(reqUrl, data);
    
    return (dispatch) =>
        request.then((response) => {
                dispatch(showMessage({message: 'Area Saved!'}));

                return dispatch({
                    type   : SAVE_AREA,
                    payload: response.data
                })
            }
        ).catch(error => {
            dispatch(showMessage({message: 'Failed to save area!'}));
        });
}

export function deleteArea(areaId)
{
    let reqUrl = process.env.REACT_APP_BACKEND_URL + '/api/areas/' + areaId + '/delete?token=' + jwtService.getAccessToken();;
    const request = axios.post(reqUrl);

    return (dispatch) =>
        request.then((response) => {
                dispatch(showMessage({message: 'Area Deleted!'}));
            }
        ).catch(error => {
            dispatch(showMessage({message: 'Failed to delete area!'}));
        });
}

export function multipleDeleteAreas(areaIds)
{
    let reqUrl = process.env.REACT_APP_BACKEND_URL + '/api/areas';
    if (areaIds && areaIds.length > 0) {
        reqUrl += '/' + areaIds[0];
    }
    reqUrl += '/delete?token=' + jwtService.getAccessToken();

    const request = axios.post(reqUrl);

    return (dispatch) =>
        request.then((response) => {
                dispatch(showMessage({message: 'Area Deleted!'}));
            }
        ).catch(error => {
            dispatch(showMessage({message: 'Failed to delete area!'}));
        });
}

export function newArea()
{
    const data = {
        id              : 0, // FuseUtils.generateGUID(),
        name            : '',
        total           : 0,
        active          : 0
    };

    return {
        type   : GET_AREA,
        payload: data
    }
}

export function openNewAreaDialog()
{
    return {
        type: OPEN_NEW_AREA_DIALOG
    }
}

export function closeNewAreaDialog()
{
    return {
        type: CLOSE_NEW_AREA_DIALOG
    }
}

export function openEditAreaDialog(data)
{
    return {
        type: OPEN_EDIT_AREA_DIALOG,
        data
    }
}

export function closeEditAreaDialog()
{
    return {
        type: CLOSE_EDIT_AREA_DIALOG
    }
}
