import axios from 'axios/index';

export const GET_KERANJANG = '[KERANJANG] GET_KERANJANG';
export const SIMPAN_KERANJANG = '[KERANJANG] SIMPAN_KERANJANG';
export const SIMPAN_TRANSAKSI = '[KERANJANG] SIMPAN_TRANSAKSI';
export const GET_TRANSAKSI = '[KERANJANG] GET_TRANSAKSI';
export const SIMPAN_KONFIRMASI = '[KERANJANG] SIMPAN_KONFIRMASI';
export const BATALKAN_TRANSAKSI = '[KERANJANG] BATALKAN_TRANSAKSI';
export const SIMPAN_KONFIRMASI_DITERIMA = '[KERANJANG] SIMPAN_KONFIRMASI_DITERIMA';
export const CEK_DISKON = '[KERANJANG] CEK_DISKON';

export function simpanKonfirmasi(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Produk/simpanKonfirmasi', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : SIMPAN_KONFIRMASI,
                payload: response.data,
                routeParams
            })
        );
}

export function getTransaksi(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Produk/getTransaksi', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_TRANSAKSI,
                payload: response.data,
                routeParams
            })
        );
}

export function simpanTransaksi(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Produk/simpanTransaksi', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : SIMPAN_TRANSAKSI,
                payload: response.data,
                routeParams
            })
        );
}

export function getKeranjang(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Produk/getKeranjang', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_KERANJANG,
                payload: response.data,
                routeParams
            })
        );
}

export function simpanKeranjang(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Produk/simpanKeranjang', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : SIMPAN_KERANJANG,
                payload: response.data,
                routeParams
            })
        );
}

export function batalTransaksi(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Produk/batalTransaksi', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : SIMPAN_KERANJANG,
                payload: response.data,
                routeParams
            })
        );
}

export function simpanKonfirmasiDiterima(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Produk/simpanKonfirmasiDiterima', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : SIMPAN_KONFIRMASI_DITERIMA,
                payload: response.data,
                routeParams
            })
        );
}

export function cekDiskon(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Diskon/cekDiskon', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : CEK_DISKON,
                payload: response.data,
                routeParams
            })
        );
}