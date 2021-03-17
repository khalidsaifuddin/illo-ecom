import axios from 'axios/index';

export const GET_ARTIKEL = '[BLOG] GET_ARTIKEL';

export function getArtikel(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Blog/getArtikel', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_ARTIKEL,
                payload: response.data,
                routeParams
            })
        );
}