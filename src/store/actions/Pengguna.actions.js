import axios from 'axios/index';

export const MASUK = '[PENGGUNA] MASUK';
export const GET_PENGGUNA = '[PENGGUNA] GET_PENGGUNA';
export const SIMPAN_PENGGUNA_BARU = '[PENGGUNA] SIMPAN_PENGGUNA_BARU';
export const SIMPAN_PENGGUNA_MANUAL = '[PENGGUNA] SIMPAN_PENGGUNA_MANUAL';
export const GET_WILAYAH = '[PENGGUNA] GET_WILAYAH';
export const GET_ALAMAT_PENGGUNA = '[PENGGUNA] GET_ALAMAT_PENGGUNA';
export const SIMPAN_ALAMAT_PENGGUNA = '[PENGGUNA] SIMPAN_ALAMAT_PENGGUNA';
export const GENERATE_UUID = '[PENGGUNA] GENERATE_UUID';

export function generateUUID(routeParams)
{
    const request = axios.post('https://be.diskuis.id/api/Kuis/generateUUID', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GENERATE_UUID,
                payload: response.data,
                routeParams
            })
        );
}

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

export function getAlamatPengguna(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Pengguna/getAlamatPengguna', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_ALAMAT_PENGGUNA,
                payload: response.data,
                routeParams
            })
        );
}

export function simpanAlamatPengguna(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Pengguna/simpanAlamatPengguna', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : SIMPAN_ALAMAT_PENGGUNA,
                payload: response.data,
                routeParams
            })
        );
}