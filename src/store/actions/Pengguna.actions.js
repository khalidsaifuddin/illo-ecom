import axios from 'axios/index';

export const MASUK = '[PENGGUNA] MASUK';
export const GET_PENGGUNA = '[PENGGUNA] GET_PENGGUNA';
export const SIMPAN_PENGGUNA_BARU = '[PENGGUNA] SIMPAN_PENGGUNA_BARU';
export const SIMPAN_PENGGUNA_MANUAL = '[PENGGUNA] SIMPAN_PENGGUNA_MANUAL';
export const GET_WILAYAH = '[PENGGUNA] GET_WILAYAH';

export function masuk(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Otentikasi/masuk', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : MASUK,
                payload: response.data,
                routeParams
            })
        );
}

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

export function simpanPenggunaBaru(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Pengguna/simpanPenggunaBaru', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : SIMPAN_PENGGUNA_BARU,
                payload: response.data,
                routeParams
            })
        );
}

export function simpanPenggunaManual(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Pengguna/simpanPenggunaManual', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : SIMPAN_PENGGUNA_MANUAL,
                payload: response.data,
                routeParams
            })
        );
}

export function getWilayah(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/app/getWilayah', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_WILAYAH,
                payload: response.data,
                routeParams
            })
        );
}