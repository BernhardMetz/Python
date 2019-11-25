import axios from 'axios';
// import { FuseUtils } from '@fuse';
import { showMessage } from 'app/store/actions/fuse';

import jwtService from 'app/services/jwtService';

export const GET_COMPANY = '[COMPANY APP] GET COMPANY';
export const SAVE_COMPANY = '[COMPANY APP] SAVE COMPANY';

export const OPEN_NEW_COMPANY_DIALOG = '[COMPANY APP] OPEN NEW COMPANY DIALOG';
export const CLOSE_NEW_COMPANY_DIALOG = '[COMPANY APP] CLOSE NEW COMPANY DIALOG';

export const OPEN_EDIT_COMPANY_DIALOG = '[COMPANY APP] OPEN EDIT COMPANY DIALOG';
export const CLOSE_EDIT_COMPANY_DIALOG = '[COMPANY APP] CLOSE EDIT COMPANY DIALOG';

export function getCompany(params)
{
    const request = axios.get('/api/company/company', { params });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_COMPANY,
                payload: response.data
            })
        );
}

export function saveCompany(data)
{
    let reqUrl = process.env.REACT_APP_BACKEND_URL + '/api/companies';
    if (data.id && data.id > 0) {
        reqUrl += '/' + data.id;
    }
    reqUrl += '?token=' + jwtService.getAccessToken();

    const request = axios.post(reqUrl, data);

    return (dispatch) =>
        request.then((response) => {
                dispatch(showMessage({message: 'Company Saved!'}));

                return dispatch({
                    type   : SAVE_COMPANY,
                    payload: response.data
                })
            }
        ).catch(error => {
            dispatch(showMessage({message: 'Failed to save company!'}));
        });
}

export function deleteCompany(companyId)
{
    let reqUrl = process.env.REACT_APP_BACKEND_URL + '/api/companies/' + companyId + '/delete?token=' + jwtService.getAccessToken();;
    const request = axios.post(reqUrl);

    return (dispatch) =>
        request.then((response) => {
                dispatch(showMessage({message: 'Company Deleted!'}));
            }
        ).catch(error => {
            dispatch(showMessage({message: 'Failed to delete company!'}));
        });
}

export function multipleDeleteCompanies(companyIds)
{
    let reqUrl = process.env.REACT_APP_BACKEND_URL + '/api/companies';
    if (companyIds && companyIds.length > 0) {
        reqUrl += '/' + companyIds[0];
    }
    reqUrl += '/delete?token=' + jwtService.getAccessToken();

    const request = axios.post(reqUrl);

    return (dispatch) =>
        request.then((response) => {
                dispatch(showMessage({message: 'Company Deleted!'}));
            }
        ).catch(error => {
            dispatch(showMessage({message: 'Failed to delete company!'}));
        });
}

export function newCompany()
{
    const data = {
        id              : 0, // FuseUtils.generateGUID(),
        name            : '',
        total           : 0,
        categ           : 0,
        categ2          : 0,
        categ3          : 0,
        categ4          : 0,
        categ5          : 0,
        categ6          : 0,
        categ7          : 0,
        categ8          : 0,
        categ9          : 0,
        categ10         : 0,
        categ11         : 0,
        categ12         : 0
    };

    return {
        type   : GET_COMPANY,
        payload: data
    }
}

export function openNewCompanyDialog()
{
    return {
        type: OPEN_NEW_COMPANY_DIALOG
    }
}

export function closeNewCompanyDialog()
{
    return {
        type: CLOSE_NEW_COMPANY_DIALOG
    }
}

export function openEditCompanyDialog(data)
{
    return {
        type: OPEN_EDIT_COMPANY_DIALOG,
        data
    }
}

export function closeEditCompanyDialog()
{
    return {
        type: CLOSE_EDIT_COMPANY_DIALOG
    }
}
