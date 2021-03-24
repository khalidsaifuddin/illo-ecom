import axios from 'axios/index';

export const GET_MITRA_TERDEKAT = '[BLOG] GET_MITRA_TERDEKAT';

export function getMitraTerdekat(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Pengguna/getMitraTerdekat', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_MITRA_TERDEKAT,
                payload: response.data,
                routeParams
            })
        );
}