import axios from 'axios';
import jwtService from 'app/services/jwtService';

import * as Actions from 'app/store/actions';

export const GET_AREAS = '[AREA APP] GET AREAS';
export const SET_AREAS_SEARCH_TEXT = '[AREA APP] SET AREAS SEARCH TEXT';

export function getAreas(searchParams)
{
    let reqUrl = process.env.REACT_APP_BACKEND_URL + '/api/areas?token=' + jwtService.getAccessToken() + 
                '&page=' + searchParams.page + '&limit=' + searchParams.limit + '&orderBy=' + searchParams.orderBy + '&order' + searchParams.order;
    
    const request = axios.get(reqUrl);

    return (dispatch) =>
        request.then(response => {
                if (response.data) {
                    dispatch({
                        type   : GET_AREAS,
                        payload: response.data
                    });

                    dispatch(Actions.getGlobalAreas(response.data));
                }
            }
        );
}

export function setAreasSearchText(event)
{
    return {
        type      : SET_AREAS_SEARCH_TEXT,
        searchText: event.target.value
    }
}
