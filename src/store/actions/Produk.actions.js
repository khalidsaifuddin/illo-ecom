import axios from 'axios/index';

export const GET_PRODUK = '[PRODUK] GET_PRODUK';
export const GET_DISKON_PRODUK = '[PRODUK] GET_DISKON_PRODUK';
export const GET_KATEGORI = '[PRODUK] GET_KATEGORI';
export const VERIFIKASI = '[PRODUK] VERIFIKASI';
export const SIMPAN_VERIFIKASI = '[PRODUK] SIMPAN_VERIFIKASI';
export const GET_VERIFIKASI_PENGGUNA = '[PRODUK] GET_VERIFIKASI_PENGGUNA';

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

export function getKategoriProduk(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Produk/getKategoriProduk', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_KATEGORI,
                payload: response.data,
                routeParams
            })
        );
}

export function verifikasi(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Produk/verifikasi', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : VERIFIKASI,
                payload: response.data,
                routeParams
            })
        );
}

export function simpanVerifikasiPengguna(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Produk/simpanVerifikasiPengguna', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : SIMPAN_VERIFIKASI,
                payload: response.data,
                routeParams
            })
        );
}

export function getVerifikasiPengguna(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Produk/getVerifikasiPengguna', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_VERIFIKASI_PENGGUNA,
                payload: response.data,
                routeParams
            })
        );
}

export function getDiskonProduk(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Produk/getDiskonProduk', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_DISKON_PRODUK,
                payload: response.data,
                routeParams
            })
        );
}