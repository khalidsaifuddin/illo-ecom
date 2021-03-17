import axios from 'axios/index';

export const GET_PRODUK = '[PRODUK] GET_PRODUK';

export function getProduk(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Produk/getProduk', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_PRODUK,
                payload: response.data,
                routeParams
            })
        );
}