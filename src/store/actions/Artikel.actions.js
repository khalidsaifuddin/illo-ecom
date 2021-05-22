import axios from 'axios/index';

export const GET_FAQ = '[ARTIKEL] GET_FAQ';

export function getFaq(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Faq/getFaq', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_FAQ,
                payload: response.data,
                routeParams
            })
        );
}