import axios from 'axios';
import jwtService from 'app/services/jwtService';

import * as Actions from 'app/store/actions';

export const GET_COMPANIES = '[COMPANY APP] GET COMPANIES';
export const SET_COMPANIES_SEARCH_TEXT = '[COMPANY APP] SET COMPANIES SEARCH TEXT';

export function getCompanies(searchParams)
{
    let reqUrl = process.env.REACT_APP_BACKEND_URL + '/api/companies?token=' + jwtService.getAccessToken() + 
                '&page=' + searchParams.page + '&limit=' + searchParams.limit + '&orderBy=' + searchParams.orderBy + '&order' + searchParams.order;
    
    const request = axios.get(reqUrl);

    return (dispatch) =>
        request.then((response) => {
                if (response.data) {
                    dispatch({
                        type   : GET_COMPANIES,
                        payload: response.data
                    });

                    dispatch(Actions.getGlobalCompanies(response.data));
                }
            }
        );
}

export function setCompaniesSearchText(event)
{
    return {
        type      : SET_COMPANIES_SEARCH_TEXT,
        searchText: event.target.value
    }
}

