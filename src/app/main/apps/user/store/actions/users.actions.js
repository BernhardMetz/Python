import axios from 'axios';
import jwtService from 'app/services/jwtService';

export const GET_USERS = '[USER APP] GET USERS';
export const SET_USERS_SEARCH_TEXT = '[USER APP] SET USERS SEARCH TEXT';

export function getUsers(searchParams)
{
    let reqUrl = process.env.REACT_APP_BACKEND_URL + '/api/users?token=' + jwtService.getAccessToken() + 
                '&page=' + searchParams.page + '&limit=' + searchParams.limit + '&orderBy=' + searchParams.orderBy + '&order' + searchParams.order;
    
    const request = axios.get(reqUrl);

    return (dispatch) =>
        request.then(response => {
                if (response.data) {
                    dispatch({
                        type   : GET_USERS,
                        payload: response.data
                    })
                }
            }
        );
}

export function setUsersSearchText(event)
{
    return {
        type      : SET_USERS_SEARCH_TEXT,
        searchText: event.target.value
    }
}

