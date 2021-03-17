import axios from 'axios/index';

export const GET_PENGGUNA = '[PENGGUNA] GET_PENGGUNA';

export function getPengguna(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Pengguna/getPengguna', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_PENGGUNA,
                payload: response.data,
                routeParams
            })
        );
}